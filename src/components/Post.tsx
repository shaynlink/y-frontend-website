import { useState } from 'react';
import { Post as PostType } from '../type' 

interface PostProps {
  currentPost: PostType;
}


const Post: React.FC<PostProps> = ({ currentPost }) => {
  const [post, setPosts] = useState<PostType>(currentPost);
  const userId = "currentUserId";

  const handleLike = (postId: string, userId: string) => {
    setPosts(prevPost => {
      if (!prevPost.likes.includes(userId)) {
        return { ...prevPost, likes: [...prevPost.likes, userId] };
      }
      return prevPost;
    });
  };

  const handleRepost = (postId: string, userId: string) => {
    setPosts(prevPost => {
      if (!prevPost.reposts.includes(userId)) {
        return { ...prevPost, reposts: [...prevPost.reposts, userId] };
      }
      return prevPost;
    });
  };

  const handleShare = () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(postUrl)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Could not copy text: ', err));
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
        <button onClick={() => console.log('Open comment modal for Post ID:', post.id)}>Comment</button>
        <button onClick={() => handleRepost(post.id, userId)}>Repost ({post.reposts.length})</button>
        <button onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

export default Post;
