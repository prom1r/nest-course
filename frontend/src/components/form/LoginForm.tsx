import Field from "./Form";

import { useNavigate } from "react-router-dom";
import { useLogin } from "../../api/queries";
import { useState } from "react";

interface LoginFormProps {}
const LoginForm = () => {
  const navigate = useNavigate();
  const mutation = useLogin();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form, {
      onSuccess: () => navigate("/"),
      onError: (error) => {
        console.error("Ошибка входа", error);
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          label={"Email"}
          value={form.email}
          handleChange={handleChange}
          type={"email"}
          name={"email"}
          required={true}
        />
        <Field
          label="Пароль"
          value={form.password}
          handleChange={handleChange}
          type={"password"}
          name={"password"}
          required={true}
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Вход..." : "Войти"}
        </button>
      </form>
      {mutation.isError && <p>Ошибка: {mutation.error.message}</p>}
    </div>
  );
};

export default LoginForm;
