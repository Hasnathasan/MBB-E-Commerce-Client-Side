import { Link, Outlet, useLocation } from "react-router-dom";
import "./OrderHistory.css";

const OrderHistory = () => {
  const location = useLocation();
  console.log(location);
  const orders = [{
    orderedBy: "artist@gmail.com",
    transaction_id: "#2cd34v2345234qfvqw",
    ordered_products: [
      {
        quantity: 1,
        product_id: "65e5f6784f5e29197010d3f0",
        product_name: "Whistler's Mother",
        price: {
          regular_price: 123,
          sale_price: 123,
          cost_price: 12,
        },
        featured_photo: "https://res.cloudinary.com/dyewzhari/image/upload/v1709569651/wqyldvfaucawdiz9uox5.jpg",
        product_available_quantity: 23,
      },
      {
        quantity: 20,
        product_id: "65e43ea98f369c4198bc0493",
        product_name: "Water lilies",
        price: {
          regular_price: 25,
          sale_price: 28,
          cost_price: 5,
        },
        featured_photo: "https://res.cloudinary.com/dyewzhari/image/upload/v1709457061/r1xtpssbea5i3txfpmz9.jpg",
        product_available_quantity: 20,
      }
    ]
  },{
    orderedBy: "artist@gmail.com",
    transaction_id: "#2cd34v2345234qfvqw",
    ordered_products: [
      {
        quantity: 1,
        product_id: "65e5f6784f5e29197010d3f0",
        product_name: "Whistler's Mother",
        price: {
          regular_price: 123,
          sale_price: 123,
          cost_price: 12,
        },
        featured_photo: "https://res.cloudinary.com/dyewzhari/image/upload/v1709569651/wqyldvfaucawdiz9uox5.jpg",
        product_available_quantity: 23,
      },
      {
        quantity: 20,
        product_id: "65e43ea98f369c4198bc0493",
        product_name: "Water lilies",
        price: {
          regular_price: 25,
          sale_price: 28,
          cost_price: 5,
        },
        featured_photo: "https://res.cloudinary.com/dyewzhari/image/upload/v1709457061/r1xtpssbea5i3txfpmz9.jpg",
        product_available_quantity: 20,
      }
    ]
  },{
    orderedBy: "artist@gmail.com",
    transaction_id: "#2cd34v2345234qfvqw",
    ordered_products: [
      {
        quantity: 1,
        product_id: "65e5f6784f5e29197010d3f0",
        product_name: "Whistler's Mother",
        price: {
          regular_price: 123,
          sale_price: 123,
          cost_price: 12,
        },
        featured_photo: "https://res.cloudinary.com/dyewzhari/image/upload/v1709569651/wqyldvfaucawdiz9uox5.jpg",
        product_available_quantity: 23,
      },
      {
        quantity: 20,
        product_id: "65e43ea98f369c4198bc0493",
        product_name: "Water lilies",
        price: {
          regular_price: 25,
          sale_price: 28,
          cost_price: 5,
        },
        featured_photo: "https://res.cloudinary.com/dyewzhari/image/upload/v1709457061/r1xtpssbea5i3txfpmz9.jpg",
        product_available_quantity: 20,
      }
    ]
  }]
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
