import {
  Button,
  ButtonGroup,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import useAllOrders from "../../../Hooks/useAllOrders";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../../Components/Loader/Loader";

const ManageOrders = () => {
  const [value, setValue] = useState();
  const [ordersData, isOrdersLoading, refetch] = useAllOrders({
    status: value,
  });
  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const pages = Math.ceil(ordersData?.length / rowsPerPage);
  const orders = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return ordersData?.slice(start, end);
  }, [page, ordersData]);

  const location = useLocation();
  if (isOrdersLoading) {
    return <Loader></Loader>;
  }
  console.log(orders);
  const deleteFunc = (id) => {
    axios
      .delete(`https://mbb-e-commerce-server.vercel.app/orderDelete/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("Order Deleted");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleOrderDelete = (id) => {
    toast((t) => (
      <span>
        Do You Want To Delete This Order?
        <ButtonGroup variant="solid" radius="none" size="sm">
          <Button
            className="px-9 mt-3 float-right  text-white"
            color="danger"
            onClick={() => {
              deleteFunc(id);
              toast.dismiss(t.id);
            }}
          >
            Yes
          </Button>
          <Button
            className="px-9 mt-3 float-right  text-white"
            color="success"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </Button>
        </ButtonGroup>
      </span>
    ));
  };
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
                placeholder="Filter By Status"
                className="w-40 text-nowrap"
                disableSelectorIconRotation
                onChange={handleSelectionChange}
              >
                <SelectItem key={"all"} value={"all"}>
                  Filter By Status
                </SelectItem>
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
            </div>
          </div>
          <span className="text-gray-600 mb-2">
            Total {orders?.length} Orders
          </span>
        </div>
        <Table
          aria-label="Example table with custom cells"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>Customer</TableColumn>
            <TableColumn>Order Id</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>
              <h5 className="text-center">Details</h5>
            </TableColumn>
          </TableHeader>
          <TableBody items={orders} emptyContent={"No Order Available"}>
            {(order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      <User
                        avatarProps={{
                          radius: "md",
                          src: order?.userDetails?.userPhoto,
                        }}
                        description={
                          order?.userDetails?.email ||
                          order?.userDetails?.phoneNumber
                        }
                        name={order?.userDetails?.userName || "Unknown"}
                      ></User>
                    </TableCell>
                    <TableCell>#{order?._id?.slice(-4)}</TableCell>
                    <TableCell>{order?.createdAt.slice(0, 10)}</TableCell>
                    <TableCell>
                      {order?.total_price} ({order?.products.length} products)
                    </TableCell>
                    <TableCell>
                      <Chip
                        className="capitalize"
                        color={
                          order?.status == "completed" ? "success" : "danger"
                        }
                        size="sm"
                        variant="flat"
                      >
                        {order?.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup size="sm" radius="sm">
                        <Button color="success" className="text-white">
                          <Link
                            className="w-full h-full flex justify-center items-center"
                            to={`/adminDashboard/orders/orderDetails/${order?._id}`}
                          >
                            View Details
                          </Link>
                        </Button>

                        <Button
                          onClick={() => handleOrderDelete(order?._id)}
                          color="danger"
                          className="text-white"
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                )}
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
