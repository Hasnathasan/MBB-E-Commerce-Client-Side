import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import SignIn from "../Pages/Authentication/SignIn/SignIn";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/signin",
        element: <SignIn></SignIn>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      }
    ],
  },
]);

export default router;
