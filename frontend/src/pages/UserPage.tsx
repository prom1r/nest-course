import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useLogout } from "../hooks/useLogout";
import ModalButton from "../components/modal/ModalButton";
import ModalCreateNewPost from "../components/posts/ModalCreateNewPost";
import Modal from "../components/modal/Modal";
import UserPosts from "../components/posts/UserPosts";

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
      <div>
        <h1>Профиль:</h1>
        <p>{user.user.name}</p>
        <p>{user.user.email}</p>
        <button onClick={handleLogout}>Выйти</button>
      </div>
      <div>
        <ModalButton
          component={<ModalCreateNewPost />}
          text="Create New Post"
        />
        <Modal />
      </div>
      <div>
        <h1>Посты:</h1>
        <UserPosts />
      </div>
    </div>
  );
};

export default UserPage;
