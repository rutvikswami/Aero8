'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getData, setData } from '@/utils/storage';
import { defaultAdminAccounts } from '@/data/defaultData';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [adminAccounts, setAdminAccounts] = useState(defaultAdminAccounts);

  useEffect(() => {
    const saved = getData('currentAdmin', null);
    if (saved) setAdmin(saved);
    setAdminAccounts(getData('adminAccounts', defaultAdminAccounts));
  }, []);

  const loginAdmin = (username, password) => {
    const accounts = getData('adminAccounts', defaultAdminAccounts);
    const account = accounts.find(a => a.username === username && a.password === password);
    if (account) {
      const adminData = { ...account, password: undefined };
      setAdmin(adminData);
      setData('currentAdmin', adminData);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdmin(null);
    setData('currentAdmin', null);
  };

  return (
    <AdminContext.Provider value={{ admin, loginAdmin, logoutAdmin, adminAccounts }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
