import { Link, Outlet, useLocation } from "react-router-dom";
import "./OrderHistory.css";
import useUserOrders from "../../../Hooks/useUserOrders";

const OrderHistory = () => {
  const location = useLocation();
  console.log(location);
  const [orders, isOrdersLoading, refetch] = useUserOrders();
  if(isOrdersLoading){
    return <h1>Loading</h1>
  }
  console.log(orders);
  return (
    <>
      <div
        className={`border rounded-lg overflow-auto ${
          location?.pathname.includes("/userdashboard/orderhistory/orderdetails") 
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
          {
            orders?.map(order => <tr key={order?._id}>
            <td>{order?.transactionId}</td>
            <td>{order?.createdAt}</td>
            <td>${order?.total_price} ({order?.products?.length} Products)</td>
            <td className="capitalize">{order?.status}</td>
            <td className="text-green-500 font-semibold">
              <Link to={`/userdashboard/orderhistory/orderdetails/${order?._id}`}>
                View Details
              </Link>
            </td>
          </tr>)
          }
          
          
        </table>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default OrderHistory;
