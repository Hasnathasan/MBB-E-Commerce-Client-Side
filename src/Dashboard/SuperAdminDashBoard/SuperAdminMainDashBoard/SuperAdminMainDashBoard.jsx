import { Button } from "@nextui-org/react";
import { BsFillPeopleFill, BsPersonCircle } from "react-icons/bs";
import {
  FaBookmark,
  FaProductHunt,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./SuperAdminMainDashBoard.css";
import { Toaster } from "react-hot-toast";
import useSystemInfo from "../../../Hooks/useSystemInfo";
const SuperAdminMainDashBoard = () => {
  const [systemInfo] = useSystemInfo();
  
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-[100%] bg-[#f8f8f8] mt-12 lg:mt-0 overflow-auto px-2 md:px-0 flex flex-col min-h-screen items-center justify-start py-8">
        {/* Page content here */}
        <Outlet></Outlet>
        {/* <label
          
          className="btn btn-primary"
        >
          Open drawer
        </label> */}
        <div className=" bg-white shadow rounded-md mx-2 flex justify-center items-center p-3 absolute top-2 lg:hidden left-0 right-0">
          <Button
            className="basis-1/2 hover:!text-white"
            size="sm"
            color="primary"
            radius="none"
            variant="solid"
          >
            <label
              htmlFor="my-drawer-2"
              className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center drawer-button"
            >
              Open Dashboard
            </label>
          </Button>
        </div>
      </div>
      <div className="drawer-side w-full">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        {/* Sidebar content here */}
        <div className="w-80"></div>
        <ul className="menu flex-nowrap top-0 fixed px-8 h-screen overflow-y-auto bg-gray-200 py-10 w-80 space-y-2">
        <Link to={"/"}>
            <img className="w-64 h-20" src={systemInfo?.[0]?.logo} alt="" />
          </Link>
          <li>
            <NavLink className="p-3 text-base" to="overview">
              <BsPersonCircle></BsPersonCircle> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="orders">
              <BsPersonCircle></BsPersonCircle> Orders
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="products">
              <FaProductHunt></FaProductHunt> Products
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="categories">
              <FaProductHunt></FaProductHunt> Categories
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="customers">
              <BsFillPeopleFill></BsFillPeopleFill> Customers
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="Artists">
              <BsFillPeopleFill></BsFillPeopleFill> Artists
            </NavLink>
          </li>

          <li>
            <NavLink className="p-3 text-base" to="managePrison">
              <FaBookmark></FaBookmark> Prisons / Organizations
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="sales-report">
              <FaBookmark></FaBookmark> Sales Report
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="banners">
              <FaBookmark></FaBookmark> Banners
            </NavLink>
          </li>
          <li>
            <NavLink className="p-3 text-base" to="settings">
              <FaBookmark></FaBookmark> Settings
            </NavLink>
          </li>
        </ul>
      </div>
      <Toaster />
    </div>
  );
};

export default SuperAdminMainDashBoard;
