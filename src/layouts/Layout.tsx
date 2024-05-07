import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './Layout.module.scss'

import HomeIcon from '../components/icons/Home';
import ProfileIcon from '../components/icons/Profile';
import { UserContext } from '../contexts/UsersContext';

import defaultPicture from '../assets/chad_default.png';
import { getMe } from '../services/AuthService';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, onLogout, setUser } = useContext(UserContext);

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    if (!localToken) {
      navigate('/login');
    } else {
      if (!user) {
        getMe()
          .then((response) => {
            if (response.data.result) {
              setUser?.(response.data.result);
            }
          })
      }
    }
  }, [])

  if (!user) {
    return (
      <div className="loading">
        <span className="spinner" />
      </div>
    )
  }

  const picture = !user?.picture
    ? defaultPicture
    : `https://storage.googleapis.com/y-bucket-cdn/${user?._id}/${user?.picture}`;
  
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.branding}>
          <h1>Y</h1>
          <p>Trash of internet</p>
        </div>
        <nav className={styles.listLink}>
          <button className={styles.btnLink} onClick={() => navigate('/')}>
            <HomeIcon isActive={location.pathname === '/'} classNames={styles.icon} />
            Home
          </button>
          <button className={styles.btnLink} onClick={() => navigate('/profile/me')}>
            <ProfileIcon isActive={location.pathname === '/profile/me'} classNames={styles.icon} />
            Profile
          </button>
        </nav>
        <div className={styles.account}>
          <div>
            <div 
              className={styles.badge}
              onClick={(evt) => {
                evt.stopPropagation();
                navigate('/profile/me')
              }}
            >
              <div className={styles.self}>
                <img
                  src={picture}
                  alt={`Picture of ${user?.username}`}
                  width={50}
                  height={50}
                  className={styles.icon}
                />
                <p>{user?.username}</p>
              </div>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(evt) => {
                  evt.stopPropagation();
                  onLogout?.();
                  navigate('/login');
                }}
              >
                <path d="M12 3V12M18.3611 5.64001C19.6195 6.8988 20.4764 8.50246 20.8234 10.2482C21.1704 11.994 20.992 13.8034 20.3107 15.4478C19.6295 17.0921 18.4759 18.4976 16.9959 19.4864C15.5159 20.4752 13.776 21.0029 11.9961 21.0029C10.2162 21.0029 8.47625 20.4752 6.99627 19.4864C5.51629 18.4976 4.36274 17.0921 3.68146 15.4478C3.00019 13.8034 2.82179 11.994 3.16882 10.2482C3.51584 8.50246 4.37272 6.8988 5.6311 5.64001" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.subContainer}>
        <Outlet />
      </div>
    </div>
  );
}
