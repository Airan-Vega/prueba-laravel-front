import { api } from "../api";

export const getComments = async () => {
  try {
    const response = await api.get("/comments?per_page=5");

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createComment = async () => {
  try {
    const response = await api.post("/comments");

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateComment = async (id: string) => {
  try {
    const response = await api.put(`/comments/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteComment = async (id: string) => {
  try {
    const response = await api.put(`/comments/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
