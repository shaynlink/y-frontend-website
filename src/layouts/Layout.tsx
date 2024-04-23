import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UsersContext";
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    console.log('user', user)
    if (!user) {
      navigate('/Login');
    }
  }, [user])
  
    return (
      <Outlet />
    );
}
