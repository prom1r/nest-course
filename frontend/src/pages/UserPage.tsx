import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state: { user: any }) => state.user);

  const clearUser = useAuthStore(
    (state: { clearUser: any }) => state.clearUser
  );

  const hadleLogaut = () => {
    navigate("/");
    localStorage.removeItem("token");
    clearUser();
  };
  return (
    <div>
      <h1>Пользователь</h1>
      <p>Имя: {user?.user?.firstName}</p>
      <p>Почта: {user?.user?.email}</p>
      <button onClick={hadleLogaut}>Выход</button>
    </div>
  );
};

export default UserPage;
