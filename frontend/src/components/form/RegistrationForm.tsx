import Field from "./Form";

import { useNavigate } from "react-router-dom";
import { useReqister } from "../../api/queries";
import { useState } from "react";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const mutation = useReqister();
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
    e.preventDefault();
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
        <Field
          label={"Никнейм"}
          value={form.userName}
          handleChange={handleChange}
          type={"text"}
          name={"userName"}
        />
        <Field
          label={"Имя"}
          value={form.firstName}
          handleChange={handleChange}
          type={"text"}
          name={"firstName"}
        />
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
          {mutation.isPending ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      {mutation.isError && <p>Ошибка: {mutation.error.message}</p>}
    </div>
  );
};

export default RegistrationForm;
