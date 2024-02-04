import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { NavLink, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import './UserDashboard.css'
const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="grid grid-cols-12 mx-auto">
      <div className="col-span-3 mx-8 hidden py-4 bg-white border rounded-lg border-gray-200 md:inline">
        <h2 className="text-xl font-semibold ps-5">Navigation</h2>
        <div className="my-4 navlinks flex flex-col w-full">
          <NavLink className="p-4 flex items-center gap-3" to="/userdashboard">
           <MdDashboard></MdDashboard> DashBoard
          </NavLink>
          <NavLink className="p-4" to="/myOrders">
            My Orders
          </NavLink>
          <NavLink className="p-4" to="/comming-soon">
            Download Free Book
          </NavLink>
          <NavLink className="p-4" to="/comming-soon">
            My eBook Library
          </NavLink>
          <NavLink className="p-4" to="/comming-soon">
            My List
          </NavLink>
          <NavLink className="p-4" to="/comming-soon">
            My Book Shelf
          </NavLink>
          <NavLink className="p-4" to="/comming-soon">
            My Wishlist
          </NavLink>
          <NavLink className="p-4" to="/comming-soon">
            My Rating Reviews
          </NavLink>
          <NavLink className="p-4" to="/comming-soon">
            My Points
          </NavLink>
          <NavLink className="p-4" to="/comming-soon">
            My Following Authors
          </NavLink>
          <NavLink className="p-4" to="/comming-soon">
            My Bkash Account
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
