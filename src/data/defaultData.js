// AERO8 Default Data — all content from requirements document
// This serves as the initial state for localStorage-backed data management

export const defaultNavLinks = [
  { id: 'home', label: 'Home', href: '/#home', visible: true },
  { id: 'about', label: 'About', href: '/#about', visible: true },
  { id: 'kits', label: 'Kits', href: '/kits/kit-01', visible: true },
  { id: 'workshop', label: 'Workshop', href: '/workshop', visible: true },
  { id: 'courses', label: 'Courses', href: '/courses', visible: true },
  { id: 'store', label: 'Store', href: '/store', visible: true },
  { id: 'mission-zone', label: 'Mission Zone', href: '/mission-zone', visible: true },
  { id: 'team', label: 'Team', href: '/#team', visible: true },
];

export const defaultHero = {
  badgeTexts: ['Student Robotics Startup', 'Bangalore, India', 'Workshops + Kits', 'Join the Mission'],
  headingLine1: 'AERO8 ROBOTICS',
  headingLine2: 'BUILD THE FUTURE.',
  typewriterTexts: ['BUILD THE FUTURE.', 'DREAM IT. BUILD IT.', 'ROBOTIZE IT.'],
  subtext: 'A student-led robotics startup from Bangalore, building hands-on robotics kits, immersive workshops, and a storybook universe that makes engineering unforgettable.',
  ctaButton: 'Book Workshop',
  ctaPrimary: { label: 'Book a Workshop', href: '/workshop' },
  ctaSecondary: { label: 'Explore Kits', href: '/kits/kit-01' },
  ctaTertiary: { label: '▶ Watch Teaser', href: '#teaser' },
  countdownEnabled: true,
  countdownTarget: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  countdownLabel: 'NEXT WORKSHOP REGISTRATION CLOSES IN',
  statCards: [
    { id: 's1', number: '500+', label: 'Students Certified' },
    { id: 's2', number: '4', label: 'Kit Universe' },
    { id: 's3', number: 'Bangalore', label: 'India' },
  ],
};

export const defaultAbout = {
  sectionLabel: 'WHO WE ARE',
  heading: '8 students. 1 mission. Building India\'s robotics future.',
  body: 'AERO8 Robotics is a student-led robotics startup from Bangalore. We design hands-on robotics kits wrapped in an original storybook universe, conduct immersive workshops in schools and colleges, and build a community of young engineers who dream big and build bigger. Our kits aren\'t just products — they\'re chapters in an epic Mars saga where students become the heroes.',
  stats: [
    { number: '2nd Year', label: 'Engineering Students' },
    { number: '8', label: 'Team Members' },
    { number: '2025', label: 'Founded' },
  ],
  quote: '"We don\'t just teach robotics. We create engineers who believe they can build anything."',
  quoteAttribution: '— Bharaath, Mission Commander, AERO8',
  visible: true,
};

export const defaultTeam = [
  { id: 't1', name: 'Bharaath', role: 'Mission Commander', bio: 'Founder & Vision Architect. Leads strategy, operations, and school outreach.', photo: null, linkedin: '' },
  { id: 't2', name: 'Vignesh', role: 'Systems Architect', bio: 'Hardware design, finance management, and legal registrations.', photo: null, linkedin: '' },
  { id: 't3', name: 'Vimal', role: 'Chief Navigator', bio: 'Lead educator, school outreach, storybook universe lead.', photo: null, linkedin: '' },
  { id: 't4', name: 'Joshika', role: 'Terrain Specialist', bio: 'Workshop facilitator, storybook co-creator, Mars environment designer.', photo: null, linkedin: '' },
  { id: 't5', name: 'Amogh', role: 'Spark Engineer', bio: 'Electronics, robot systems, creative direction.', photo: null, linkedin: '' },
  { id: 't6', name: 'Samanvitha', role: 'Code Commander', bio: 'Arduino coding, manufacturing quality, kit box standards.', photo: null, linkedin: '' },
  { id: 't7', name: 'Chinmay', role: 'Signal Broadcast', bio: 'Social media design, video content, brand visuals.', photo: null, linkedin: '' },
  { id: 't8', name: 'Sakshi', role: 'Mission Storyteller', bio: 'Social media content, teaching, community engagement.', photo: null, linkedin: '' },
];

