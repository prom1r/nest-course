import { useEffect, useRef } from "react";
import useModalStore from "../../store/modalStore";

const Modal = () => {
  const modal = useModalStore();
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (modal.isOpen) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [modal.isOpen, modal.component]);

  if (!modal.isOpen) return null;

  return (
    <dialog
      ref={modalRef}
      style={{ width: "50%", height: "50%", margin: "auto" }}
    >
      {modal.component}
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "50px",
          height: "50px",
        }}
        onClick={modal.close}
      >
        X
      </button>
    </dialog>
  );
};

export default Modal;
