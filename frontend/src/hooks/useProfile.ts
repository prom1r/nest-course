import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { profile } from "../api/queries";

export const useProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const user = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => profile(),
  });

  localStorage.setItem("user", JSON.stringify(user));
  if (user) {
    setUser(user);
  }
};

export const useProfileTest = () => {
  return useMutation({
    mutationFn: profile,
  });
};
