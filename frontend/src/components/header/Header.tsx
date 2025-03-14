import LoginForm from "../form/LoginForm";
import RegistrationForm from "../form/RegistrationForm";
import Modal from "../modal/Modal";
import ModalButton from "../modal/ModalButton";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";

const Authorization = () => {
  return (
    <>
      <div>
        <ModalButton component={<LoginForm />} text="Login" />
        <ModalButton component={<RegistrationForm />} text="Register" />
      </div>
      <Modal />
    </>
  );
};

const UserProfile = () => {
  return (
    <div>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

const Header = () => {
  const isLoogedin = useAuthStore((state) => state.isLoggedIn);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Link to="/">Home</Link>
      {isLoogedin ? <UserProfile /> : <Authorization />}
    </div>
  );
};

export default Header;
