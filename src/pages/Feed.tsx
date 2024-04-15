import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { getPosts } from '../services/AuthService';
import { Post as PostType } from '../type';


function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);

  /*useEffect(() => {
    fetch('url-vers-votre-api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Erreur lors de la récupération des Posts", error));
  }, []);*/


  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts", error);
      }
    };
    loadPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post 
          key={post.id} 
          currentPost={post}     
        />
      ))}
    </div>
  );
}

export default Feed;
