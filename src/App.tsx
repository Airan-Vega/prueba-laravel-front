import { useEffect, useState } from "react";

import { useUser } from "./hooks/useUser";
import { usePost } from "./hooks/usePost";
import { useComment } from "./hooks/useComment";
import { useForm } from "react-hook-form";
import { createUser, deleteUser, updateUser } from "./api/user/user";
import { createPost, deletePost, updatePost } from "./api/post/post";
import {
  createComment,
  deleteComment,
  updateComment,
} from "./api/comment/comment";

const CREATE = "create";
const UPDATE = "update";
const DELETE = "delete";

export const App = () => {
  const { register: registerUser, handleSubmit: handleSubmitUser } = useForm();
  const { register: registerPost, handleSubmit: handleSubmitPost } = useForm();
  const { register: registerComment, handleSubmit: handleSubmitComment } =
    useForm();

  const { isLoading: isLoadingUser, users, callGetUserApi } = useUser();
  const { isLoading: isLoadingPost, posts, callGetPostApi } = usePost();
  const {
    isLoading: isLoadingComment,
    comments,
    callGetCommentApi,
  } = useComment();

  const [responseUser, setResponseUser] = useState([]);
  const [responsePost, setResponsePost] = useState([]);
  const [responseComment, setResponseComment] = useState([]);

  useEffect(() => {
    callGetUserApi();
    callGetPostApi();
    callGetCommentApi();
  }, []);

  const onSubmitUser = async (data: any, action: string) => {
    const { id, name, dni } = data;
    let responseData;
    if (action === CREATE) {
      responseData = await createUser({ name, dni });
    }

    if (action === UPDATE) {
      responseData = await updateUser(id, { name, dni });
    }

    if (action === DELETE) {
      responseData = await deleteUser(id);
    }

    setResponseUser(responseData);
  };

  const onSubmitPost = async (data: any, action: string) => {
    const { id, user_id, title, content } = data;

    let responseData;
    if (action === CREATE) {
      responseData = await createPost({ user_id, title, content });
    }

    if (action === UPDATE) {
      responseData = await updatePost(id, { user_id, title, content });
    }

    if (action === DELETE) {
      responseData = await deletePost(id);
    }
    setResponsePost(responseData);
  };

  const onSubmitComment = async (data: any, action: string) => {
    const { id, post_id, user_id, content } = data;
    let responseData;
    if (action === CREATE) {
      responseData = await createComment({ post_id, user_id, content });
    }

    if (action === UPDATE) {
      responseData = await updateComment(id, { post_id, user_id, content });
    }

    if (action === DELETE) {
      responseData = await deleteComment(id);
    }
    setResponseComment(responseData);
  };

  return (
    <div className="container">
      <div className="row">
        {!isLoadingUser && users && users.length > 0 && (
          <div className="col-4">
            <h1>Users</h1>

            <ul>
              {users.map((user) => (
                <li key={user.dni}>
                  {user.name} - {user.dni}
                </li>
              ))}
            </ul>

            <h1>Crear, Actualizar o Eliminar Usuario</h1>

            <form
              onSubmit={handleSubmitUser((data) =>
                onSubmitUser(data, "submit")
              )}
            >
              <div>
                <label>Id del usuario:</label>
                <input {...registerUser("id")} />
              </div>
              <div>
                <label>Name:</label>
                <input {...registerUser("name")} />
              </div>
              <div className="mt-2">
                <label>DNI:</label>
                <input {...registerUser("dni")} />
              </div>

              <div className="mt-3 flex">
                <button
                  type="button"
                  onClick={handleSubmitUser((data) =>
                    onSubmitUser(data, CREATE)
                  )}
                >
                  Crear nuevo usuario
                </button>
                <button
                  type="button"
                  onClick={handleSubmitUser((data) =>
                    onSubmitUser(data, UPDATE)
                  )}
                >
                  Actualizar usuario
                </button>
                <button
                  type="button"
                  onClick={handleSubmitUser((data) =>
                    onSubmitUser(data, DELETE)
                  )}
                >
                  Eliminar usuario
                </button>
              </div>
            </form>

            <h1>Respuesta de la API al guardar, actualizar o eliminar</h1>
            {JSON.stringify(responseUser)}
          </div>
        )}
        {!isLoadingPost && posts && posts.length > 0 && (
          <div className="col-4">
            <h1>Posts</h1>

            <ul>
              {posts.map((post, index) => (
                <li key={index}>
                  {post.title} - {post?.user_name}
                </li>
              ))}
            </ul>

            <h1>Crear, Actualizar o Eliminar Post</h1>

            <form
              onSubmit={handleSubmitPost((data) =>
                onSubmitPost(data, "submit")
              )}
            >
              <div>
                <label>Id del post:</label>
                <input {...registerPost("id")} />
              </div>

              <div>
                <label>Id del usuario:</label>
                <input {...registerPost("user_id")} />
              </div>
              <div className="mt-2">
                <label>Título:</label>
                <input {...registerPost("title")} />
              </div>
              <div className="mt-2">
                <label>Contenido:</label>
                <input {...registerPost("content")} />
              </div>

              <div className="mt-3 flex">
                <button
                  type="button"
                  onClick={handleSubmitPost((data) =>
                    onSubmitPost(data, CREATE)
                  )}
                >
                  Crear nuevo post
                </button>
                <button
                  type="button"
                  onClick={handleSubmitPost((data) =>
                    onSubmitPost(data, UPDATE)
                  )}
                >
                  Actualizar post
                </button>
                <button
                  type="button"
                  onClick={handleSubmitPost((data) =>
                    onSubmitPost(data, DELETE)
                  )}
                >
                  Eliminar post
                </button>
              </div>
            </form>

            <h1>Respuesta de la API al guardar, actualizar o eliminar</h1>
            {JSON.stringify(responsePost)}
          </div>
        )}

        {!isLoadingComment && comments && comments.length > 0 && (
          <div className="col-4">
            <h1>Comments</h1>

            <ul>
              {comments.map((comment, index) => (
                <li key={index}>
                  {comment.content} - {comment?.post_title} -{" "}
                  {comment?.user_name}
                </li>
              ))}
            </ul>

            <h1>Crear, Actualizar o Eliminar Comment</h1>

            <form
              onSubmit={handleSubmitComment((data) =>
                onSubmitComment(data, "submit")
              )}
            >
              <div>
                <label>Id del comentario:</label>
                <input {...registerComment("id")} />
              </div>

              <div>
                <label>Id del post:</label>
                <input {...registerComment("post_id")} />
              </div>
              <div>
                <label>Id del usuario:</label>
                <input {...registerComment("user_id")} />
              </div>
              <div className="mt-2">
                <label>Contenido:</label>
                <input {...registerComment("content")} />
              </div>

              <div className="mt-3 flex">
                <button
                  type="button"
                  onClick={handleSubmitComment((data) =>
                    onSubmitComment(data, CREATE)
                  )}
                >
                  Crear nuevo comment
                </button>
                <button
                  type="button"
                  onClick={handleSubmitComment((data) =>
                    onSubmitComment(data, UPDATE)
                  )}
                >
                  Actualizar comment
                </button>
                <button
                  type="button"
                  onClick={handleSubmitComment((data) =>
                    onSubmitComment(data, DELETE)
                  )}
                >
                  Eliminar comment
                </button>
              </div>
            </form>

            <h1>Respuesta de la API al guardar, actualizar o eliminar</h1>
            {JSON.stringify(responseComment)}
          </div>
        )}
      </div>
    </div>
  );
};