export const defaultKits = [
  {
    id: 'kit-01',
    name: 'Mars Rover',
    missionTitle: 'A8 Awakens',
    kitNumber: 'KIT 01',
    accentColor: '#F5A623',
    status: 'Available Now',
    storyTeaser: 'On the barren plains of Mars, a lone rover powers up for the first time. A8 — the last hope of a forgotten colony — must navigate treacherous terrain, assemble its crew, and reach the Signal Tower before Surge, the electromagnetic villain, shuts everything down forever.',
    characters: [
      { name: 'A8', role: 'The Hero', description: 'The Mars Rover itself — brave, resourceful, and driven by curiosity.', isVillain: false },
      { name: 'Volt', role: 'Energy Source', description: 'The battery pack. Powers everything. Loyal but limited.', isVillain: false },
      { name: 'Spin', role: 'Propulsion', description: 'The motors. Fast, reliable, and always ready to roll.', isVillain: false },
      { name: 'Beam', role: 'Scout', description: 'The ultrasonic sensor. Sees what others can\'t.', isVillain: false },
      { name: 'Surge', role: 'The Villain', description: 'An electromagnetic storm entity that disrupts circuits and corrupts signals.', isVillain: true },
    ],
    components: ['Arduino Uno', 'DC Motors x2', 'Motor Driver L298N', 'Ultrasonic Sensor', 'Battery Pack', 'Chassis Kit', 'Wheels x4', 'Jumper Wires', 'Storybook Chapter 1'],
  },
  {
    id: 'kit-02',
    name: 'Line Follower',
    missionTitle: 'Underground Path',
    kitNumber: 'KIT 02',
    accentColor: '#39FF85',
    status: 'Coming Soon',
    storyTeaser: 'Deep beneath the Martian surface, ancient tunnels hold the key to the colony\'s survival. A8 must follow the light paths carved by the original settlers, but Shadow — a creature born from darkness — distorts every trail.',
    characters: [
      { name: 'A8', role: 'The Hero', description: 'Now upgraded with line-following sensors, A8 ventures underground.', isVillain: false },
      { name: 'Volt', role: 'Energy Source', description: 'Running low in the dark tunnels. Every joule counts.', isVillain: false },
      { name: 'Spin', role: 'Propulsion', description: 'Adapted for narrow tunnel navigation.', isVillain: false },
      { name: 'Beam', role: 'Scout', description: 'IR sensors replacing ultrasonic for close-range detection.', isVillain: false },
      { name: 'Shadow', role: 'The Villain', description: 'Born from the absence of light. Distorts paths and misleads sensors.', isVillain: true },
    ],
    components: ['Arduino Uno', 'IR Sensor Array', 'DC Motors x2', 'Motor Driver', 'Battery Pack', 'Line Track Mat', 'Chassis Kit', 'Storybook Chapter 2'],
  },
  {
    id: 'kit-03',
    name: 'Wall Climber',
    missionTitle: 'The Signal Tower',
    kitNumber: 'KIT 03',
    accentColor: '#3AA0FF',
    status: 'Coming Soon',
    storyTeaser: 'The Signal Tower rises above the Martian cliffs — the only way to call for help. A8 must defy gravity itself, climbing vertical surfaces while Gravity, a force-manipulating villain, tries to pull it back down.',
    characters: [
      { name: 'A8', role: 'The Hero', description: 'Equipped with suction and grip mechanisms for vertical ascent.', isVillain: false },
      { name: 'Volt', role: 'Energy Source', description: 'Fighting against gravity drain on every climb.', isVillain: false },
      { name: 'Spin', role: 'Propulsion', description: 'Vertical torque mode activated.', isVillain: false },
      { name: 'Beam', role: 'Scout', description: 'Altitude sensor tracking height and obstacles.', isVillain: false },
      { name: 'Gravity', role: 'The Villain', description: 'Controls gravitational fields. Makes everything heavier.', isVillain: true },
    ],
    components: ['Arduino Uno', 'Servo Motors x4', 'Suction Mechanism', 'Altitude Sensor', 'Battery Pack', 'Vertical Chassis', 'Storybook Chapter 3'],
  },
  {
    id: 'kit-04',
    name: 'Battle Bot',
    missionTitle: 'The Rogue Unit',
    kitNumber: 'KIT 04',
    accentColor: '#FF3A3A',
    status: 'Coming Soon',
    storyTeaser: 'In the dark metallic arena beneath Mars, rogue robots controlled by The Static challenge A8 to the ultimate showdown. Only the smartest, fastest, and most resilient bot survives. This is the final chapter.',
    characters: [
      { name: 'A8', role: 'The Hero', description: 'Fully armed and battle-ready. The ultimate evolution.', isVillain: false },
      { name: 'Volt', role: 'Energy Source', description: 'Overclocked for maximum combat power.', isVillain: false },
      { name: 'Spin', role: 'Propulsion', description: 'Attack and defense spin modes.', isVillain: false },
      { name: 'Beam', role: 'Scout', description: 'Targeting system and proximity alert.', isVillain: false },
      { name: 'The Static', role: 'Final Villain', description: 'A corrupted AI that controls all rogue units. The source of all evil on Mars.', isVillain: true },
    ],
    components: ['Arduino Uno', 'DC Motors x4', 'Weapon Servo', 'Armor Chassis', 'IR Remote Control', 'Battery Pack', 'Battle Arena Mat', 'Storybook Final Chapter'],
  },
];

