import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const OrderDetails = () => {
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
          <div className="col-span-2 border border-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
