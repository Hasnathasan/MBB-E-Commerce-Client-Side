import "./OrderDetailsForAdmin.css";
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
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import OrderDetailsPdf from "../../UserDashboard/OrderDetails/OrderDetailsPdf/OrderDetailsPdf";

const OrderDetailsForAdmin = () => {
  const { id } = useParams();
  const [order, isOrderLoading] = useSingleOrderById({ id });
  const [value, setValue] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    setValue(order?.status);
  }, [order?.status]);
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
  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };
  const handleStatusUpdate = () => {
    console.log(value);
    const promise = axios
      .patch(
        `http://localhost:8000/orderStatusUpdate/${
          order?._id
        }?status=${value.toLowerCase()}`
      )
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Updating order status...",
      success: "Order Status Updated",
      error: "An unknown error occurred while updating order status",
    });
  };
  return (
    <div className="border border-gray-300 rounded-lg">
      <div className="flex justify-between flex-col md:flex-row items-center border-b border-gray-300 p-2 gap-4 md:p-5">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-4">
            <h1 className="text-xl font-semibold text-nowrap">Order Details</h1>
            <h4 className="text-sm text-gray-800">
              {order?.createdAt.slice(0, 10)}
            </h4>
            <h4 className="text-sm text-gray-800">
              {order?.products?.length} Products
            </h4>
          </div>
        </div>

        <div className="min-w-[500px] flex flex-col md:flex-row justify-end items-center gap-5 md:gap-3">
          <Button
            color="success"
            size="sm"
            onPress={onOpen}
            className="bg-green-500 text-white"
          >
            Download Invoice
          </Button>
          <div className="flex justify-between items-center gap-3">
            <Select
              placeholder="Change Status"
              labelPlacement="outside-left"
              className="min-w-[200px] text-nowrap"
              disableSelectorIconRotation
              size="sm"
              selectedKeys={[value]}
              onChange={handleSelectionChange}
            >
              <SelectItem key={"pending"} value={"pending"}>
                Pending
              </SelectItem>
              <SelectItem key={"processing"} value={"processing"}>
                Processing
              </SelectItem>
              <SelectItem key={"shipped"} value={"shipped"}>
                Shipped
              </SelectItem>
              <SelectItem key={"delivered"} value={"delivered"}>
                Delivered
              </SelectItem>
              <SelectItem key={"canceled"} value={"canceled"}>
                Canceled
              </SelectItem>
            </Select>
            <Button
              onClick={handleStatusUpdate}
              color="success"
              size="sm"
              className="text-white"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
      <div className="md:p-6 p-3">
        <div className="grid grid-cols-6 gap-7">
          <div className="md:col-span-4 col-span-6 md:h-[300px] grid md:grid-cols-2 grid-cols-1 border border-gray-300 rounded-lg">
            {/* 1st column */}
            <div className="border-r border-gray-300">
              <h2 className=" text-gray-500 border-b border-gray-300 px-4 py-3 font-medium">
                Billing Address
              </h2>
              <div className="md:p-4 p-3">
                <div className="mb-4">
                  <h2 className="text-xl font-medium">
                    {userName || "Unknown"}
                  </h2>
                  <h3 className="text-gray-600 text-sm">
                    {address || "Unknown"}, {country}, {states}-{zipCode}
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
                    {order?.shipping_address?.address || address || "Unknown"},{" "}
                    {order?.shipping_address?.country || country},{" "}
                    {order?.shipping_address?.states || states}-{order?.shipping_address?.zipCode || zipCode}
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
          <div className="md:col-span-2 col-span-6 border border-gray-300 rounded-lg">
            <div className=" border-b border-gray-300 items-center gap-7 p-4">
              <h3 className=" text-gray-500 mb-3 text-sm font-medium">
                Order ID:{" "}
                <span className="text-green-600">#{order?._id?.slice(-4)}</span>
              </h3>
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
                <h3 className=" text-gray-500 text-sm font-medium">Tax:</h3>
                <h5 className="text-sm font-medium">${order?.tax}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-500 text-sm font-medium">
                  {order?.shippingMethod?.standard_shipping ? (
                    <h5 className="text-sm font-medium">Standard Shipping:</h5>
                  ) : (
                    ""
                  )}
                  {order?.shippingMethod?.express_shipping ? (
                    <h5 className="text-sm font-medium">Express Shipping:</h5>
                  ) : (
                    ""
                  )}
                  {order?.shippingMethod?.free_shipping == 0 ? (
                    <h5 className="text-sm font-medium">Free Shipping:</h5>
                  ) : (
                    ""
                  )}
                </h3>
                {order?.shippingMethod?.standard_shipping ? (
                  <h5 className="text-sm font-medium">
                    ${order?.shippingMethod?.standard_shipping}
                  </h5>
                ) : (
                  ""
                )}
                {order?.shippingMethod?.express_shipping ? (
                  <h5 className="text-sm font-medium">
                    ${order?.shippingMethod?.express_shipping}
                  </h5>
                ) : (
                  ""
                )}
                {order?.shippingMethod?.free_shipping == 0 ? (
                  <h5 className="text-sm font-medium">
                    ${order?.shippingMethod?.free_shipping}
                  </h5>
                ) : (
                  ""
                )}
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

      <div className="overflow-x-auto mt-5 md:mt-1">
        <table className=" w-full">
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
          </tr>
          {order?.products?.map((product) => (
            <tr key={product?.product_id}>
              <td className="flex items-center gap-2 w-56">
                <img className="w-16" src={product?.featured_photo} alt="" />
                <h3 className="font-semibold text-nowrap">
                  {product?.product_name}
                </h3>
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

export default OrderDetailsForAdmin;
