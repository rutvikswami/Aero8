'use client';
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getData, setData } from '@/utils/storage';
import * as defaults from '@/data/defaultData';
import { supabase } from '@/lib/supabase';

const DataContext = createContext(null);

// ── Column mappers (DB ↔ JS state) ──────────────────────────────────────────

const fromBooking = (r) => ({
  id: r.id, name: r.name, email: r.email, phone: r.phone,
  institution: r.institution, city: r.city, students: r.students,
  workshopType: r.workshop_type, preferredDate: r.preferred_date,
  backupDate: r.backup_date, source: r.source, message: r.message,
  status: r.status, notes: r.notes, submittedAt: r.submitted_at,
});

const toBooking = (b) => ({
  id: b.id, name: b.name, email: b.email, phone: b.phone,
  institution: b.institution, city: b.city, students: b.students,
  workshop_type: b.workshopType, preferred_date: b.preferredDate,
  backup_date: b.backupDate, source: b.source, message: b.message,
  status: b.status, notes: b.notes || '', submitted_at: b.submittedAt,
});

const fromStudent = (r) => ({
  id: r.id, name: r.name, email: r.email, photo: r.photo_url,
  points: r.points || 0, rank: r.rank || 'Cadet', streak: r.streak || 0,
  institution: r.institution, city: r.city, age: r.age, grade: r.grade,
  coursesCompleted: r.courses_completed || [],
  gameScores: r.game_scores || [],
  workshopAttendance: r.workshop_attendance || 0,
  showcasePhotos: r.showcase_photos || [],
  referralCode: r.referral_code, referralCount: r.referral_count || 0,
  joinedAt: r.joined_at,
});

const toStudent = (s) => ({
  id: s.id, name: s.name, email: s.email, photo_url: s.photo,
  points: s.points || 0, rank: s.rank || 'Cadet', streak: s.streak || 0,
  institution: s.institution, city: s.city, age: s.age, grade: s.grade,
  courses_completed: s.coursesCompleted || [],
  game_scores: s.gameScores || [],
  workshop_attendance: s.workshopAttendance || 0,
  showcase_photos: s.showcasePhotos || [],
  referral_code: s.referralCode, referral_count: s.referralCount || 0,
  joined_at: s.joinedAt,
});

const fromCertificate = (r) => ({
  id: r.id, studentId: r.student_id, studentName: r.student_name,
  courseId: r.course_id, courseTitle: r.course_title,
  score: r.score, issuedAt: r.issued_at,
});

const toCertificate = (c) => ({
  id: c.id, student_id: c.studentId, student_name: c.studentName,
  course_id: c.courseId, course_title: c.courseTitle,
  score: c.score, issued_at: c.issuedAt,
});

const fromShowcase = (r) => ({
  id: r.id, studentId: r.student_id, studentName: r.student_name,
  institution: r.institution, photo: r.photo_url, caption: r.caption,
  kitTag: r.kit_tag, approved: r.approved, submittedAt: r.submitted_at,
});

const toShowcase = (e) => ({
  id: e.id, student_id: e.studentId, student_name: e.studentName,
  institution: e.institution, photo_url: e.photo, caption: e.caption,
  kit_tag: e.kitTag, approved: e.approved || false, submitted_at: e.submittedAt,
});

// ── Helper: sync array deltas to a Supabase table ───────────────────────────
// Compares newArr vs prevArr, upserts changed/new items, deletes removed ones.
async function syncArray(table, newArr, prevArr, mapFn) {
  if (!supabase) return;
  try {
    const newMap  = new Map(newArr.map(d => [d.id, d]));
    const prevMap = new Map(prevArr.map(d => [d.id, d]));

    const toUpsert = newArr.filter(item => {
      const prev = prevMap.get(item.id);
      return !prev || JSON.stringify(prev) !== JSON.stringify(item);
    });
    const toDelete = [...prevMap.keys()].filter(id => !newMap.has(id));

    const ops = [];
    if (toUpsert.length > 0) {
      ops.push(supabase.from(table).upsert(toUpsert.map(mapFn), { onConflict: 'id' }));
    }
    if (toDelete.length > 0) {
      ops.push(supabase.from(table).delete().in('id', toDelete));
    }
    if (ops.length > 0) await Promise.all(ops);
  } catch (err) {
    console.error(`[Supabase] ${table} sync error:`, err);
  }
}

