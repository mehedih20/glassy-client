import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { routeGenerator } from "../utils/routeGenerator";
import { superAdminPaths, userPaths } from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: <App />,
    children: routeGenerator(userPaths),
  },
  {
    path: "/manager",
    element: <App />,
    children: routeGenerator(userPaths),
  },
  {
    path: "/super-admin",
    element: <App />,
    children: routeGenerator(superAdminPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
