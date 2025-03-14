import { useAuthStore } from "../store/authStore";
import { profile } from "../api/queries";
import { useMutation } from "@tanstack/react-query";

export const useProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: profile,
    onSuccess: (user) => {
      setUser(user);
    },
  });
};
