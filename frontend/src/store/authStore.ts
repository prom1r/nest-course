import { create } from "zustand";

interface AuthState {
  user: {
    user: object;
  } | null;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  return {
    user: initialUser,
    setUser: (user) => {
      set({ user });
    },
    clearUser: () => {
      set({ user: null });
      localStorage.removeItem("user");
    },
  };
});
