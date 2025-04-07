import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: any | null;
  lastActivity: number | null;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  updateLastActivity: () => void;
  logout: () => void;
  checkSession: () => boolean;
}

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      lastActivity: null,
      setToken: (token) => set({ token, lastActivity: Date.now() }),
      setUser: (user) => set({ user }),
      updateLastActivity: () => set({ lastActivity: Date.now() }),
      logout: () => set({ token: null, user: null, lastActivity: null }),
      checkSession: () => {
        const { lastActivity, logout } = get();
        if (!lastActivity) return false;
        
        const isExpired = Date.now() - lastActivity > SESSION_TIMEOUT;
        if (isExpired) {
          logout();
          return false;
        }
        return true;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);