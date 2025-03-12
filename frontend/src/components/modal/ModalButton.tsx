import React from "react";
import useModal from "../../hooks/useModal";

interface ModalButtonProps {
  component: React.ReactNode;
  text: string;
}

const ModalButton: React.FC<ModalButtonProps> = ({ component, text }) => {
  const modal = useModal();

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
