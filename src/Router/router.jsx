import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import Home from "../Pages/Home/Home/Home";
import UserDashboard from "../Dashboard/MainDashBoard/UserDashboard";
import Profile from "../Dashboard/UserDashboard/Profile/Profile";
import OrderHistory from "../Dashboard/UserDashboard/OrderHistory/OrderHistory";
import OrderDetails from "../Dashboard/UserDashboard/OrderDetails/OrderDetails";
import AccountSettings from "../Dashboard/UserDashboard/AccountSettings/AccountSettings";
import Cart from "../Pages/Cart/Cart";
import Products from "../Pages/Products/Products/Products";
import Details from "../Pages/Details/Details";
import Error from "../Pages/Error/Error";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import ArtistDetailsPage from "../Pages/ArtistDetailsPage/ArtistDetailsPage";
import AddNewProduct from "../Dashboard/ArtistDashboard/AddNewProduct/AddNewProduct";
import ArtistProfile from "../Dashboard/ArtistDashboard/ArtistProfile/ArtistProfile";


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
        path: "*",
        element: <Error></Error>
      },
      {
        path: "/products",
        element: <Products></Products>
      },
      {
        path: "/details",
        element: <Details></Details>
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
        path: "/checkout",
        element: <CheckoutPage></CheckoutPage>
      },
      {
        path: "/artistDetails",
        element: <ArtistDetailsPage></ArtistDetailsPage>
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
          {
            path: "addnewproduct",
            element: <AddNewProduct></AddNewProduct>
          },
          {
            path: "artistProfile",
            element: <ArtistProfile></ArtistProfile>
          },
        ]
      }
    ],
  },
]);

export default router;
