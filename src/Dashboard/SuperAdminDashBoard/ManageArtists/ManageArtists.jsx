import {
  Avatar,
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
    Select,
    SelectItem,
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
import useArtists from "../../../Hooks/useArtists";
import usePrisons from "../../../Hooks/usePrisons";
import axios from "axios";
import Swal from "sweetalert2";

const ManageArtists = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [prisons, isPrisonsDataLoading] = usePrisons();
    const [artistsData, isArtistsDataLoading] = useArtists();
    const handlePaymentInfoUpdate = (e) => {
      e.preventDefault();
      const form = e.target;
      const updatedName = form.name.value;
      const companyName = form.companyName.value;
      const country = form.country.value;
      const states = form.states.value;
      const updatedAddress = form.address.value;
      const zipCode = form.zipCode.value;
      const updatedNum = form.phoneNumber.value;
      const billingInfo = {
        updatedName,
        companyName,
        country,
        states,
        updatedAddress,
        zipCode,
        updatedNum,
      };
  
      axios
        .patch(
          `https://mbb-e-commerce-server.vercel.app/userBillingInfoUpdate/${user?.email}`,
          billingInfo
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire(
              "Congratulation",
              "Successfully Updated Your Billing Info",
              "success"
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if(isPrisonsDataLoading || isArtistsDataLoading){
      return <h1>Loading.......</h1>
    }
    return (
        <div className="overflow-x-auto w-[95%] mx-auto">
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
            <Button onPress={onOpen} color="primary" endContent={<FaPlus></FaPlus>}>
              Add New
            </Button>
          </div>
        </div>
        <span className="text-gray-600 mb-2">
          Total {artistsData?.length} users
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
          {artistsData?.map((user) => (
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


      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <div className={`border rounded-lg overflow-auto border-gray-300 mb-6`}>
        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
          Account Settings
        </h4>
        <form onSubmit={handleUserUpdate} className="">
          <div className="p-5 grid grid-cols-12 gap-5 items-center justify-center">
            <div className="col-span-9">
              {/* <h3 className="text-base text-red-600">{error}</h3> */}
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                placeholder="Name"
                required
              />
              <label htmlFor="bio">Artist Bio</label>
              <textarea
                name="bio"
                id="bio"
                className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                placeholder="Artist Bio"
                required
              />
              <label htmlFor="art_description">Art Description</label>
              <textarea
                name="art_description"
                id="art_description"
                className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                placeholder="Art Description"
                required
              />
              <div className="grid grid-cols-2">
                <div>
                  <label htmlFor="keywords">Key Words</label>
                  <MultiSelect
                    values={tags}
                    delimiters={[188]}
                    valuesFromPaste={(options, values, pastedText) => {
                      return pastedText
                        .split(",")
                        .filter(
                          (text) =>
                            !values.some((item) => item.label === text.trim())
                        )
                        .map((text) => ({
                          label: text.trim(),
                          value: text.trim(),
                        }));
                    }}
                    restoreOnBackspace={(item) => item.label}
                    onValuesChange={(tags) => setTags(tags)}
                    createFromSearch={(options, values, search) => {
                      const labels = values.map((value) => value.label);
                      if (
                        search.trim().length === 0 ||
                        labels.includes(search.trim())
                      )
                        return null;
                      return { label: search.trim(), value: search.trim() };
                    }}
                    renderNoResultsFound={(values, search) => (
                      <div className="no-results-found">
                        {(() => {
                          if (search.trim().length === 0)
                            return "Type a few characters to create a tag";
                          else if (
                            values.some((item) => item.label === search.trim())
                          )
                            return "Tag already exists";
                        })()}
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="bio_video">Your Bio Video Link </label>
                  <input
                    type="url"
                    name="bio_video"
                    id="bio_video"
                    className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                    placeholder="Your Bio Video"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                color="success"
                radius="full"
                className="text-white mb-2 bg-green-500"
              >
                Save Changes
              </Button>
            </div>
            <div className="flex justify-center col-span-2 items-center gap-5 flex-col">
              <Avatar
                src={"userData?.userPhoto"}
                className="w-48 h-48 text-large"
              />
              {/* <img src={`data:image/png;base64,${binaryCode}`} alt="Decoded Image" /> */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                onClick={handleButtonClick}
                color="success"
                radius="full"
                className="text-white mb-2 bg-green-500 w-full"
              >
                Choose Image
              </Button>
            </div>
          </div>
        </form>
      </div>
              <div className={`border rounded-lg overflow-auto border-gray-300`}>
        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
          Payment information
        </h4>
        <form onSubmit={handlePaymentInfoUpdate} className="p-5">
          <div className="grid grid-cols-2 gap-5">
           
            <div>
              <Select
                items={prisons}
                label="Assigned to"
                placeholder="Select a user"
                labelPlacement="outside"
                className="w-full"
              >
                {(prison) => (
                  <SelectItem
                    key={prison?._id}
                    variant="bordered"
                    textValue={prison?.prison_name}
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={prison?.prison_name}
                        className="flex-shrink-0"
                        size="sm"
                        src={prison?.avatar}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">
                          {prison?.prison_name}
                        </span>
                        <span className="text-tiny text-default-400">
                          {prison?.email}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
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
          <button
            type="submit"
            className=" text-white bg-[#00B207] hover:bg-[#00b206f6] focus:outline-none font-medium rounded-3xl text-sm px-7 py-2.5 text-center "
          >
            Save Changes
          </button>
        </form>
      </div>
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

export default ManageArtists;