// src/router.js
import { createBrowserRouter } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MainRoute from "./components/MainRoute";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoute,
    children: [
      { index: true, Component: Registration },
      { path: "home", Component: Home },
      { path: "registration", Component: Registration },
      { path: "login", Component: Login },
      { path: "forgotpassword", Component: ForgotPassword },
    ],
  },
  // {
  //   path: "/registration",
  //   element: <Registration />,
  // },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/home",
  //   element: <Home />,
  // },
]);

export default router;
