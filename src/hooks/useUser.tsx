import { useState } from "react";
import { getUsers } from "../api/user/user";

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const callGetUserApi = async () => {
    setIsLoading(true);
    const userCollection = await getUsers();
    setUsers(userCollection);
    setIsLoading(false);
  };

  return {
    isLoading,
    users,
    callGetUserApi,
  };
};
