import { api } from "../api";

export const getUsers = async () => {
  try {
    const response = await api.get("/users");

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUser = async () => {
  try {
    const response = await api.post("/users");

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = async (id: string) => {
  try {
    const response = await api.put(`/users/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.put(`/users/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
