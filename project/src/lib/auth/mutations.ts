import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: (user: { role: string; email: string; password: string }) => loginUser(user),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (user: {
      role: string;
      name: string;
      password: string;
      email: string;
    }) => registerUser(user),
  });
};