export const defaultFAQ = [
  { id: 'f1', question: 'Who can attend the AERO8 workshop?', answer: 'Our workshops are designed for students from Class 6 to college level. No prior robotics or coding experience is needed — we start from scratch and build something amazing by the end of the day.', category: 'Workshop' },
  { id: 'f2', question: 'Do I need coding experience?', answer: 'Not at all! Our workshops and kits are designed for absolute beginners. We use block-based programming and simple Arduino code that anyone can learn. Our storybook approach makes even complex concepts easy to grasp.', category: 'Workshop' },
  { id: 'f3', question: 'What do I take home after the workshop?', answer: 'Every student takes home their fully built robot kit, the storybook chapter, a certificate of completion, and access to our online course platform for continued learning.', category: 'Workshop' },
  { id: 'f4', question: 'How much does the workshop cost?', answer: 'Workshop pricing is ₹499–699 per student, depending on the kit and duration. We offer special rates for schools booking for 30+ students. Contact us for a custom quote.', category: 'Workshop' },
  { id: 'f5', question: 'How do I book a workshop for my school?', answer: 'Simply fill out the booking form on our Workshop page. Our team will contact you within 48 hours to confirm dates, logistics, and pricing. We come to your school — no travel needed for students.', category: 'Workshop' },
  { id: 'f6', question: 'What is the AERO8 Kit Universe?', answer: 'The AERO8 Kit Universe is our original storybook series set on Mars. Each robotics kit corresponds to a chapter in the story. As students build robots, they\'re also following the adventure of A8, our hero rover, battling villains and saving the colony.', category: 'Kits' },
  { id: 'f7', question: 'Are the courses free?', answer: 'Yes! All our online courses are currently free to access. Simply create an account and start learning. Premium features and certificates will be available in Phase 2.', category: 'Courses' },
  { id: 'f8', question: 'How do certificates work?', answer: 'After completing all lessons in a course and passing the assessment test (70% or above), you earn an AERO8 certificate. Each certificate has a unique ID and QR code that can be verified online. Certificate downloads will be available soon.', category: 'Certificates' },
  { id: 'f9', question: 'Is AERO8 only in Bangalore?', answer: 'We\'re headquartered in Bangalore, but we conduct workshops across Karnataka and are expanding to other states. If you\'re interested in bringing AERO8 to your city, reach out through our booking form.', category: 'General' },
  { id: 'f10', question: 'How do I contact the team?', answer: 'You can reach us at team@aero8.in, on Instagram @aero8robotics, or on LinkedIn. For workshop bookings, use the form on our Workshop page for the fastest response.', category: 'General' },
];

