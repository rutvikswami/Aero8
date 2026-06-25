'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getData, setData, generateId } from '@/utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  useEffect(() => {
    const saved = getData('currentStudent', null);
    if (saved) setStudent(saved);
  }, []);

  const login = () => {
    // Simulated Google OAuth
    const mockGoogleUser = {
      id: generateId(),
      name: 'Student User',
      email: 'student@example.com',
      photo: null,
      points: 0,
      rank: 'Cadet',
      streak: 0,
      institution: '',
      city: '',
      age: '',
      grade: '',
      coursesCompleted: [],
      gameScores: [],
      workshopAttendance: 0,
      showcasePhotos: [],
      referralCode: generateId().slice(0, 8),
      referralCount: 0,
      joinedAt: Date.now(),
    };
    setStudent(mockGoogleUser);
    setData('currentStudent', mockGoogleUser);
    setShowAuthModal(false);
    setShowProfileSetup(true);
  };

  const updateProfile = (updates) => {
    const updated = { ...student, ...updates };
    setStudent(updated);
    setData('currentStudent', updated);
    setShowProfileSetup(false);
  };

  const addPoints = (amount) => {
    if (!student) return;
    const newPoints = (student.points || 0) + amount;
    let rank = 'Cadet';
    if (newPoints >= 3000) rank = 'Commander';
    else if (newPoints >= 1500) rank = 'Innovator';
    else if (newPoints >= 500) rank = 'Builder';
    else if (newPoints >= 100) rank = 'Engineer';
    const updated = { ...student, points: newPoints, rank };
    setStudent(updated);
    setData('currentStudent', updated);
  };

  const logout = () => {
    setStudent(null);
    setData('currentStudent', null);
  };

  return (
    <AuthContext.Provider value={{
      student, login, logout, updateProfile, addPoints,
      showAuthModal, setShowAuthModal,
      showProfileSetup, setShowProfileSetup,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
