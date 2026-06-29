import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '@/utils/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  newsletterSubscribed?: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, accessToken: string, refreshToken?: string) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, accessToken, refreshToken) => {
        set({
          user,
          accessToken,
          refreshToken: refreshToken || null,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: async () => {
        try {
          const refreshToken = get().refreshToken;
          // Best effort call to backend to invalidate session/cookies
          await apiClient.post('/auth/logout', { refreshToken });
        } catch (error) {
          console.warn('Backend logout failed or was unreachable:', error);
        } finally {
          set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, isLoading: false });
          // Redirect/Reload clears memory completely to avoid token leaks.
          window.location.href = '/auth/login';
        }
      },

      checkAuth: async () => {
        if (!get().accessToken) {
          set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, isLoading: false });
          return;
        }

        set({ isLoading: true });
        try {
          // Validate current session/cookie against backend
          const response = await apiClient.get('/auth/me');
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          // If token expired or invalid, clear everything
          set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'teamup-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
