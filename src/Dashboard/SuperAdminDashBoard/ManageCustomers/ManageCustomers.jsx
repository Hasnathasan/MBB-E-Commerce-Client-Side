import {
  Avatar,
  Button,
  ButtonGroup,
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
import { useState } from "react";
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
  const deleteFunc = email => {
    axios.delete(`https://mbb-e-commerce-server.vercel.app/customerDelete/${email}`)
    .then(res => {
      console.log(res.data);
      if(res.data.deletedCount > 0){
        refetch();
        toast.success("User Deleted")
      }
    })
    .catch(err => {
      toast.error(err.message)
    })
  }
  const handleCustomerDelete = email => {
    toast((t) => (
      <span>
        Do You Want To Delete This Customer?
        <ButtonGroup variant="solid" radius="none" size="sm">
        <Button  className="px-9 mt-3 float-right  text-white" color="danger" onClick={() => deleteFunc(email)}>
          Yes
        </Button>
        <Button  className="px-9 mt-3 float-right  text-white" color="success" onClick={() => toast.dismiss(t.id)}>
          No
        </Button>
        </ButtonGroup>
      </span>
    ));

  }
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
        <TableBody emptyContent={"No Customer Available"}>
          {customersData?.length > 0 ? customersData?.map((user) => (
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
                <ButtonGroup size="sm">
                <Button
                  onClick={() => handleCustomerDetailsModal(user)}
                  color="success"
                  className="text-white"
                >
                  View Details
                </Button>
                <Button onClick={() => handleCustomerDelete(user?.email)} color="danger" className="text-white">
                Delete
              </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          )) : []}
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
                <CustomerUpdateModal
                  userData={userData}
                  refetch={refetch}
                ></CustomerUpdateModal>
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

export default ManageCustomers;
