import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import Home from "../Pages/Home/Home/Home";
import UserDashboard from "../Dashboard/UserDashboard/MainDashBoard/UserDashboard";
import Profile from "../Dashboard/UserDashboard/Profile/Profile";
import OrderHistory from "../Dashboard/UserDashboard/OrderHistory/OrderHistory";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/userdashboard",
        element: <PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>,
        children: [
          {
            path: "profile",
            element: <Profile></Profile>
          },
          {
            path: "orderhistory",
            element: <OrderHistory></OrderHistory>
          },
          {
            path: "wishlist",
            element: <Profile></Profile>
          },
          {
            path: "shoppingcart",
            element: <Profile></Profile>
          },
          {
            path: "settings",
            element: <Profile></Profile>
          },
        ]
      }
    ],
  },
]);

export default router;