export const defaultCourses = [
  {
    id: 'course-01',
    title: 'Build Your First Mars Rover',
    description: 'Learn to build a complete Mars Rover robot from scratch. This course covers Arduino basics, motor control, sensor integration, and autonomous navigation.',
    thumbnail: null,
    kitTag: 'Kit 01',
    difficulty: 'Beginner',
    status: 'Free',
    lessons: [
      { id: 'l1', title: 'Introduction to A8 and the Mars Mission', description: 'Meet A8 and understand the mission ahead.', duration: '12:00', completed: false },
      { id: 'l2', title: 'Unboxing Your Kit — Meet the Characters', description: 'Learn about every component through the storybook characters.', duration: '8:00', completed: false },
      { id: 'l3', title: 'Arduino Basics — Powering Up A8', description: 'Your first Arduino sketch — making an LED blink.', duration: '15:00', completed: false },
      { id: 'l4', title: 'Wiring Motors — Spin Comes Alive', description: 'Connect and control DC motors with the L298N driver.', duration: '18:00', completed: false },
      { id: 'l5', title: 'Sensor Integration — Beam\'s Eyes', description: 'Wire the ultrasonic sensor and read distance data.', duration: '14:00', completed: false },
      { id: 'l6', title: 'Autonomous Navigation — Avoiding Surge', description: 'Program A8 to navigate obstacles autonomously.', duration: '20:00', completed: false },
      { id: 'l7', title: 'Final Assembly and Testing', description: 'Put it all together and watch A8 drive!', duration: '16:00', completed: false },
    ],
    testQuestions: [
      { question: 'What does the L298N module do?', options: ['Powers the Arduino', 'Controls motor speed and direction', 'Reads sensor data', 'Connects to WiFi'], correct: 1 },
      { question: 'What sensor does Beam represent?', options: ['IR Sensor', 'Temperature Sensor', 'Ultrasonic Sensor', 'Light Sensor'], correct: 2 },
      { question: 'What programming language does Arduino use?', options: ['Python', 'C/C++', 'JavaScript', 'Java'], correct: 1 },
    ],
    passingScore: 70,
  },
];

export const defaultProducts = [
  {
    id: 'prod-01',
    name: 'AERO8 Mars Rover Kit',
    description: 'The complete Kit 01 package — everything you need to build your own Mars Rover and follow A8\'s adventure.',
    price: 1499,
    category: 'Kits',
    kitTag: 'Kit 01',
    difficulty: 'Beginner',
    status: 'Available',
    featured: true,
    images: [],
    compatibleKits: ['Kit 01'],
    components: ['Arduino Uno', 'DC Motors x2', 'Motor Driver L298N', 'Ultrasonic Sensor', 'Battery Pack', 'Chassis Kit', 'Wheels x4', 'Jumper Wires', 'Storybook Chapter 1', 'AERO8 Stickers'],
  },
  {
    id: 'prod-02',
    name: 'AERO8 Line Follower Kit',
    description: 'Kit 02 — Navigate the underground tunnels of Mars with IR sensors and precision motor control.',
    price: 1299,
    category: 'Kits',
    kitTag: 'Kit 02',
    difficulty: 'Beginner',
    status: 'Coming Soon',
    featured: false,
    images: [],
    compatibleKits: ['Kit 02'],
    components: ['Arduino Uno', 'IR Sensor Array', 'DC Motors x2', 'Motor Driver', 'Battery Pack', 'Line Track Mat', 'Chassis Kit'],
  },
  {
    id: 'prod-03',
    name: 'AERO8 T-Shirt — Mission Crew',
    description: 'Official AERO8 Robotics crew t-shirt. Black with amber AERO8 logo.',
    price: 599,
    category: 'Merchandise',
    kitTag: null,
    difficulty: null,
    status: 'Coming Soon',
    featured: false,
    images: [],
    compatibleKits: [],
    components: [],
  },
];

