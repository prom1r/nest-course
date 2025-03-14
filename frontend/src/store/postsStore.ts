import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createNewPost, getAllPosts } from "../api/queries";

interface Post {
  id: number;
  discription: string;
}

interface PostsStore {
  posts: Post[] | null;
  fetchUserPosts: () => Promise<void>;
}
export const usePostsStore = create<PostsStore>()(
  devtools(
    immer((set) => {
      return {
        posts: null,
        fetchUserPosts: async () => {
          const data = await getAllPosts();
          set({ posts: data });
        },
      };
    })
  )
);
