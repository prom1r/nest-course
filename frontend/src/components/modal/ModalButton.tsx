import React from "react";
import useModalStore from "../../store/modalStore";

interface ModalButtonProps {
  component: React.ReactNode;
  text: string;
}

const ModalButton: React.FC<ModalButtonProps> = ({ component, text }) => {
  const modal = useModalStore();

  const handleClick = () => {
    modal.component = component;
    modal.open();
  };

  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

export default ModalButton;
