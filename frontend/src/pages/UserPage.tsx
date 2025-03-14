import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useLogout } from "../hooks/useLogout";

const UserPage = () => {
  const user = useAuthStore((state) => state.user);
  const fetchUserProfile = useAuthStore((state) => state.fetchUserProfile);
  const mutation = useLogout();

  const handleLogout = () => mutation.mutate();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (!user) return null;

  return (
    <div>
      <h1>Профиль</h1>
      <p>{user.user.name}</p>
      <p>{user.user.email}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default UserPage;
