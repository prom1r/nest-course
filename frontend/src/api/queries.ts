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
    await api.get("auth/logout", {
      withCredentials: true,
    });
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

export const createNewPost = async (post: any) => {
  try {
    const response = await api.post("posts/create", post, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Post not created");
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    const response = await api.delete(`posts/delete-post/`, {
      params: { id },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Post not deleted");
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await api.get("posts/get-all-posts", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Posts not found");
    throw error;
  }
};
