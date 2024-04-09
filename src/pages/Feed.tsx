import React, { useState, useEffect } from 'react';
import Post from '../components/Post';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('url-vers-votre-api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Erreur lors de la récupération des Posts", error));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
