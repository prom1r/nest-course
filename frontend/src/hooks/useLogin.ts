import { useMutation } from "@tanstack/react-query";
import { login } from "../api/queries";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      setIsLoggedIn(true);
    },
  });
};
