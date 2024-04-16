import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import { getUserData } from '../services/AuthService';


const Profil = () => {
  const navigate = useNavigate();
    //const { userId } = useParams();
    const userId = "e0a43746-8faf-481a-becd-4c305642fd17";
    const [user, setUser] = useState<null | any>();
    const [posts, setPosts] = useState<null | any>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData(userId);
            setUser(userData);
            //setPosts("983db02a-f8bc-470c-a81f-35d0ab2fad54");
            setPosts(userData.posts);
        };
        fetchUserData();
    }, [userId]);

    return (
        <div>
            <img src={user?.avatar} alt={`${user?.name}'s avatar`} />
            <h1>{user?.name}</h1>
            <div>
                <Link to={`/users/${userId}/followers`}>Followers: {user?.followers.length}</Link>
                <Link to={`/users/${userId}/following`}>Following: {user?.following.length}</Link>
            </div>
            <button onClick={() => {navigate(`/Profile/${userId}/Settings`)}}>
                Settings
            </button>
        </div>
    );
};

export default Profil;
