import { useState } from "react";
import { useCreateNewPost } from "../../hooks/useCreateNewPost";
import useModalStore from "../../store/modalStore";

const CreateNewPost = () => {
  const [text, setText] = useState({ discription: "" });
  const createNewPost = useCreateNewPost();
  const modal = useModalStore();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText({ discription: e.target.value });
  };

  const handleCreatePost = () =>
    createNewPost.mutate(text, {
      onSuccess: () => {
        modal.close();
      },
    });

  return (
    <div>
      <h1>Create New Posts</h1>
      <textarea autoFocus rows={4} cols={50} onChange={handleTextChange} />
      <button onClick={handleCreatePost}>Create</button>
    </div>
  );
};

export default CreateNewPost;
