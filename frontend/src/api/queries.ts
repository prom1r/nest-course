import api from "./api";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("auth/login", credentials, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("auth/logout");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const register = async (credentials: {
  firstName: string;
  userName: string;
  email: string;
  password: string;
}) => {
  try {
    await api.post("auth/register", credentials);
  } catch (error) {
    console.log("Registration error");
    throw error;
  }
};

export const profile = async () => {
  try {
    const response = await api.get("users/profile", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log("User not faund");
    throw error;
  }
};

// export const useReqister = () => {
//   return useMutation({
//     mutationFn: register,
//   });
// };

// const getAllPosts = async () => {
//   const token = localStorage.getItem("token");
//   await api.get("/posts/get-all-posts", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// const createPost = async (credentials: { discription: string }) => {
//   const token = localStorage.getItem("token");
//   await api.post("posts/create", credentials, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const useCreatePost = () => {
//   const setPosts = usePostsStore((state) => state.setPosts);
//   return useMutation({
//     mutationFn: createPost,
//   });
// };
