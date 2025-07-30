// src/router.js
import { createBrowserRouter } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import MainRoute from "./components/MainRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import EmailVerification from "./pages/EmailVerification";
import Message from "./pages/Message";

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
      { path: "emailverification", Component: EmailVerification },
      { path: "/message", Component: Message },
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
