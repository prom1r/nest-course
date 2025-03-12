import { create } from "zustand";

interface AuthState {
  user: {
    user: object;
  } | null;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  return {
    user: null,
    setUser: (user) => {
      set({ user });
    },
    clearUser: () => {
      set({ user: null });
    },
  };
});
