import { useEffect } from "react";
import { usePostsStore } from "../../store/postsStore";
import { useDeletePost } from "../../hooks/useDeletePost";

interface Post {
  id: number;
  discription: string;
}

const Post = ({ id, discription }: Post) => {
  const mutate = useDeletePost();
  return (
    <div
      style={{
        display: "flex",
        width: "30px",
        height: "30px",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <h4>{discription}</h4>
      <button onClick={() => mutate.mutate(id)}>Delete</button>
    </div>
  );
};

const UserPosts = () => {
  const posts = usePostsStore((state) => state.posts);
  const fetchUserPosts = usePostsStore((state) => state.fetchUserPosts);

  useEffect(() => {
    fetchUserPosts();
  }, []);
  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default UserPosts;
