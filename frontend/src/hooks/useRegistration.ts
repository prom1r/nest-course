import { useMutation } from "@tanstack/react-query";
import { register } from "../api/queries";

export const useRegistration = () => {
  return useMutation({
    mutationFn: register,
  });
};
