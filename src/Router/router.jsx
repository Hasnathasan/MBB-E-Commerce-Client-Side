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
import CheckoutPage from "../Pages/CheckoutPage/CheckOutFunctionality/CheckOutFunctionality";
import ArtistDetailsPage from "../Pages/ArtistDetailsPage/ArtistDetailsPage";
import AddNewProduct from "../Dashboard/ArtistDashboard/AddNewProduct/AddNewProduct";
import ArtistProfile from "../Dashboard/ArtistDashboard/ArtistProfile/ArtistProfile";
import SuperAdminMainDashBoard from "../Dashboard/SuperAdminDashBoard/SuperAdminMainDashBoard/SuperAdminMainDashBoard";
import ManagePrison from "../Dashboard/SuperAdminDashBoard/ManagePrison/ManagePrison";
import IAmWorkingOnIt from "../Components/IAmWorkingOnIt/IAmWorkingOnIt";
import ManageCustomers from "../Dashboard/SuperAdminDashBoard/ManageCustomers/ManageCustomers";
import ManageArtists from "../Dashboard/SuperAdminDashBoard/ManageArtists/ManageArtists";
import ManageProducts from "../Dashboard/SuperAdminDashBoard/ManageProducts/ManageProducts";
import ProductCardsForProductPage from "../Pages/Products/ProductCardsForProductPage/ProductCardsForProductPage";
import Artists from "../Pages/Artists/Artists";
import Categories from "../Pages/Categories/Categories";
import AboutUs from "../Pages/AboutUs/AboutUs";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import ContactUsPage from "../Pages/ContactUsPage/ContactUsPage";
import OverView from "../Dashboard/SuperAdminDashBoard/OverView/OverView";
import ManageOrders from "../Dashboard/SuperAdminDashBoard/ManageOrders/ManageOrders";
import CheckOutElement from "../Pages/CheckoutPage/CheckOutElement/CheckOutElement";


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
        path: "/shop",
        element: <Products></Products>,
        children: [
          {
            path: "filter",
            element: <ProductCardsForProductPage></ProductCardsForProductPage>
          }
        ]
      },
      {
        path: "/details/:id",
        element: <Details></Details>
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>
      },
      {
        path: "/artists",
        element: <Artists></Artists>
      },
      {
        path: "/categories",
        element: <Categories></Categories>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/contact-us",
        element: <ContactUsPage></ContactUsPage>
      },
      {
        path: "/mycart",
        element: <Cart></Cart>
      },
      {
        path: "/checkout",
        element: <CheckOutElement></CheckOutElement>
      },
      {
        path: "/artistDetails/:email",
        element: <ArtistDetailsPage></ArtistDetailsPage>
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
            element: <OrderHistory></OrderHistory>,
            children: [
          {
            path: "orderdetails/:id",
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
  {
    path: "/adminDashboard",
    element: <PrivateRoute><SuperAdminMainDashBoard></SuperAdminMainDashBoard></PrivateRoute>,
    children: [
    {
      path: "overview",
      element: <OverView></OverView>
    },
    {
      path: "products",
      element: <ManageProducts></ManageProducts>
    },
    {
      path: "artists",
      element: <ManageArtists></ManageArtists>
    },
    {
      path: "customers",
      element: <ManageCustomers></ManageCustomers>
    },
    {
      path: "orders",
      element: <ManageOrders></ManageOrders>,
      children: [
        {
          path: "orderDetails/:id",
          element: <OrderDetails></OrderDetails>
        }
      ]
    },
    {
      path: "sales-report",
      element: <IAmWorkingOnIt></IAmWorkingOnIt>
    },
    {
      path: "settings",
      element: <IAmWorkingOnIt></IAmWorkingOnIt>
    },
    {
      path: "managePrison",
      element: <ManagePrison></ManagePrison>
    }
    ]
  }
]);

export default router;
