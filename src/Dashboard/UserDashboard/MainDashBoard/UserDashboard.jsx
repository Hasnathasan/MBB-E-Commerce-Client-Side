import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { NavLink, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import "./UserDashboard.css";
import { GoHeart } from "react-icons/go";
import orderHistory from "../../../assets/orderhistory.png";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
// import useUser from "../../../Hooks/useUser";
const UserDashboard = () => {
  const {  logOut } = useContext(AuthContext);
  // const [userData, isUserDataLoading] = useUser();
  // console.log(user);
  return (
    <div className="grid grid-cols-12 items-start mx-5 mt-8 mb-24">
      <div className="col-span-3 mr-9 hidden py-4 bg-white border rounded-lg border-gray-200 md:inline">
        <h2 className="text-xl font-semibold ps-5">Navigation</h2>
        <div className="my-4 navlinks flex flex-col w-full">
          <NavLink
            className="p-4 flex items-center gap-3"
            to="/userdashboard/profile"
          >
            <MdDashboard className="w-5 h-5"></MdDashboard> DashBoard
          </NavLink>
          <NavLink
            className="p-4 flex items-center gap-3"
            to="/userdashboard/orderhistory"
          >
            <img className="w-5 h-5" src={orderHistory} alt="" /> Order History
          </NavLink>
          <NavLink
            className="p-4 flex items-center gap-3"
            to="/userdashboard/wishlist"
          >
            <GoHeart className="w-5 h-5"></GoHeart> Wish List
          </NavLink>
          <NavLink
            className="p-4 flex items-center gap-3"
            to="/mycart"
          >
            <HiOutlineShoppingBag className="w-5 h-5"></HiOutlineShoppingBag>{" "}
            Shopping Cart
          </NavLink>
          <NavLink
            className="p-4 flex items-center gap-3"
            to="/userdashboard/settings"
          >
            <IoSettingsOutline className="w-5 h-5"></IoSettingsOutline> Settings
          </NavLink>
          <div
            onClick={logOut}
            className="p-4 flex cursor-pointer items-center gap-3"
            to="/"
          >
            <TbLogout className="w-5 h-5"></TbLogout> Log Out
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-9">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserDashboard;
