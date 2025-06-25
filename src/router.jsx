// src/router.js
import { createBrowserRouter } from "react-router";
import Registration from "./components/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/signup",
    element: <Registration />,
  },
]);

export default router;
