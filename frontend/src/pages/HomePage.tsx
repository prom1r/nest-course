import LoginForm from "../components/form/LoginForm";
import RegistrationForm from "../components/form/RegistrationForm";
import Modal from "../components/modal/Modal";
import ModalButton from "../components/modal/ModalButton";
import useModal from "../hooks/useModal";

const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div>
        <h1 style={{ margin: "0" }}>Главная страница</h1>
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        <ModalButton component={<LoginForm />} text="Логин" />
        <ModalButton component={<RegistrationForm />} text="Регистрация" />
        <Modal />
      </div>
    </div>
  );
};

export default HomePage;
