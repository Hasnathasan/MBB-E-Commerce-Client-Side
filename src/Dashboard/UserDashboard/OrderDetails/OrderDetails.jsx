import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import "./OrderDetails.css";
import product1 from "../../../assets/products1.png";
import { useParams } from "react-router-dom";
import useSingleOrderById from "../../../Hooks/useSingleOrderById";

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [order, isOrderLoading, refetch] = useSingleOrderById({ id });
  if (isOrderLoading) {
    return <h1>Loading</h1>;
  }
  const {
    email,
    additional_info,
    userName,
    companyName,
    country,
    address,
    states,
    zipCode,
    userPhoneNumber,
  } = order.userDetails;
  console.log(id, order, email);
  return (
    <div className="border border-gray-300 rounded-lg">
      <div className="flex border-b border-gray-300 p-5 justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-xl font-semibold">Order Details</h1>
          <h4 className="text-sm text-gray-800">
            {order?.createdAt.slice(0, 10)}
          </h4>
          <h4 className="text-sm text-gray-800">
            {order?.products?.length} Products
          </h4>
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
                    {userName || "Unknown"}
                  </h2>
                  <h3 className="text-gray-600 text-sm">{address}</h3>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Email</h3>
                  <h3 className="text-gray-900 mb-2 font-medium">{email}</h3>
                  <h3 className="text-gray-600 text-sm">Phone</h3>
                  <h3 className="text-gray-900 font-medium">
                    {userPhoneNumber}
                  </h3>
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
                    {userName || "Unknown"}
                  </h2>
                  <h3 className="text-gray-600 text-sm">{address}</h3>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Email</h3>
                  <h3 className="text-gray-900 mb-2 font-medium">{email}</h3>
                  <h3 className="text-gray-600 text-sm">Phone</h3>
                  <h3 className="text-gray-900 font-medium">
                    {userPhoneNumber}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd column */}
          <div className="col-span-2 border border-gray-300 rounded-lg">
            <div className=" border-b border-gray-300 items-center gap-7 p-4">
              <h3 className=" text-gray-500 mb-3 text-sm font-medium">
                Transaction ID:{" "}
                <span className="text-green-600">{order?.transactionId}</span>
              </h3>
              <h3 className=" text-gray-500 text-sm font-medium">
                Payment Method: <span className="text-gray-800">STRIPE</span>
              </h3>
            </div>

            <div className="p-5">
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-500 text-sm font-medium">
                  Subtotal:
                </h3>
                <h5 className="text-sm font-medium">${order?.total_price}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-500 text-sm font-medium">
                  Shipping:
                </h3>
                <h5 className="text-sm font-medium">Free</h5>
              </div>
              <div className="flex justify-between pt-2 pb-3 items-center">
                <h3 className=" font-medium">Total</h3>
                <h5 className="text-green-800 font-bold">
                  ${order?.total_price}
                </h5>
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
        {order?.products?.map((product) => (
          <tr key={product?.product_id}>
            <td className="flex items-center gap-2">
              <img className="w-16" src={product?.featured_photo} alt="" />
              <h3 className="font-semibold">{product?.product_name}</h3>
            </td>
            <td>
              ${product?.price?.sale_price || product?.price?.regular_price}
            </td>
            <td>x{product?.quantity}</td>
            <td>
              $
              {product?.price?.sale_price * product?.quantity ||
                product?.price?.regular_price * product?.quantity}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default OrderDetails;
