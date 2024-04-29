import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    if (!localToken) {
      navigate('/Login');
    }
  }, [])
  
    return (
      <Outlet />
    );
}
