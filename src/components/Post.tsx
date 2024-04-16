import { useState } from 'react';
import { Post as PostType } from '../type'

interface PostProps {
  currentPost: PostType;
}

const Post: React.FC<PostProps> = ({ currentPost }) => {
  const [post, setPosts] = useState<PostType>(currentPost);
  const userId = "currentUserId";

  console.log(post);

  const handleLike = (postId: string, userId: string) => {
    setPosts(post => {
      if (post.id === postId && !post.likes.includes(userId)) {
        return { ...post, likes: [...post.likes, userId] };
      }
      return post;
    });
  };

  const handleRepost = (postId: string, userId: string) => {
    setPosts(post => {
      if (post.id === postId && !post.reposts.includes(userId)) {
        return { ...post, reposts: [...post.reposts, userId] };
      }
      return post;
    });
  };

  const handleComment = (id: string) => {
    /** @TODO **/  
    // Cette fonction pourrait ouvrir un formulaire de commentaire ou gérer les commentaires différemment
    console.log('Open comment modal for Tweet ID:', id);
  };
  
  return (
    <div className="post">
      <div className="post-header">
        <img src={post.user.avatar} alt="avatar" />
        <h3>{post.user.name}</h3>
        <h1>{post.id}</h1>
      </div>
      <p>{post.content}</p>
      <span>{new Date(post.timestamp).toLocaleString()}</span>
      <div className="actions">
        <button onClick={() => handleLike(post.id, userId)}>Like ({post.likes.length})</button>
        <button onClick={() => handleComment(post.id)}>Comment</button>
        <button onClick={() => handleRepost(post.id, userId)}>Repost ({post.reposts.length})</button>
        <button onClick={() => alert('Share this post')}>Share</button>
      </div>
    </div>
  );
}
export default Post;