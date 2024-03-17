import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FaArrowDown, FaPlus } from "react-icons/fa";
import useAllOrders from "../../../Hooks/useAllOrders";
import { Link, Outlet, useLocation } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { useState } from "react";

const ManageOrders = () => {
  const [value, setValue] = useState();
  const [orders, isOrdersLoading] = useAllOrders({status: value});
  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };

  const location = useLocation();
  // if (isOrdersLoading) {
  //   return <Loader></Loader>;
  // }
  console.log(orders);
  return (
    <>
      <div
        className={`overflow-x-auto w-full md:w-[95%] ${
          location?.pathname.includes("/adminDashboard/orders/orderDetails/")
            ? "hidden"
            : ""
        }`}
      >
        <div className="flex flex-col  gap-4">
          <div className="flex justify-end p-5 bg-white rounded-xl gap-3 items-end">
            
            <div className="flex gap-3">
                <Select
      placeholder="Change Status"
      label={"Status"}
      className="w-40 text-nowrap"
      disableSelectorIconRotation
      onChange={handleSelectionChange}
    >
        <SelectItem key={"pending"} value={"pending"}>
          Pending
        </SelectItem>
        <SelectItem key={"processing"} value={"processing"}>
          Processing
        </SelectItem>
        <SelectItem key={"delevered"} value={"delevered"}>
          Delevered
        </SelectItem>
    </Select>
    
            </div>
          </div>
          <span className="text-gray-600 mb-2">
            Total {orders?.length} Orders
          </span>
        </div>
        <Table aria-label="Example table with custom cells">
          <TableHeader>
            <TableColumn>Transaction Id</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>
              <h5 className="text-center">Details</h5>
            </TableColumn>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order?.transactionId}</TableCell>
                <TableCell>{order?.createdAt.slice(0, 10)}</TableCell>
                <TableCell>
                  {order?.total_price} ({order?.products.length} products)
                </TableCell>
                <TableCell>
                  <Chip
                    className="capitalize"
                    color={order?.status == "completed" ? "success" : "danger"}
                    size="sm"
                    variant="flat"
                  >
                    {order?.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/adminDashboard/orders/orderDetails/${order?._id}`}
                  >
                    <Button color="success" radius="lg" className="text-white">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-[95%] mx-auto">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default ManageOrders;
