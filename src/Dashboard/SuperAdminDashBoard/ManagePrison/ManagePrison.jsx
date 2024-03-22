import {
  Button,
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
import axios from "axios";
import usePrisons from "../../../Hooks/usePrisons";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import PrisonUpdateModal from "./PrisonUpdateModal/PrisonUpdateModal";

const ManagePrison = () => {
  const [prisons, , refetch] = usePrisons();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isPrisonUpdateOpen, onOpen: onPriosonUpdateOpen, onOpenChange: onPrisonUpdateChange } = useDisclosure();
  const [prisonToShow, setPrisonToShow] = useState();
  const handlePrisonUpdate = (prison) => {
    setPrisonToShow(prison);
    onPriosonUpdateOpen()
  }
  const handlePrisonAdding = (e) => {
    e.preventDefault();
    const form = e.target;
    const prison_name = form.prison_name.value;
    const country = form.country.value;
    const states = form.states.value;
    const address = form.address.value;
    const zipCode = form.zipCode.value;
    const email = form.email.value;
    const number = form.phoneNumber.value;
    const prison = {
      prison_name,
      country,
      states,
      address,
      zipCode,
      email,
      number,
    };
    console.log(prison);
    axios
      .post(`https://mbb-e-commerce-server.vercel.app/prisons`, prison)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          return toast.success("Successfully added Prison");
        }
      })
      .catch((error) => {
        return toast.error(
          error?.response?.data?.message || "An Unknown Error Occurred"
        );
      });
  };
  return (
    <div className="overflow-x-auto w-full md:w-[95%]">
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
            <Button
              onPress={onOpen}
              color="primary"
              endContent={<FaPlus></FaPlus>}
            >
              Add New
            </Button>
          </div>
        </div>
        <span className="text-gray-600 mb-2">
          Total {prisons?.length} users
        </span>
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          <TableColumn>Prison Name</TableColumn>
          <TableColumn>Number</TableColumn>
          <TableColumn>Country</TableColumn>
          <TableColumn>State</TableColumn>
          <TableColumn>Zip code</TableColumn>
          <TableColumn>Details</TableColumn>
        </TableHeader>
        <TableBody>
          {prisons?.map((prison) => (
            <TableRow key={prison?._id}>
              <TableCell>
                <User
                  avatarProps={{ radius: "md", src: prison?.photoUrl }}
                  description={prison?.email}
                  name={prison?.prison_name || "Unknown"}
                ></User>
              </TableCell>
              <TableCell>{prison?.number}</TableCell>
              <TableCell>{prison?.country}</TableCell>
              <TableCell>{prison?.states}</TableCell>
              <TableCell>{prison?.zipCode}</TableCell>
              <TableCell><Button
                        onClick={() => handlePrisonUpdate(prison)}
                        color="success"
                        className="text-white"
                      >
                        Details
                      </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        size="2xl"
        backdrop="opaque"
        className="!z-50"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Prison
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handlePrisonAdding} className="p-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="prison_name">Prison Name</label>
                      <input
                        type="text"
                        name="prison_name"
                        id="prison_name"
                        className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                        placeholder="Prison Name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="address">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                        placeholder="Street Address"
                        required
                      />
                    </div>
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
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    color="success"
                    radius="full"
                    className="text-white mb-2 px-12 bg-green-500"
                  >
                    Add Prison
                  </Button>
                </form>
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
      <Modal
        size="2xl"
        backdrop="opaque"
        className="!z-50"
        isOpen={isPrisonUpdateOpen}
        onOpenChange={onPrisonUpdateChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Prison
              </ModalHeader>
              <ModalBody>
                <PrisonUpdateModal prison={prisonToShow} refetch={refetch}></PrisonUpdateModal>
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
      <Toaster></Toaster>
    </div>
  );
};

export default ManagePrison;
