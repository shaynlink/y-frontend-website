import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import { createBrowserRouter } from "react-router-dom";
import Feed from "./pages/Feed";

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
    }
  ]);

export default router;