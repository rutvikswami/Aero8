// localStorage helpers for persistent data management
const isBrowser = typeof window !== 'undefined';

export function getData(key, defaultValue) {
  if (!isBrowser) return defaultValue;
  try {
    const stored = localStorage.getItem(`aero8_${key}`);
    if (stored) return JSON.parse(stored);
    return defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setData(key, value) {
  if (!isBrowser) return;
  try {
    localStorage.setItem(`aero8_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

export function removeData(key) {
  if (!isBrowser) return;
  localStorage.removeItem(`aero8_${key}`);
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function generateCertificateId() {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `A8-${year}-${num}`;
}
