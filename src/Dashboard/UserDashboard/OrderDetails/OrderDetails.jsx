import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import "./OrderDetails.css";
import product1 from "../../../assets/products1.png";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const {id} = useParams();
  console.log(id);
  const { user } = useContext(AuthContext);
  return (
    <div className="border border-gray-300 rounded-lg">
      <div className="flex border-b border-gray-300 p-5 justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-xl font-semibold">Order Details</h1>
          <h4 className="text-sm text-gray-800">April 24, 2021</h4>
          <h4 className="text-sm text-gray-800">3 Products</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-6 gap-7">
          <div className="col-span-4 h-[300px] grid grid-cols-2 border border-gray-300 rounded-lg">
            {/* 1st column */}
            <div className="border-r border-gray-300">
              <h2 className=" text-gray-500 border-b border-gray-300 px-4 py-3 font-medium">
                Billing Address
              </h2>
              <div className="p-4">
                <div className="mb-4">
                  <h2 className="text-xl font-medium">
                    {user?.displayName || "Unknown"}
                  </h2>
                  <h3 className="text-gray-600 text-sm">
                    4140 Parker Rd. Allentown, New Mexico 31134
                  </h3>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Email</h3>
                  <h3 className="text-gray-900 mb-2 font-medium">
                    {user?.email}
                  </h3>
                  <h3 className="text-gray-600 text-sm">Phone</h3>
                  <h3 className="text-gray-900 font-medium">(671) 555-0110</h3>
                </div>
              </div>
            </div>

            {/* 2nd column */}
            <div className="">
              <h2 className=" text-gray-500 border-b border-gray-300 px-4 py-3 font-medium">
                Shipping Address
              </h2>
              <div className="p-4">
                <div className="mb-4">
                  <h2 className="text-xl font-medium">
                    {user?.displayName || "Unknown"}
                  </h2>
                  <h3 className="text-gray-600 text-sm">
                    4140 Parker Rd. Allentown, New Mexico 31134
                  </h3>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Email</h3>
                  <h3 className="text-gray-900 mb-2 font-medium">
                    {user?.email}
                  </h3>
                  <h3 className="text-gray-600 text-sm">Phone</h3>
                  <h3 className="text-gray-900 font-medium">(671) 555-0110</h3>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd column */}
          <div className="col-span-2 border border-gray-300 rounded-lg">
            <div className="flex justify-between border-b border-gray-300 items-center gap-7 p-5">
              <div>
                <h3 className=" text-gray-500 text-sm font-medium">
                  Order ID:
                </h3>
                <h5 className="text-sm font-medium">#4152</h5>
              </div>
              <span>|</span>
              <div>
                <h3 className=" text-gray-500 text-sm font-medium">
                  Payment Method:
                </h3>
                <h5 className="text-sm font-medium">STRIPE</h5>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-500 text-sm font-medium">
                  Subtotal:
                </h3>
                <h5 className="text-sm font-medium">$5782</h5>
              </div>
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-500 text-sm font-medium">
                  Discount:
                </h3>
                <h5 className="text-sm font-medium">$57</h5>
              </div>
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-500 text-sm font-medium">
                  Shipping:
                </h3>
                <h5 className="text-sm font-medium">Free</h5>
              </div>
              <div className="flex justify-between pt-2 pb-3 items-center">
                <h3 className=" font-medium">Total</h3>
                <h5 className="text-green-800 font-bold">$5839</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="overflow-auto w-full">
        <tr>
          <th>PRODUCT</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
          <th>SUBTOTAL</th>
        </tr>
        <tr>
          <td className="flex items-center gap-2">
            <img className="w-16" src={product1} alt="" />
            <h3 className="font-semibold">The Starry Night</h3>
          </td>
          <td>$549</td>
          <td>x5</td>
          <td>$2638</td>
        </tr>
        <tr>
          <td className="flex items-center gap-2">
            <img className="w-16" src={product1} alt="" />
            <h3 className="font-semibold">The Starry Night</h3>
          </td>
          <td>$549</td>
          <td>x5</td>
          <td>$2638</td>
        </tr>
        <tr>
          <td className="flex items-center gap-2">
            <img className="w-16" src={product1} alt="" />
            <h3 className="font-semibold">The Starry Night</h3>
          </td>
          <td>$549</td>
          <td>x5</td>
          <td>$2638</td>
        </tr>
      </table>
    </div>
  );
};

export default OrderDetails;
