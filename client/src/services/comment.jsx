import { useState, useCallback } from 'react';
import CommentContext from '../context/commentContext.js';
import { getComments, addComment, deleteComment } from '../services/apiComment.js';

export function CommentProvider({ children }) {
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async (recipeId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getComments(recipeId);

      if (res && Array.isArray(res)) {
        setComments((prevComments) => ({
          ...prevComments,
          [recipeId]: res,
        }));
      } else {
        console.error('Formato de respuesta incorrecto:', res);
        setError('No se pudieron cargar los comentarios correctamente.');
      }
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
      setError('Hubo un problema al obtener los comentarios.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addNewComment = async (recipeId, content, user) => {
    try {
      const newComment = await addComment(recipeId, content, user);
      setComments((prevComments) => ({
        ...prevComments,
        [recipeId]: [newComment, ...(prevComments[recipeId] || [])],
      }));
    } catch (error) {
      console.error('Error al agregar el comentario:', error);
    }
  };

const removeComment = async (recipeId, commentId, user) => {
  try {
    await deleteComment(recipeId, commentId, user);
    setComments((prevComments) => ({
      ...prevComments,
      [recipeId]: prevComments[recipeId].filter((comment) => comment._id !== commentId),
    }));
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    setError('Hubo un problema al eliminar el comentario.');
  }
};

  

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        error,
        fetchComments,
        addNewComment,
        removeComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
