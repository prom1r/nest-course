import { useMutation } from "@tanstack/react-query";
import { createNewPost } from "../api/queries";
import { usePostsStore } from "../store/postsStore";

export const useCreateNewPost = () => {
  const fetchUserPosts = usePostsStore((state) => state.fetchUserPosts);
  return useMutation({
    mutationFn: createNewPost,
    onSuccess: () => {
      fetchUserPosts();
    },
  });
};
