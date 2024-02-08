import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import Home from "../Pages/Home/Home/Home";
import UserDashboard from "../Dashboard/UserDashboard/MainDashBoard/UserDashboard";
import Profile from "../Dashboard/UserDashboard/Profile/Profile";
import OrderHistory from "../Dashboard/UserDashboard/OrderHistory/OrderHistory";
import OrderDetails from "../Dashboard/UserDashboard/OrderDetails/OrderDetails";
import AccountSettings from "../Dashboard/UserDashboard/AccountSettings/AccountSettings";
import Cart from "../Pages/Cart/Cart";


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
        path: "/mycart",
        element: <Cart></Cart>
      },
      {
        path: "/userdashboard",
        element: <UserDashboard></UserDashboard>,
        children: [
          {
            path: "profile",
            element: <Profile></Profile>
          },
          {
            path: "orderhistory",
            element: <OrderHistory></OrderHistory>,
            children: [
          {
            path: "orderdetails",
            element: <OrderDetails></OrderDetails>
          },
            ]
          },
          {
            path: "wishlist",
            element: <Profile></Profile>
          },
          {
            path: "settings",
            element: <AccountSettings></AccountSettings>
          },
        ]
      }
    ],
  },
]);

export default router;
