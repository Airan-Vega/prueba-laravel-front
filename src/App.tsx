import { useEffect, useState } from "react";

import { useUser } from "./hooks/useUser";
import { usePost } from "./hooks/usePost";
import { useComment } from "./hooks/useComment";
import { useForm } from "react-hook-form";
import { createUser, deleteUser, updateUser } from "./api/user/user";

const CREATE = "create";
const UPDATE = "update";
const DELETE = "delete";

export const App = () => {
  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    formState: { errors },
  } = useForm();

  const { isLoading: isLoadingUser, users, callGetUserApi } = useUser();
  const { isLoading: isLoadingPost, posts, callGetPostApi } = usePost();
  const {
    isLoading: isLoadingComment,
    comments,
    callGetCommentApi,
  } = useComment();

  const [responseUser, setResponseUser] = useState([]);

  useEffect(() => {
    callGetUserApi();
    callGetPostApi();
    callGetCommentApi();
  }, []);

  const onSubmitUser = async (data: any, action: string) => {
    console.log({ data, action });
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
    console.log({ responseData });
    setResponseUser(responseData);
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
                  {post.title} - {post.user_name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isLoadingComment && comments && comments.length > 0 && (
          <div className="col-4">
            <h1>Comments</h1>

            <ul>
              {comments.map((comment, index) => (
                <li key={index}>
                  {comment.content} - {comment.post_title} - {comment.user_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
