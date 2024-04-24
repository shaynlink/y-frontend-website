import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CommentProps {
  postId: string;
}
interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  timestamp: string;
  likes: string[];
}

const Comments: React.FC<CommentProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`/api/posts/${postId}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [postId]);

  const handlePostComment = () => {
    if (newComment.trim()) {
      axios.post('/api/comments', { content: newComment, postId, userId: "currentUser" })
        .then(response => {
          setComments([...comments, response.data]);
          setNewComment("");
        })
        .catch(error => console.error('Error posting comment:', error));
    }
  };

  const handleDeleteComment = (commentId: string) => {
    axios.delete(`/api/comments/${commentId}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => console.error('Error deleting comment:', error));
  };

  const handleLikeComment = (commentId: string, userId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const isLiked = comment.likes.includes(userId);
        const updatedLikes = isLiked ? comment.likes.filter(id => id !== userId) : [...comment.likes, userId];
        return { ...comment, likes: updatedLikes };
      }
      return comment;
    }));
  };

  return (
    <div>
      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={handlePostComment}>Post Comment</button>
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <button onClick={() => handleLikeComment(comment.id, 'currentUser')}>Like ({comment.likes.length})</button>
          <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Comments;
