import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userId: string | null;
  email: string | null;
  setToken: (token: string, userId: string) => void;
  clearToken: () => void;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      userId: null,
      email: null,
      setToken: (token, userId) => set({ token, userId }),
      clearToken: () => set({ token: null, userId: null }),
      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: null }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
