import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import "./UserDashboard.css";
import { GoHeart } from "react-icons/go";
import orderHistory from "../../../assets/orderhistory.png";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { AuthContext } from "../../../Providers/AuthProvider";
import useUser from "../../../Hooks/useUser";
import { Button } from "@nextui-org/react";
const UserDashboard = () => {
  const { logOut } = useContext(AuthContext);
  const [userData, isUserDataLoading] = useUser();
  // if(isUserDataLoading){
  //   return <h1>Loading........</h1>;
  // }
  console.log(userData);
  return (
    <>
      <div className="drawer lg:drawer-open my-7 md:mx-8">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start">
          <Button
            size="sm"
            color="success"
            radius="none"
            className="text-white bg-green-500 m-5 lg:hidden"
          >
            <label htmlFor="my-drawer-2">Open Dashboard</label>
          </Button>
          <div className="md:w-[90%] w-[93%] mx-auto">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side !z-50">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-white border border-gray-300 rounded-lg">
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
                <img className="w-5 h-5" src={orderHistory} alt="" /> Order
                History
              </NavLink>
              <NavLink
                className="p-4 flex items-center gap-3"
                to="/userdashboard/wishlist"
              >
                <GoHeart className="w-5 h-5"></GoHeart> Wish List
              </NavLink>
              <NavLink className="p-4 flex items-center gap-3" to="/mycart">
                <HiOutlineShoppingBag className="w-5 h-5"></HiOutlineShoppingBag>{" "}
                Shopping Cart
              </NavLink>
              <NavLink
                className="p-4 flex items-center gap-3"
                to="/userdashboard/settings"
              >
                <IoSettingsOutline className="w-5 h-5"></IoSettingsOutline>{" "}
                Settings
              </NavLink>{" "}
              {/* <NavLink className="p-4 flex items-center gap-3" to="artistProfile">
              <IoSettingsOutline className="w-5 h-5"></IoSettingsOutline>{" "}
                Artist Profile Settings
              </NavLink> */}
              {/* <NavLink className="p-4 flex items-center gap-3" to="addnewproduct">
                <HiOutlineShoppingBag className="w-5 h-5"></HiOutlineShoppingBag>{" "}
                Add New Product
              </NavLink> */}
              <div
                onClick={logOut}
                className="p-4 flex cursor-pointer items-center gap-3"
                to="/"
              >
                <TbLogout className="w-5 h-5"></TbLogout> Log Out
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
