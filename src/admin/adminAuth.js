const UNLOCK_STORAGE_KEY = 'portfolio_admin_unlocked_v1';

function getAdminPassword() {
  // Vite will inline env vars at build time.
  return import.meta.env.VITE_ADMIN_PASSWORD || 'admin';
}

function getUnlockExpiryMs() {
  // Keep it short-ish so it doesn't stay unlocked forever on shared machines.
  const hours = 12;
  return hours * 60 * 60 * 1000;
}

export function isAdminUnlocked() {
  try {
    const raw = localStorage.getItem(UNLOCK_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.expiresAt !== 'number') return false;
    return Date.now() < parsed.expiresAt;
  } catch {
    return false;
  }
}

export function unlockAdmin(password) {
  const ok = String(password ?? '') === String(getAdminPassword());
  if (!ok) return false;

  const payload = { expiresAt: Date.now() + getUnlockExpiryMs() };
  localStorage.setItem(UNLOCK_STORAGE_KEY, JSON.stringify(payload));
  return true;
}

export function lockAdmin() {
  localStorage.removeItem(UNLOCK_STORAGE_KEY);
}

export function getAdminPasswordHint() {
  return import.meta.env.VITE_ADMIN_PASSWORD ? 'Set via VITE_ADMIN_PASSWORD' : 'Default is "admin" (dev only)';
}

