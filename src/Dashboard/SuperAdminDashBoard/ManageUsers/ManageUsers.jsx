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
    User,
  } from "@nextui-org/react";
import { FaArrowDown, FaPlus, FaSearch } from "react-icons/fa";
import useUsers from "../../../Hooks/useUsers";

const ManageUsers = () => {
    const [usersData] = useUsers();
    return (
        <div className="overflow-x-auto w-full md:w-[80%]">
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
                <Button endContent={<FaArrowDown></FaArrowDown>} variant="flat">
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
                <Button endContent={<FaArrowDown></FaArrowDown>} variant="flat">
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
          Total {usersData?.length} users
        </span>
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email / Number</TableColumn>
          <TableColumn>User Role</TableColumn>
          <TableColumn>
            <h5 className="text-center">Details</h5>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {usersData?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <User
                  avatarProps={{ radius: "md", src: user.photoUrl }}
                  description={user.email || user.phoneNumber}
                  name={user.name || "Unknown"}
                ></User>
              </TableCell>
              <TableCell>{user.email || user.phoneNumber}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={user.userRole == "mbbAdmin" ? "danger" : "success"}
                  size="sm"
                  variant="flat"
                >
                  {user.userRole}
                </Chip>
              </TableCell>
              <TableCell>
                <Button color="success" radius="lg" className="text-white">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    );
};

export default ManageUsers;