// ════════════════════════════════════════════════════════════════════════════
export function DataProvider({ children }) {

  // ── State ──────────────────────────────────────────────────────────────────
  const [loaded,          setLoaded]          = useState(false);
  const [navLinks,        setNavLinks]        = useState(defaults.defaultNavLinks);
  const [hero,            setHero]            = useState(defaults.defaultHero);
  const [about,           setAbout]           = useState(defaults.defaultAbout);
  const [team,            setTeam]            = useState(defaults.defaultTeam);
  const [kits,            setKits]            = useState(defaults.defaultKits);
  const [faq,             setFaq]             = useState(defaults.defaultFAQ);
  const [courses,         setCourses]         = useState(defaults.defaultCourses);
  const [products,        setProducts]        = useState(defaults.defaultProducts);
  const [games,           setGames]           = useState(defaults.defaultGames);
  const [quizQuestions,   setQuizQuestions]   = useState(defaults.defaultQuizQuestions);
  const [footer,          setFooter]          = useState(defaults.defaultFooter);
  const [sections,        setSections]        = useState(defaults.defaultSections);
  const [bookings,        setBookings]        = useState(defaults.defaultWorkshopBookings);
  const [students,        setStudents]        = useState(defaults.defaultStudents);
  const [certificates,    setCertificates]    = useState(defaults.defaultCertificates);
  const [showcaseEntries, setShowcaseEntries] = useState(defaults.defaultShowcaseEntries);
  const [leaderboard,     setLeaderboard]     = useState(defaults.defaultLeaderboard);
  const [newsletterEmails,setNewsletterEmails]= useState(defaults.defaultNewsletterEmails);
  const [missionLog,      setMissionLog]      = useState(defaults.defaultMissionLog);

  // ── Refs to track previous values for delta sync ───────────────────────────
  const prevBookings  = useRef([]);
  const prevStudents  = useRef([]);
  const prevCerts     = useRef([]);
  const prevShowcase  = useRef([]);
  const prevMissionLog= useRef([]);

  // ── 1. Load from localStorage immediately (sync) ───────────────────────────
  useEffect(() => {
    setNavLinks(getData('navLinks',          defaults.defaultNavLinks));
    setHero(getData('hero',                  defaults.defaultHero));
    setAbout(getData('about',                defaults.defaultAbout));
    setTeam(getData('team',                  defaults.defaultTeam));
    setKits(getData('kits',                  defaults.defaultKits));
    setFaq(getData('faq',                    defaults.defaultFAQ));
    setCourses(getData('courses',            defaults.defaultCourses));
    setProducts(getData('products',          defaults.defaultProducts));
    setGames(getData('games',               defaults.defaultGames));
    setQuizQuestions(getData('quizQuestions',defaults.defaultQuizQuestions));
    setFooter(getData('footer',              defaults.defaultFooter));
    setSections(getData('sections',          defaults.defaultSections));
    setBookings(getData('bookings',          defaults.defaultWorkshopBookings));
    setStudents(getData('students',          defaults.defaultStudents));
    setCertificates(getData('certificates',  defaults.defaultCertificates));
    setShowcaseEntries(getData('showcaseEntries', defaults.defaultShowcaseEntries));
    setLeaderboard(getData('leaderboard',    defaults.defaultLeaderboard));
    setNewsletterEmails(getData('newsletterEmails', defaults.defaultNewsletterEmails));
    setMissionLog(getData('missionLog',      defaults.defaultMissionLog));
    setLoaded(true);

    // ── 2. Fetch from Supabase and override (async) ──────────────────────────
    if (supabase) {
      fetchAllFromSupabase();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Supabase fetch ──────────────────────────────────────────────────────────
  const fetchAllFromSupabase = async () => {
    try {
      // 2a. Content tables (stored as JSONB in site_settings)
      const contentKeys = [
        'navLinks','hero','about','team','kits','faq',
        'courses','products','games','quizQuestions','footer','sections',
      ];
      const { data: settings, error: settingsErr } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', contentKeys);

      if (!settingsErr && settings) {
        const map = Object.fromEntries(settings.map(s => [s.key, s.value]));
        if (map.navLinks)      setNavLinks(map.navLinks);
        if (map.hero)          setHero(map.hero);
        if (map.about)         setAbout(map.about);
        if (map.team)          setTeam(map.team);
        if (map.kits)          setKits(map.kits);
        if (map.faq)           setFaq(map.faq);
        if (map.courses)       setCourses(map.courses);
        if (map.products)      setProducts(map.products);
        if (map.games)         setGames(map.games);
        if (map.quizQuestions) setQuizQuestions(map.quizQuestions);
        if (map.footer)        setFooter(map.footer);
        if (map.sections)      setSections(map.sections);
      }

      // 2b. Dynamic/user-generated tables (normalized)
      const [
        { data: bookingsData },
        { data: studentsData },
        { data: certsData },
        { data: showcaseData },
        { data: newsletterData },
        { data: missionData },
      ] = await Promise.all([
        supabase.from('workshop_bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('students').select('*').order('points', { ascending: false }),
        supabase.from('certificates').select('*').order('issued_at', { ascending: false }),
        supabase.from('showcase_entries').select('*').order('created_at', { ascending: false }),
        supabase.from('newsletter_emails').select('email').order('subscribed_at', { ascending: false }),
        supabase.from('mission_log').select('id,text,time').order('time', { ascending: false }).limit(20),
      ]);

      if (bookingsData) {
        const mapped = bookingsData.map(fromBooking);
        setBookings(mapped);
        prevBookings.current = mapped;
      }
      if (studentsData) {
        const mapped = studentsData.map(fromStudent);
        setStudents(mapped);
        prevStudents.current = mapped;
      }
      if (certsData) {
        const mapped = certsData.map(fromCertificate);
        setCertificates(mapped);
        prevCerts.current = mapped;
      }
      if (showcaseData) {
        const mapped = showcaseData.map(fromShowcase);
        setShowcaseEntries(mapped);
        prevShowcase.current = mapped;
      }
      if (newsletterData) {
        setNewsletterEmails(newsletterData.map(r => r.email));
      }
      if (missionData) {
        const mapped = missionData.map(r => ({ id: r.id, text: r.text, time: r.time }));
        setMissionLog(mapped);
        prevMissionLog.current = mapped;
      }
    } catch (err) {
      console.error('[Supabase] fetchAllFromSupabase error — using localStorage:', err);
    }
  };

  // ── Content updater (site_settings + localStorage) ─────────────────────────
  const updateContent = useCallback((key, setter) => (value) => {
    setter(value);
    setData(key, value);
    if (!supabase) return;
    supabase
      .from('site_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
      .then(({ error }) => { if (error) console.error(`[Supabase] site_settings "${key}" error:`, error); });
  }, []);

  // ── Bookings ────────────────────────────────────────────────────────────────
  const updateBookings = useCallback((newBookings) => {
    const prev = prevBookings.current;
    prevBookings.current = newBookings;
    setBookings(newBookings);
    setData('bookings', newBookings);
    syncArray('workshop_bookings', newBookings, prev, toBooking);
  }, []);

  // ── Students ────────────────────────────────────────────────────────────────
  const updateStudents = useCallback((newStudents) => {
    const prev = prevStudents.current;
    prevStudents.current = newStudents;
    setStudents(newStudents);
    setData('students', newStudents);
    syncArray('students', newStudents, prev, toStudent);
  }, []);

  // ── Certificates ────────────────────────────────────────────────────────────
  const updateCertificates = useCallback((newCerts) => {
    const prev = prevCerts.current;
    prevCerts.current = newCerts;
    setCertificates(newCerts);
    setData('certificates', newCerts);
    syncArray('certificates', newCerts, prev, toCertificate);
  }, []);

  // ── Showcase ────────────────────────────────────────────────────────────────
  const updateShowcase = useCallback((newEntries) => {
    const prev = prevShowcase.current;
    prevShowcase.current = newEntries;
    setShowcaseEntries(newEntries);
    setData('showcaseEntries', newEntries);
    syncArray('showcase_entries', newEntries, prev, toShowcase);
  }, []);

  // ── Newsletter (append-only — emails are never deleted through the UI) ──────
  const updateNewsletter = useCallback((newEmails) => {
    setNewsletterEmails(newEmails);
    setData('newsletterEmails', newEmails);
    if (!supabase || newEmails.length === 0) return;
    // Insert the most recently added email
    const latest = newEmails[newEmails.length - 1];
    if (latest) {
      supabase
        .from('newsletter_emails')
        .upsert({ email: latest }, { onConflict: 'email' })
        .then(({ error }) => { if (error) console.error('[Supabase] newsletter insert error:', error); });
    }
  }, []);

  // ── Mission Log ─────────────────────────────────────────────────────────────
  const updateMissionLog = useCallback((newLog) => {
    const prev = prevMissionLog.current;
    prevMissionLog.current = newLog;
    setMissionLog(newLog);
    setData('missionLog', newLog);
    syncArray('mission_log', newLog, prev, e => ({ id: e.id, text: e.text, time: e.time }));
  }, []);

  // ── Leaderboard (derived from students — no dedicated Supabase table) ───────
  const updateLeaderboard = useCallback((newLB) => {
    setLeaderboard(newLB);
    setData('leaderboard', newLB);
  }, []);

  // ── Context value ───────────────────────────────────────────────────────────
  const value = {
    loaded,
    navLinks,        setNavLinks:        updateContent('navLinks',        setNavLinks),
    hero,            setHero:            updateContent('hero',            setHero),
    about,           setAbout:           updateContent('about',           setAbout),
    team,            setTeam:            updateContent('team',            setTeam),
    kits,            setKits:            updateContent('kits',            setKits),
    faq,             setFaq:             updateContent('faq',             setFaq),
    courses,         setCourses:         updateContent('courses',         setCourses),
    products,        setProducts:        updateContent('products',        setProducts),
    games,           setGames:           updateContent('games',           setGames),
    quizQuestions,   setQuizQuestions:   updateContent('quizQuestions',   setQuizQuestions),
    footer,          setFooter:          updateContent('footer',          setFooter),
    sections,        setSections:        updateContent('sections',        setSections),
    bookings,        setBookings:        updateBookings,
    students,        setStudents:        updateStudents,
    certificates,    setCertificates:    updateCertificates,
    showcaseEntries, setShowcaseEntries: updateShowcase,
    leaderboard,     setLeaderboard:     updateLeaderboard,
    newsletterEmails,setNewsletterEmails:updateNewsletter,
    missionLog,      setMissionLog:      updateMissionLog,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
