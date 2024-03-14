import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FaArrowDown, FaPlus, FaSearch } from "react-icons/fa";
import useAllOrders from "../../../Hooks/useAllOrders";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const ManageOrders = () => {
  const [orders, isOrdersLoading] = useAllOrders();
  const location = useLocation();
  if (isOrdersLoading) {
    return <Loader></Loader>;
  }
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
          <div className="flex justify-between p-5 bg-white rounded-xl gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<FaSearch></FaSearch>}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<FaArrowDown></FaArrowDown>}
                    variant="flat"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={["data"]}
                  selectionMode="multiple"
                >
                  <DropdownItem key={"data"} className="capitalize">
                    Data
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<FaArrowDown></FaArrowDown>}
                    variant="flat"
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={["hi"]}
                  selectionMode="multiple"
                >
                  <DropdownItem key={"hi"} className="capitalize">
                    Hi
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button color="primary" endContent={<FaPlus></FaPlus>}>
                Add New
              </Button>
            </div>
          </div>
          <span className="text-gray-600 mb-2">
            Total {orders?.length} users
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
