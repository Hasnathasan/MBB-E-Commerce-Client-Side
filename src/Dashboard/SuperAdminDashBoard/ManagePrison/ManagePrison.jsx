import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
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
import { useMemo, useState } from "react";
import PrisonUpdateModal from "./PrisonUpdateModal/PrisonUpdateModal";
import Loader from "../../../Components/Loader/Loader";

const ManagePrison = () => {
  const [prisonsData, isPrisonsDataLoading, refetch] = usePrisons();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isPrisonUpdateOpen,
    onOpen: onPriosonUpdateOpen,
    onOpenChange: onPrisonUpdateChange,
  } = useDisclosure();
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const pages = Math.ceil(prisonsData?.length / rowsPerPage);

  const prisons = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return prisonsData?.slice(start, end);
  }, [page, prisonsData]);
  const [prisonToShow, setPrisonToShow] = useState();
  const handlePrisonUpdate = (prison) => {
    setPrisonToShow(prison);
    onPriosonUpdateOpen();
  };
  const handlePrisonAdding = (e, onClose) => {
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

    const promise = axios
      .post(`https://mbb-e-commerce-server.vercel.app/prisons`, prison)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          refetch();
          onClose();
          return res.data;
        } else {
          throw new Error("Failed to add Prison");
        }
      })
      .catch((error) => {
        throw error;
      });

    toast.promise(promise, {
      loading: "Adding prison...",
      success: "Successfully added Prison",
      error: "An Unknown Error Occurred",
    });
  };
  const deleteFunc = (id) => {
    axios
      .delete(`https://mbb-e-commerce-server.vercel.app/prisonDelete/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("Prison Deleted");
        }
      })
      .catch((err) => console.log(err));
  };

  if(isPrisonsDataLoading){
    return <Loader></Loader>
  }
  const handlePrisonDelete = (id) => {
    toast((t) => (
      <span>
        Do You Want To Delete This Prison?
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
    <div className="overflow-x-auto w-full md:w-[95%]">
      <div className="flex flex-col  gap-4">
        <div className="flex w-full justify-end p-5 bg-white rounded-xl gap-3 items-end">
          <Button
            onPress={onOpen}
            color="primary"
            endContent={<FaPlus></FaPlus>}
          >
            Add New
          </Button>
        </div>
        <span className="text-gray-600 mb-2">
          Total {prisons?.length} users
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
          <TableColumn>Prison Name</TableColumn>
          <TableColumn>Number</TableColumn>
          <TableColumn>Country</TableColumn>
          <TableColumn>State</TableColumn>
          <TableColumn>Zip code</TableColumn>
          <TableColumn>Details</TableColumn>
        </TableHeader>
        <TableBody items={prisons} emptyContent={"No Prison Available"}>
          {(prison) => (
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
                  <TableCell>
                    <ButtonGroup size="sm">
                      <Button
                        onClick={() => handlePrisonUpdate(prison)}
                        color="success"
                        className="text-white"
                      >
                        Details
                      </Button>
                      <Button
                        onClick={() => handlePrisonDelete(prison?._id)}
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
      <Modal
        size="2xl"
        backdrop="opaque"
        className="!z-50"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Prison
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e) => handlePrisonAdding(e, onClose)}
                  className="md:p-5 p-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5">
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
                      <label htmlFor="states">State</label>
                      <input
                        type="text"
                        name="states"
                        id="states"
                        className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                        placeholder="State Name"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
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
        scrollBehavior="outside"
        className="!z-50"
        isOpen={isPrisonUpdateOpen}
        onOpenChange={onPrisonUpdateChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Prison
              </ModalHeader>
              <ModalBody>
                <PrisonUpdateModal
                  onClose={onClose}
                  prison={prisonToShow}
                  refetch={refetch}
                ></PrisonUpdateModal>
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

export default ManagePrison;
