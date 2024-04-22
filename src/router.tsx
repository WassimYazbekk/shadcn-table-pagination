import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/login";
import Cashcade from "./views/cashcade";
import Dashboard from "./views/dashboard";
import NotFound from "./views/not-found";
import DefaultLayout from "./layouts/default-layout";
import CreateUser from "./views/cashcade/users/create";
import CashcadeUserPage from "./views/cashcade/users/show";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/cashcade",
        children: [
          { path: "/cashcade", element: <Cashcade /> },
          { path: "/cashcade/users/create", element: <CreateUser /> },
          { path: "/cashcade/user/:id", element: <CashcadeUserPage /> },
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
