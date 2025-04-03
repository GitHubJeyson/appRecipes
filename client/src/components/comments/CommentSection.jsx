import { useState, useEffect } from 'react';
import { useComments } from '../../hooks/useComment';
import { Button, Textarea } from '../ui';
import { FaTrashAlt, FaComment } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

export function CommentSection({ recipeId }) {
  const { comments, loading, fetchComments, addNewComment, removeComment } = useComments();
  const [newComment, setNewComment] = useState('');
  const [view, setView] = useState('view');
  const { user, isAuthenticated } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [longCommentId, setLongCommentId] = useState(null);

  useEffect(() => {
    fetchComments(recipeId);
  }, [recipeId, fetchComments, newComment]);

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      await addNewComment(recipeId, newComment, user.id);
      setNewComment('');
      setView('view');
    }
  };

  const handleDelete = (commentId) => {
    removeComment(recipeId, commentId, user);
  };

  const recipeComments = comments[recipeId] || [];

  const toggleExpanded = () => setExpanded(!expanded);

  const handleClickComment = (commentId) => {
    setLongCommentId(longCommentId === commentId ? null : commentId);
  };

  return (
    <div className="comment-section">
      {isAuthenticated && (
        <div className="dropdown mb-4">
          <Button onClick={() => setView(view === 'view' ? 'comment' : 'view')}>
            {view === 'view' ? <FaComment /> : 'Ver Comentarios'}
          </Button>
        </div>
      )}

      {view === 'view' ? (
        <div className="comments-list text-xs mt-1">
          <p className="text-zinc-400 text-sm font-semibold">Comentarios:</p>
          {loading ? (
            <p className="text-zinc-500">Cargando comentarios...</p>
          ) : recipeComments.length === 0 ? (
            <p className="text-zinc-500">No hay comentarios aún.</p>
          ) : (
            <>
              {recipeComments.slice(0, expanded ? recipeComments.length : 1).map((comment) => (
                <div key={comment._id} className="comment font-thin border-zinc-300">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-amber-400">{comment.user.username}</span>
                    {isAuthenticated && (comment.user._id === user.id || user.role === 'admin') && (
                      <Button onClick={() => handleDelete(comment._id)} className="text-red-500 hover:text-red-700">
                        <FaTrashAlt />
                      </Button>
                    )}
                  </div>
                  <div className='flex justify-between'>
                    <p className="text-zinc-400 mt-1">
                      {comment.content.length > 150 && longCommentId !== comment._id
                        ? `${comment.content.substring(0, 125)}`
                        : comment.content}
                      {comment.content.length > 150 && (
                      <button onClick={() => handleClickComment(comment._id)} className="text-zinc-300 mb-1">
                        {longCommentId === comment._id ? '. Ver menos' : '...Ver más'}
                      </button>
                      )}
                    </p>
                  </div>
                  <small className="text-zinc-500 block mt-1">
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>

                </div>
              ))}
              <button onClick={toggleExpanded} className="text-zinc-300 bg-zinc-900 py-1 px-2 mt-2 rounded-full hover:bg-zinc-600 transition-colors">
                {expanded ? '<' : '>'} {expanded}
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="comment-form">
          {isAuthenticated ? (
            <form onSubmit={handleSubmit} className="mt-4">
              <Textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Escribe un comentario..."
                className="w-full p-2 text-zinc-500 border border-zinc-300 rounded-lg"
                rows="3"
              />
              <Button type="submit" className="mt-2 bg-blue-500 text-white hover:bg-blue-600">
                Agregar comentario
              </Button>
            </form>
          ) : (
            <p className="text-zinc-500">Inicia sesión para comentar</p>
          )}
        </div>
      )}
    </div>
  );
}
