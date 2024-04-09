import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import { createBrowserRouter } from "react-router-dom";

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
    }
  ]);

export default router;