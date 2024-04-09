import { createContext, useState } from 'react';

interface User {
  email: string;
  username: string;
  picture?: string;
}

interface UserContextType {
    user: User | null;
    setUser: any | null;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: null
});

interface UserProviderProps {
    children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
