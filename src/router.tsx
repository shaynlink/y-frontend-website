import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import { createBrowserRouter } from "react-router-dom";
import Feed from "./pages/Feed";
import PostPage from './pages/PostPage';
import Profil from "./pages/Profil";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
          index: true
        },
      ],
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/feed',
      element: <Feed />
    },
    {
      path: '/post/:id',
      element: <PostPage />
    },
    {
      path: '/Profile/:id',
      element: <Profil />,
      children: [
        {
          path: '/Profile/:id/Followers',
          element: <div>Followers</div>
        },
        {
          path: '/Profile/:id/Following',
          element: <div>Following</div>
        },
        {
          path: '/Profile/:id/Posts',
          element: <div>Posts</div>
        }
      ],
    },
    {
      path: '/Profile/:id/Settings',
      element: <Settings />
    },   
    {
      path: '*',
      element: <div>404</div>
    }
  ]);

export default router;