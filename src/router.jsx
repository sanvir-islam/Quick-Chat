// src/router.js
import { createBrowserRouter } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
