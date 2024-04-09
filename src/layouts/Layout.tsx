import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UsersContext";
import { useNavigate } from 'react-router-dom'

export default function Layout() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/Login');
    }
  })
  
    return null;
}
