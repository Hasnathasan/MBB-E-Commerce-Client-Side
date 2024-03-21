import {
  Avatar,
  Button,
  Chip,
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
import useCustomers from "../../../Hooks/useCustomers";
import { useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CustomerUpdateModal from "./CustomerUpdateModal/CustomerUpdateModal";

const ManageCustomers = () => {
  const [customersData, isCustomerDataLoading, refetch] = useCustomers();
  const [userData, setUserData] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleCustomerDetailsModal = (user) => {
    setUserData(user);
    onOpen();
  };
  return (
    <div className="overflow-x-auto w-[95%] mx-auto">
      <div className="flex flex-col  gap-4">
        <span className="text-gray-600 mb-2">
          Total {customersData?.length} users
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
          {customersData?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <User
                  avatarProps={{ radius: "md", src: user.userPhoto }}
                  description={user.email || user.phoneNumber}
                  name={user.userName || "Unknown"}
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
                <Button
                  onClick={() => handleCustomerDetailsModal(user)}
                  color="success"
                  radius="lg"
                  className="text-white"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
                Customer Details
              </ModalHeader>
              <ModalBody>
              <CustomerUpdateModal userData={userData} refetch={refetch}></CustomerUpdateModal>
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
      <Toaster />
    </div>
  );
};

export default ManageCustomers;
