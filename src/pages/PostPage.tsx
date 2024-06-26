import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post as PostType } from '../type';
import Post from '../components/Post/Post';
// import { getPost } from '../services/AuthService';
import Comments from '../components/Comment';

const PostPage = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const { id } = useParams<{id: string}>();

  useEffect(() => {
    const fetchPost = async () => {
      const foundPost = await getPost(id);
      console.log(foundPost);
      setPost(foundPost[0]);
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      {post ? <Post currentPost={post} /> : <p>Post not found.</p>}
      <Comments postId={id} />
    </div>
  );
};

export default PostPage;
