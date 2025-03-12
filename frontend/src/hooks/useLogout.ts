import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { logout } from "../api/queries";

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser();
    },
  });
};
