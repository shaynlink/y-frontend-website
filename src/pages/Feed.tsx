import { useState, useEffect } from 'react';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import CreateCustomFeedModal from '../components/CreateCustomFeedModal'; 
import { getPosts, getFollowingPosts, getCustomFeedPosts } from '../services/AuthService';
import { Post as PostType } from '../type';
// TODO ajouter un nom au nouveu feed et le faire apparaitre dans le menu
function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [feedType, setFeedType] = useState('pourVous');  
  const [isModalOpen, setModalOpen] = useState(false);
  const [customFeeds, setCustomFeeds] = useState({}); 

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let data;
        if (feedType === 'pourVous') {
          data = await getPosts();  
        } else if (feedType === 'abonnements') {
          data = await getFollowingPosts();  
        } else if (customFeeds[feedType]) {
          data = await getCustomFeedPosts(customFeeds[feedType]); 
        }
        setPosts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts", error);
      }
    };
    loadPosts();
  }, [feedType, customFeeds]); 

  const handlePostSubmit = async (content, image) => {
    console.log('Posting:', content, image);
    const newPost = { id: Date.now().toString(), content, image, user: { name: "CurrentUser" } }; 
    setPosts([newPost, ...posts]);
  };

  const handleCreateFeed = (userIds) => {
    const newFeedId = `custom-${Date.now()}`;
    setCustomFeeds({...customFeeds, [newFeedId]: userIds});
    setFeedType(newFeedId); 
    setModalOpen(false);
  };

  return (
    <div>
      <div>
        <button onClick={() => setFeedType('pourVous')}>Pour Vous</button>
        <button onClick={() => setFeedType('abonnements')}>Abonnements</button>
        <button onClick={() => setModalOpen(true)}>Créer un Feed Personnalisé</button>
      </div>
      <CreatePost onPostSubmit={handlePostSubmit} />
      {posts.map((post) => (
        <Post key={post.id} currentPost={post} />
      ))}
      <CreateCustomFeedModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreateFeed={handleCreateFeed}
      />
    </div>
  );
}

export default Feed;
