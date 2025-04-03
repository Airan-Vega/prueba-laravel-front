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

export const createUser = async (body: any) => {
  try {
    const response = await api.post("/users", { ...body });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = async (id: string, body: any) => {
  try {
    const response = await api.put(`/users/${id}`, { ...body });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
