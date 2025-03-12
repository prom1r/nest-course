// import { useEffect, useRef, useState } from "react";
// import useModal from "../../hooks/useModal";
// import { useCreatePost } from "../../api/queries";

// const PostModal = () => {
//   const modal = useModal();
//   const modalRef = useRef<HTMLDialogElement>(null);
//   const [newDiscription, setNewDiscription] = useState("");
//   const mutation = useCreatePost();

//   const handleCreatePost = () => {
//     mutation.mutate({ discription: newDiscription });
//     modalRef.current?.close();
//   };

//   useEffect(() => {
//     if (!modalRef.current) return;

//     if (modal.isOpen) {
//       modalRef.current.showModal();
//     } else {
//       modalRef.current.close();
//     }
//   }, [modal.isOpen]);

//   if (!modal.isOpen) return null;

//   return (
//     <dialog
//       ref={modalRef}
//       style={{ width: "50%", height: "50%", margin: "auto" }}
//     >
//       <button onClick={modal.close}>X</button>
//       <h1>Новый пост</h1>
//       <input
//         type="text"
//         placeholder="Название поста"
//         onChange={(e) => setNewDiscription(e.target.value)}
//       />
//       <button onClick={handleCreatePost}>Создать</button>
//     </dialog>
//   );
// };

// export default PostModal;

export {};
