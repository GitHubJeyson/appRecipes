import axios from './axios';

export const getComments = async (recipeId) => {
  try {
    const res = await axios.get(`/comments/recipe/${recipeId}`);
    return res.data;
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    throw new Error('No se pudieron obtener los comentarios');
  }
};

export const addComment = async (recipeId, content, user) => {
  try {
    const res = await axios.post(`/comments/recipe/${recipeId}`, { content, user });
    return res.data;
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    throw new Error('No se pudo agregar el comentario');
  }
};

export const deleteComment = async (recipeId, commentId, user) => {
  try {
    const res = await axios.delete(`/comments/${commentId}`, {
      data: { recipeId, user },
    });
    console.log('Comentario eliminado:', res.data);
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    throw new Error('No se pudo eliminar el comentario');
  }
};

