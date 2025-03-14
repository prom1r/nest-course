import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { logout } from "../api/queries";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
      clearUser();
    },
  });
};
