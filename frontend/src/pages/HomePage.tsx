import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

const HomePage = () => {
  const user = useAuthStore((state: { user: any }) => state?.user);

  return (
    <div>
      <h1>Главная страница</h1>
      {user ? (
        <Link to="/user">Пользователь</Link>
      ) : (
        <>
          <Link to="/login">Вход</Link>
          <Link to="/registration">Регистрация</Link>
        </>
      )}
    </div>
  );
};

export default HomePage;
