import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { getPosts, getFollowingPosts } from '../services/AuthService';
import { Post as PostType } from '../type';

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [feedType, setFeedType] = useState('pourVous');  // 'pourVous' ou 'abonnements'

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let data;
        if (feedType === 'pourVous') {
          data = await getPosts();  // Charger les posts pour l'onglet "Pour vous"
        } 
        else if (feedType === 'abonnements') {
          data = await getFollowingPosts();  // Charger les posts pour l'onglet "Abonnements"
        }
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts", error);
      }
    };
    loadPosts();
  }, [feedType]);  // Ré-exécuter l'effet lorsque feedType change

  return (
    <div>
      <div>
        <button onClick={() => setFeedType('pourVous')}>Pour Vous</button>
        <button onClick={() => setFeedType('abonnements')}>Abonnements</button>
      </div>
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
