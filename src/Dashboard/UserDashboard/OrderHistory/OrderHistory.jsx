import { Link, Outlet, useLocation } from "react-router-dom";
import "./OrderHistory.css";

const OrderHistory = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div
        className={`border rounded-lg overflow-auto ${
          location?.pathname === "/userdashboard/orderhistory/orderdetails"
            ? "hidden"
            : ""
        } border-gray-300`}
      >
        <h4 className="p-4 text-lg font-semibold">Order History</h4>
        <table className="overflow-auto w-full">
          <tr>
            <th>Order Id</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>#2233</td>
            <td>27 Mar, 2021</td>
            <td>$250.00 (4 Products)</td>
            <td>Completed</td>
            <td className="text-green-500 font-semibold">
              <Link to={"/userdashboard/orderhistory/orderdetails"}>
                View Details
              </Link>
            </td>
          </tr>
          <tr>
            <td>#2233</td>
            <td>27 Mar, 2021</td>
            <td>$250.00 (4 Products)</td>
            <td>Completed</td>
            <td className="text-green-500 font-semibold">
              <Link to={"/userdashboard/orderhistory/orderdetails"}>
                View Details
              </Link>
            </td>
          </tr>
          <tr>
            <td>#2233</td>
            <td>27 Mar, 2021</td>
            <td>$250.00 (4 Products)</td>
            <td>Completed</td>
            <td className="text-green-500 font-semibold">
              <Link to={"/userdashboard/orderhistory/orderdetails"}>
                View Details
              </Link>
            </td>
          </tr>
          <tr>
            <td>#2233</td>
            <td>27 Mar, 2021</td>
            <td>$250.00 (4 Products)</td>
            <td>Completed</td>
            <td className="text-green-500 font-semibold">
              <Link to={"/userdashboard/orderhistory/orderdetails"}>
                <Link to={"/userdashboard/orderhistory/orderdetails"}>
                  View Details
                </Link>
              </Link>
            </td>
          </tr>
        </table>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default OrderHistory;
