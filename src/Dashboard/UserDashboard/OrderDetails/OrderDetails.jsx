import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import "./OrderDetails.css";
import { useParams } from "react-router-dom";
import useSingleOrderById from "../../../Hooks/useSingleOrderById";
import Loader from "../../../Components/Loader/Loader";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import AddNewProductForAdmin from "../../SuperAdminDashBoard/AddNewProductForAdmin/AddNewProductForAdmin";
import OrderDetailsPdf from "./OrderDetailsPdf/OrderDetailsPdf";

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [order, isOrderLoading, refetch] = useSingleOrderById({ id });
  if (isOrderLoading) {
    return <Loader></Loader>;
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
      <div className="flex border-b border-gray-300 p-3 lg:p-5 justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <h1 className="lg:text-xl font-semibold">Order Details</h1>
          <h4 className="text-sm text-gray-800">
            {order?.createdAt.slice(0, 10)}
          </h4>
          <h4 className="text-sm text-gray-800">
            {order?.products?.length} Products
          </h4>
        </div>
        <Button
          color="success"
          onPress={onOpen}
          size="sm"
          className="bg-green-500 text-white"
        >
          Download Invoice
        </Button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-6 gap-7">
          <div className="lg:col-span-4 col-span-6 lg:h-[300px] grid grid-cols-1 lg:grid-cols-2 border gap-5 lg:gap-0 border-gray-300 rounded-lg">
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
                  <h3 className="text-gray-600 text-sm">
                    {address || "Unknown"}, {states}, {zipCode}
                  </h3>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Email</h3>
                  <h3 className="text-gray-900 mb-2 font-medium">
                    {email || "Unknown"}
                  </h3>
                  <h3 className="text-gray-600 text-sm">Phone</h3>
                  <h3 className="text-gray-900 font-medium">
                    {userPhoneNumber || "Unknown"}
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
                    {order?.shipping_address?.userName || userName || "Unknown"}
                  </h2>
                  <h3 className="text-gray-600 text-sm">
                    {order?.shipping_address?.address || address || "Unknown"}, {order?.shipping_address?.states || states}, {order?.shipping_address?.zipCode || zipCode}
                  </h3>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Email</h3>
                  <h3 className="text-gray-900 mb-2 font-medium">
                    {order?.shipping_address?.email || email || "Unknown"}
                  </h3>
                  <h3 className="text-gray-600 text-sm">Phone</h3>
                  <h3 className="text-gray-900 font-medium">
                    {order?.shipping_address?.userPhoneNumber ||
                      userPhoneNumber ||
                      "Unknown"}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd column */}
          <div className="lg:col-span-2 col-span-6 border border-gray-300 rounded-lg">
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
                <h5 className="text-sm font-medium">${order?.subTotal}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-500 text-sm font-medium">
                  Tax:
                </h3>
                <h5 className="text-sm font-medium">${order?.tax}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-500 text-sm font-medium">
                  Shipping Method:
                </h3>
                {order?.shippingMethod?.standard_shipping ? <h5  className="text-sm font-medium">Standard Shipping: ${order?.shippingMethod?.standard_shipping}</h5> : ""}
                {order?.shippingMethod?.express_shipping ? <h5  className="text-sm font-medium">Express Shipping: ${order?.shippingMethod?.express_shipping}</h5> : ""}
                {order?.shippingMethod?.free_shipping ? <h5  className="text-sm font-medium">Free Shipping</h5> : ""}
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

      <div className="overflow-x-auto">
        <table className=" w-full">
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
      <Modal
        scrollBehavior="outside"
        size="5xl"
        backdrop="opaque"
        className="!z-50"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a New Product
              </ModalHeader>
              <ModalBody>
                <div className="h-screen">
                  <OrderDetailsPdf order={order}></OrderDetailsPdf>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OrderDetails;
