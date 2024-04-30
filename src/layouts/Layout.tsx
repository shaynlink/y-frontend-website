import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './Layout.module.scss'

import HomeIcon from '../components/icons/Home';
import ProfileIcon from '../components/icons/Profile';

export default function Layout() {
  const navigate = useNavigate()
  // Get actual path
  const location = useLocation();

  console.log(location);

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    if (!localToken) {
      navigate('/Login');
    }
  }, [])
  
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
        </div>
        <div className={styles.subContainer}>
          <Outlet />
        </div>
      </div>
    );
}
