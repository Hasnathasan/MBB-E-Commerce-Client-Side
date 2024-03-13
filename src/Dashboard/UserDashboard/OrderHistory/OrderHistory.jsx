import { Link, Outlet, useLocation } from "react-router-dom";
import "./OrderHistory.css";
import useUserOrders from "../../../Hooks/useUserOrders";
import Loader from "../../../Components/Loader/Loader";

const OrderHistory = () => {
  const location = useLocation();
  console.log(location);
  const [orders, isOrdersLoading] = useUserOrders();
  if (isOrdersLoading) {
    return <Loader></Loader>;
  }
  console.log(orders);
  return (
    <>
      <div
        className={`border rounded-lg overflow-auto ${
          location?.pathname.includes(
            "/userdashboard/orderhistory/orderdetails"
          )
            ? "hidden"
            : ""
        } border-gray-300`}
      >
        <h4 className="p-4 text-lg font-semibold">Order History</h4>
        <table className="overflow-auto w-full">
          <tr>
            <th>Transaction Id</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {orders.length !== 0 ? orders?.map((order) => (
            <tr key={order?._id}>
              <td>{order?.transactionId}</td>
              <td>{order?.createdAt?.slice(0, 10)}</td>
              <td>
                ${order?.total_price} ({order?.products?.length} Products)
              </td>
              <td className="capitalize">{order?.status}</td>
              <td className="text-green-500 font-semibold">
                <Link
                  to={`/userdashboard/orderhistory/orderdetails/${order?._id}`}
                >
                  View Details
                </Link>
              </td>
            </tr>
          )) : <tr><td className="py-10" colSpan={5}>
          <h3 className="text-center font-semibold text-3xl">No Order's to show</h3></td></tr>}
        </table>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default OrderHistory;
