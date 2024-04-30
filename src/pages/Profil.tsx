import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMe, getUser } from '../services/AuthService';
import { BaseUser } from 'y-types/users';

import defaultProfile from '../assets/chad_default.png';

/**
 * Profil page react component.
 * @returns {JSX.Element}
 */
export default function Profil() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<BaseUser & { followers: number, following: number } | null>();
  // const [posts, setPosts] = useState<null | any>([]);
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

    fetchUserData();
  }, []);

  // If request is loading
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
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

  return (
    <div>
      {
        user.picture ?
          <img src={user.picture} alt={`${user.username}'s avatar`} /> :
          <img src={defaultProfile} alt={`Default avatar`} />
      }
      <h1>{user.username}</h1>
      <div>
        <Link to={`/users/${id}/followers`}>Followers: {user.followers}</Link>
        <Link to={`/users/${id}/following`}>Following: {user.following}</Link>
      </div>
      <button onClick={() => { navigate(`/Profile/${id}/Settings`) }}>
        Settings
      </button>
    </div>
  );
}
