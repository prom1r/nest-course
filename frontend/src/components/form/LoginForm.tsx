import Field from "./Form";

import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import useModalStore from "../../store/modalStore";

type FormType = {
  email: string;
  password: string;
};

type FieldType = {
  label: string;
  name: keyof FormType;
  type: string;
  required?: boolean;
};

const fields: FieldType[] = [
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Пароль", name: "password", type: "password", required: true },
];

const LoginForm = () => {
  const modal = useModalStore();
  const mutation = useLogin();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form, {
      onSuccess: () => modal.close(),
      onError: (error) => {
        console.error("Ошибка входа", error);
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <Field
            key={field.name}
            label={field.label}
            value={form[field.name]}
            handleChange={handleChange}
            type={field.type}
            name={field.name}
            required={field.required}
          />
        ))}
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Вход..." : "Войти"}
        </button>
      </form>
      {mutation.isError && <p>Ошибка: {mutation.error.message}</p>}
    </div>
  );
};

export default LoginForm;
