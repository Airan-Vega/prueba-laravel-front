import { api } from "../api";

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createPost = async (body: any) => {
  try {
    const response = await api.post("/posts", { ...body });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updatePost = async (id: string, body: any) => {
  try {
    const response = await api.put(`/posts/${id}`, { ...body });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deletePost = async (id: string) => {
  try {
    const response = await api.delete(`/posts/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
