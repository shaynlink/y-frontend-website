import { createContext, useEffect, useState } from 'react';
import type { UserMe } from 'y-types/users'
import { getMe } from '../services/AuthService';

interface UserContextType {
  user: UserMe | null;
  setUser: React.Dispatch<React.SetStateAction<UserMe | null>> | null;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>> | null;
  onLogout: (() => void) | null;
}

export const UserContext = createContext<UserContextType>({
  token: null,
  user: null,
  setUser: null,
  setToken: null,
  onLogout: null
});

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserMe | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const pupolateUser = async () => {
      if (!user) {
        if (!token) {
          const localToken = window.localStorage.getItem('token');
          if (localToken) {
            await getMe()
              .then((response) => {
                if (response.data.result) {
                  setUser(response.data.result);
                }
              })
              .catch((error) => {
                if (error.response?.data?.error?.message == 'Unable to verify token') {
                  window.localStorage.removeItem('token');
                  setToken(null);
                }
              })
            setToken(localToken);
          }
        }
      }
    }

    pupolateUser();
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      onLogout: handleLogout
    }}>
      {children}
    </UserContext.Provider>
  )
}
