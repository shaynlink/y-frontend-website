import { useState, useEffect } from 'react';
import CreatePost from '../../components/CreatePost/CreatePost';
import { createPost, getFeeds, createList } from '../../services/AuthService';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './Feed.module.scss'
import Posts from '../../components/Posts/Posts'
import FeedModal from './FeedModal';

type FeedType = 'forYou' | 'subscriptions' | string;
interface Feed {
  _id: string;
  name: string;
}

function Feed() {
  const [feeds, setFeeds] = useState<Feed[]>([{
    _id: 'fyp',
    name: 'For You'
  }, {
    _id: 'subscriptions',
    name: 'Subscription'
  }]);
  const [feedType, setFeedType] = useState<FeedType>('fyp');  
  const [isModalOpen, setModalOpen] = useState(false);
  const [customFeeds, setCustomFeeds] = useState({});
  const [postsKey, setPostsKey] = useState(0);
  const [feedModal, setFeedModal] = useState(false);

  useEffect(() => {
    const loadFeeds = async () => {
      await getFeeds()
        .then((response) => {
          setFeeds((_feeds) => {
            const newFeed = [..._feeds];
            if (response.data?.result) {
              for (const _feed of response.data.result as any[]) {
                if (!newFeed.some((f) => f._id === _feed._id)) {
                  newFeed.push(_feed);
                }
              }
            }
            return newFeed;
          })
        })
    }

    loadFeeds();
  }, []); 

  const handlePostSubmit = async (text: string, files: File[]) => {
    console.log(text, files);
    createPost(text, files)
      .then((response) => {
        console.log(response.data);
        
        if (response.data) {
          setPostsKey((key) => key + 1);
        }
      })
  };

  const handleCreateFeed = async (name: string, userIds: string[]) => {
    await createList(name, userIds);
    setFeedModal(false);
  };

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.containerBreadcrumb}>
          <Breadcrumb
            active={feedType}
            onClick={(id: string) => setFeedType(id)}
            items={feeds}
          />
        </div>
        <div className={styles.containerAddFeed}>
          <div className={styles.btnAddFeed}>
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setFeedModal(true)}
            >
              <path d="M8 12H16M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <CreatePost onPostSubmit={handlePostSubmit} />
      <div className={styles.separator}></div>
      <Posts key={postsKey + feedType} type={feedType} />
      {feedModal && <FeedModal handleSubmit={handleCreateFeed} />}
    </div>
  );
}

export default Feed;
