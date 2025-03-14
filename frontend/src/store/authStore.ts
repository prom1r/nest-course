import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { profile } from "../api/queries";

interface User {
  user: {
    id: number;
    email: string;
    name: string;
  };
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: any) => void;
  clearUser: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  fetchUserProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => {
    return {
      user: null,
      isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || "false"),
      setUser: (user) => {
        set({ user });
      },
      clearUser: () => {
        set({ user: null, isLoggedIn: false });
        localStorage.setItem("isLoggedIn", "false");
      },
      setIsLoggedIn: (isLoggedIn) => {
        localStorage.setItem("isLoggedIn", String(isLoggedIn));
        set({ isLoggedIn });
      },
      fetchUserProfile: async () => {
        const data = await profile();
        set({ user: data });
      },
    };
  })
);
