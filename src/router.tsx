import { Navigate, createBrowserRouter } from "react-router-dom";
import NotFound from "./views/not-found";
import DefaultLayout from "./layouts/default-layout";
import Dashboard from "./views/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/dashboard"} />,
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
