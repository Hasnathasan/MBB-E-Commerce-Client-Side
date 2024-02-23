import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User,
    useDisclosure,
  } from "@nextui-org/react";
import { FaArrowDown, FaPlus, FaSearch } from "react-icons/fa";
import useUsers from "../../../Hooks/useUsers";
import useUser from "../../../Hooks/useUser";

const ManagePrison = () => {
    const [usersData] = useUsers();
    const [userData] = useUser();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
            <Button  onPress={onOpen} color="primary" endContent={<FaPlus></FaPlus>}>
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
            <h5 className="text-center">Change User Role</h5>
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
                  color={user.userRole == "admin" ? "danger" : "primary"}
                  size="sm"
                  variant="flat"
                >
                  {user.userRole}
                </Chip>
              </TableCell>
              <TableCell>
                hi
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal size="2xl" className="!z-50" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <form className="p-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="Name"
                defaultValue={userData?.userName}
                required
              />
            </div>
            <div>
              <label htmlFor="companyName">Prison Name</label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="companyName"
                defaultValue={userData?.billingInfo?.country}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              name="address"
              id="address"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
              placeholder="Street Address"
              defaultValue={userData?.billingInfo?.address}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="country">Country / Region</label>
              <input
                type="text"
                name="country"
                id="country"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="Country"
                defaultValue={userData?.billingInfo?.country}
                required
              />
            </div>
            <div>
              <label htmlFor="states">States</label>
              <input
                type="text"
                name="states"
                id="states"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="States Name"
                defaultValue={userData?.billingInfo?.states}
                required
              />
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="number"
                name="zipCode"
                id="zipCode"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="Zip Code"
                defaultValue={userData?.billingInfo?.zipCode}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="Email Address"
                defaultValue={userData?.email}
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="Phone Number"
                defaultValue={userData?.userPhoneNumber}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className=" text-white bg-[#00B207] hover:bg-[#00b206f6] focus:outline-none font-medium rounded-3xl text-sm px-7 py-2.5 text-center "
          >
            Save Changes
          </button>
        </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
    );
};

export default ManagePrison;