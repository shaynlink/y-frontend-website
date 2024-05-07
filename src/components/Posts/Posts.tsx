import { useEffect, useState } from 'react'
// import Post from '../Post';
import { getPosts } from '../../services/AuthService';
import Post from '../Post/Post';

interface PostsProps {
  type: string;
}

const LIMIT = 10;

export default function Posts({ type }: PostsProps) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      await getPosts(type, page, LIMIT)
        .then((response) => {
          if (response?.data?.result) {
            console.log(response.data.result)
            setPosts(response.data.result as any);
            setLoading(false)
          }
        })
    }

    loadPosts();
  }, [type, page])

  return (
    <>
      {loading && (
        <div className="loading">
          <span className="spinner" />
        </div>
      )}
      {!loading && (
        posts.map((post) => (
          <Post currentPost={post} />
        ))
      )}
    </>
  )
}