import { useState, useEffect } from 'react';
import Post from '../../components/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import CreateCustomFeedModal from '../../components/CreateCustomFeedModal'; 
import { getPosts, getFollowingPosts, getCustomFeedPosts } from '../../services/AuthService';
import { Post as PostType } from '../../type';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './Feed.module.scss'
import ClickableLayer from '../../components/ClickableLayer/ClickableLayer';
// TODO ajouter un nom au nouveu feed et le faire apparaitre dans le menu
function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [feedType, setFeedType] = useState('forYou');  
  const [isModalOpen, setModalOpen] = useState(false);
  const [customFeeds, setCustomFeeds] = useState({}); 

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let data;
        if (feedType === 'forYou') {
          data = await getPosts();  
        } else if (feedType === 'subscriptions') {
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
      <div className={styles.navbar}>
        <div className={styles.containerBreadcrumb}>
          <Breadcrumb items={[
              {
                id: 'ForYou',
                label: 'For You',
                onClick: () => setFeedType('forYou'),
                isActive: true,
              },
              {
                id: 'Subscriptions',
                label: 'Subscriptions',
                onClick: () => setFeedType('subscriptions'),
                isActive: false
              },
              {
                id: '34234542efa4',
                label: 'My Custom Feed',
                onClick: () => setFeedType('34234542efa4'),
                isActive: false
              }
            ]}
          />
        </div>
        <div className={styles.containerAddFeed}>
          <div className={styles.btnAddFeed}>
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12H16M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <CreatePost onPostSubmit={handlePostSubmit} />
      <div className={styles.separator}></div>
      {posts.map((post) => (
        <Post key={post.id} currentPost={post} />
      ))}
      <CreateCustomFeedModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreateFeed={handleCreateFeed}
      />
      <ClickableLayer>
        Hello
      </ClickableLayer>
    </div>
  );
}

export default Feed;