export const defaultGames = [
  { id: 'game-01', name: 'A8 Navigator', description: 'Drive A8 across Mars. Avoid rocks and craters. Reach the signal tower!', visible: true },
  { id: 'game-02', name: 'Circuit Builder', description: 'Drag and drop components to complete the circuit. Watch out for Surge!', visible: true },
  { id: 'game-03', name: 'Code Breaker', description: 'Use block coding to guide A8 through the maze.', visible: true },
  { id: 'game-04', name: 'Sensor Quiz', description: 'Test your robotics knowledge. How many can you get right?', visible: true },
];

export const defaultQuizQuestions = [
  { id: 'q1', question: 'What does LED stand for?', options: ['Light Emitting Diode', 'Low Energy Device', 'Linear Electric Driver', 'Laser Emitting Disc'], correct: 0 },
  { id: 'q2', question: 'Which component is used to measure distance?', options: ['Potentiometer', 'Thermistor', 'Ultrasonic Sensor', 'Capacitor'], correct: 2 },
  { id: 'q3', question: 'What programming language is commonly used with Arduino?', options: ['Python', 'C/C++', 'Ruby', 'Swift'], correct: 1 },
  { id: 'q4', question: 'What does a motor driver do?', options: ['Powers the Arduino', 'Controls motor speed and direction', 'Reads sensor values', 'Stores data'], correct: 1 },
  { id: 'q5', question: 'What is the function of a resistor?', options: ['Store charge', 'Amplify current', 'Limit current flow', 'Generate voltage'], correct: 2 },
  { id: 'q6', question: 'Which planet is A8 exploring?', options: ['Jupiter', 'Venus', 'Mars', 'Saturn'], correct: 2 },
  { id: 'q7', question: 'What is a breadboard used for?', options: ['Cutting bread', 'Prototyping circuits', 'Programming microcontrollers', 'Measuring voltage'], correct: 1 },
  { id: 'q8', question: 'What voltage does a standard Arduino Uno operate at?', options: ['3.3V', '5V', '9V', '12V'], correct: 1 },
  { id: 'q9', question: 'What does IR stand for in IR sensor?', options: ['Internal Resistance', 'Infrared', 'Ionic Radiation', 'Impulse Response'], correct: 1 },
  { id: 'q10', question: 'What component converts electrical energy to mechanical motion?', options: ['LED', 'Resistor', 'Motor', 'Capacitor'], correct: 2 },
];

export const defaultFooter = {
  tagline: 'Dream It. Build It. Robotize It.',
  description: 'A student-led robotics startup from Bangalore, building the engineers of tomorrow.',
  social: {
    instagram: 'https://instagram.com/aero8robotics',
    linkedin: 'https://linkedin.com/company/aero8robotics',
    email: 'team@aero8.in',
  },
  copyright: '© 2025 AERO8 Robotics. All rights reserved.',
  address: 'Bangalore, Karnataka, India',
  bottomText: 'Built by students. For the engineers of tomorrow.',
};

export const defaultSections = {
  hero: true,
  about: true,
  team: true,
  kitUniverse: true,
  workshopBooking: true,
  courses: true,
  store: true,
  missionZone: true,
  studentLeaderboard: true,
  institutionLeaderboard: true,
  communityShowcase: true,
  faq: true,
  footer: true,
};

export const defaultAdminAccounts = [
  { id: 'admin1', username: 'admin', password: 'aero8admin', role: 'super_admin', name: 'Bharaath' },
];

export const defaultWorkshopBookings = [];
export const defaultStudents = [];
export const defaultCertificates = [];
export const defaultShowcaseEntries = [];
export const defaultLeaderboard = [];
export const defaultNewsletterEmails = [];

export const defaultMissionLog = [
  { id: 'ml1', text: 'Arjun from DPS Bangalore just completed Kit 01 Course', time: Date.now() - 3600000 },
  { id: 'ml2', text: 'Priya from VIT just earned a certificate', time: Date.now() - 7200000 },
  { id: 'ml3', text: '10 new students from RV College joined this week', time: Date.now() - 10800000 },
  { id: 'ml4', text: 'New workshop confirmed at National Public School', time: Date.now() - 14400000 },
  { id: 'ml5', text: 'Rahul scored 2,400 points in A8 Navigator!', time: Date.now() - 18000000 },
];
