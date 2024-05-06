import Login from "./pages/Login/Login";
import Layout from "./layouts/Layout";
import { createBrowserRouter } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import PostPage from './pages/PostPage';
import Profil from "./pages/Profil/Profil";
import Settings from "./pages/Settings/Settings";
import SignIn from "./pages/Signin/SignIn";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Feed />,
          index: true
        },
        {
          path: '/post/:id',
          element: <PostPage />,
          index: true
        },
        {
          path: '/profile/:id',
          element: <Profil />,
          children: [
            {
              path: '/profile/:id/Followers',
              element: <div>Followers</div>
            },
            {
              path: '/profile/:id/Following',
              element: <div>Following</div>
            },
            {
              path: '/profile/:id/Posts',
              element: <div>Posts</div>
            }
          ],
        },
        {
          path: '/profile/:id/Settings',
          element: <Settings />
        }
      ],
    },
    {
      path: '/login',
      element: <Login />
    },   
    {
      path: '/SignIn',
      element: <SignIn/>
    },
    {
      path: '*',
      element: <div>404</div>
    }
  ]);

export default router;