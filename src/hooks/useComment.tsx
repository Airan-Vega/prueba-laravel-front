import { useState } from "react";
import { getComments } from "../api/comment/comment";

export const useComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const callGetCommentApi = async () => {
    setIsLoading(true);
    const postCollection = await getComments();
    setComments(postCollection);
    setIsLoading(false);
  };

  return {
    isLoading,
    comments,
    callGetCommentApi,
  };
};
