import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMe, getUser } from '../../services/AuthService';
import { BaseUser } from 'y-types/users';
import Post from '../../components/Post/Post';

import Style from './Profil.module.scss';

import defaultProfile from '../../assets/chad_default.png';

/**
 * Profil page react component.
 * @returns {JSX.Element}
 */
export default function Profil() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<BaseUser & { followers: number, following: number } | null>();
  const [posts, setPosts] = useState<null | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Is current user is me
  const isMe = id === 'me';

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      console.log('Is me ?', isMe);
      // Get method to call based on the user
      const funcGetUser = isMe ? getMe() : getUser(id as string);

      await funcGetUser
        .then((response) => {
          // If there is an error, return
          if (response.data.error) {
            return;
          } else {
            // Set user data
            setUser(response.data.result as BaseUser & { followers: number, following: number });
          }
        })
        .finally(() => {
          // When request is done, set loading to false
          setIsLoading(false);
        })
    };

    const fetchPosts = async () => {
      await getUser(id as string)
        .then((response) => {
          setPosts(response.data.result.posts);
        })
    }

    fetchUserData();
  }, []);

  // If request is loading
  if (isLoading) {
    return (
      <div className="loading">
        <span className="spinner" />
      </div>
    )
  }

  // If user is not found
  if (!user) {
    return (
      <div>
        <h1>User not found 😶‍🌫️</h1>
      </div>
    )
  }

  const picture = !user.picture
    ? defaultProfile
    : `https://storage.googleapis.com/y-bucket-cdn/${user._id}/${user.picture}`;

  return (
    <div className={Style.profilecontainer}>
      <div className={Style.profileavatar}>
      <img src={picture} alt={`${user.username}'s avatar`} />
      <button onClick={() => navigate(`/profile/${id}/settings`)} className={Style.profileeditbutton}>
        Edit profile
      </button>
      </div>
      <h1 className={Style.profileusername}>{user.username}</h1>
      <div className={Style.profilelinks}>
        <Link to={`/users/${id}/followers`}>{user.followers} Followers </Link>
        <Link to={`/users/${id}/following`}>{user.following} Following </Link>
      </div>
      {posts.map((post: any) => (
        <Post currentPost={post} />
      ))}
    </div>
  );
  
}
