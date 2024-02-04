import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { NavLink, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import './UserDashboard.css'
import { GoHeart } from "react-icons/go";
import orderHistory from '../../../assets/orderhistory.png';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="grid grid-cols-12 mx-auto">
      <div className="col-span-3 mx-8 hidden py-4 bg-white border rounded-lg border-gray-200 md:inline">
        <h2 className="text-xl font-semibold ps-5">Navigation</h2>
        <div className="my-4 navlinks flex flex-col w-full">
          <NavLink className="p-4 flex items-center gap-3" to="/userdashboard/profile">
           <MdDashboard className="w-6 h-6"></MdDashboard> DashBoard
          </NavLink>
          <NavLink className="p-4 flex items-center gap-3" to="/userdashboard/orderhistory">
          <img src={orderHistory} alt="" /> Order History
          </NavLink>
          <NavLink className="p-4 flex items-center gap-3" to="/userdashboard/wishlist">
            <GoHeart></GoHeart> Wish List
          </NavLink>
          <NavLink className="p-4 flex items-center gap-3" to="/userdashboard/shoppingcart">
          <HiOutlineShoppingBag ></HiOutlineShoppingBag> Shopping Cart
          </NavLink>
          <NavLink className="p-4 flex items-center gap-3" to="/userdashboard/settings">
          <IoSettingsOutline></IoSettingsOutline> Settings
          </NavLink>
          <NavLink className="p-4 flex items-center gap-3" to="/">
            <TbLogout></TbLogout> Log Out
          </NavLink>
        </div>
      </div>
      <div className="col-span-12 md:col-span-9">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserDashboard;
