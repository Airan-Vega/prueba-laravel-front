import { useState } from "react";
import { getPosts } from "../api/post/post";

export const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const callGetPostApi = async () => {
    setIsLoading(true);
    const postCollection = await getPosts();
    setPosts(postCollection);
    setIsLoading(false);
  };

  return {
    isLoading,
    posts,
    callGetPostApi,
  };
};
