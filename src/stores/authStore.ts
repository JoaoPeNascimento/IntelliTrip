import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userId: string | null;
  setToken: (token: string, userId: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      userId: null,
      setToken: (token, userId) => set({ token, userId }),
      clearToken: () => set({ token: null, userId: null }),
    }),
    {
      name: "auth-storage", // nome no localStorage
    }
  )
);
