import { useMutation } from "@tanstack/react-query";
import api from "./api";
import { useAuthStore } from "../store/authStore";

const login = async (credentials: { email: string; password: string }) => {
  const { data } = await api.post("auth/login", credentials);
  return data;
};

const register = async (credentials: {
  firstName: string;
  userName: string;
  email: string;
  password: string;
}) => await api.post("auth/register", credentials);

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
  });
};

export const useReqister = () => {
  return useMutation({
    mutationFn: register,
  });
};
