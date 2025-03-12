import Field from "./Form";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useRegistration } from "../../hooks/useRegistration";

type FormType = {
  firstName: string;
  userName: string;
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
  { label: "Никнейм", name: "userName", type: "text", required: true },
  { label: "Имя", name: "firstName", type: "text", required: true },
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Пароль", name: "password", type: "password", required: true },
];

const RegistrationForm = () => {
  const navigate = useNavigate();
  const mutation = useRegistration();
  const [form, setForm] = useState({
    firstName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    mutation.mutate(form, {
      onSuccess: () => navigate("/"),
      onError: (error) => {
        console.error("Ошибка регистрации", error);
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
          {mutation.isPending ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      {mutation.isError && <p>Ошибка: {mutation.error.message}</p>}
    </div>
  );
};

export default RegistrationForm;
