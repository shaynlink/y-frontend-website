import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { getPosts, getFollowingPosts } from '../services/AuthService';
import { Post as PostType } from '../type';
import CreatePost from '../components/CreatePost';

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [feedType, setFeedType] = useState('pourVous');  

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let data;
        if (feedType === 'pourVous') {
          data = await getPosts();  
        } 
        else if (feedType === 'abonnements') {
          data = await getFollowingPosts();  
        }
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts", error);
      }
    };
    loadPosts();
  }, [feedType]); 

  const handlePostSubmit = async (content, image) => {
   
    console.log('Posting:', content, image);
    const newPost = { id: Date.now().toString(), content, image, user: { name: "CurrentUser" } }; 
    setPosts([newPost, ...posts]);
  };

  return (
    <div>
      <div>
        <button onClick={() => setFeedType('pourVous')}>Pour Vous</button>
        <button onClick={() => setFeedType('abonnements')}>Abonnements</button>
      </div>
      <CreatePost onPostSubmit={handlePostSubmit} />
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
