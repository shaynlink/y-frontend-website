// types.d.ts
export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: string[];
  comments: Comment[]; 
  reposts: string[]; 
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
}


