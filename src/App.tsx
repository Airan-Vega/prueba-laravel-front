import { useEffect } from "react";

import { useUser } from "./hooks/useUser";
import { usePost } from "./hooks/usePost";
import { useComment } from "./hooks/useComment";

export const App = () => {
  const { isLoading: isLoadingUser, users, callGetUserApi } = useUser();
  const { isLoading: isLoadingPost, posts, callGetPostApi } = usePost();
  const {
    isLoading: isLoadingComment,
    comments,
    callGetCommentApi,
  } = useComment();

  useEffect(() => {
    callGetUserApi();
    callGetPostApi();
    callGetCommentApi();
  }, []);

  console.log(comments);

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h1>Users</h1>
          {!isLoadingUser && users && users.length > 0 && (
            <ul>
              {users.map((user) => (
                <li key={user.dni}>
                  {user.name} - {user.dni}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <h1>Posts</h1>
          {!isLoadingPost && posts && posts.length > 0 && (
            <ul>
              {posts.map((post, index) => (
                <li key={index}>
                  {post.title} - {post.user_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <h1>Comments</h1>
          {!isLoadingComment && comments && comments.length > 0 && (
            <ul>
              {comments.map((comment) => (
                <li key={comment.dni}>
                  {comment.content} - {comment.post_title} - {comment.user_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
