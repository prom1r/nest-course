import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../api/queries";
import { usePostsStore } from "../store/postsStore";

export const useDeletePost = () => {
  const fetchUserPosts = usePostsStore((state) => state.fetchUserPosts);
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      fetchUserPosts();
    },
  });
};
