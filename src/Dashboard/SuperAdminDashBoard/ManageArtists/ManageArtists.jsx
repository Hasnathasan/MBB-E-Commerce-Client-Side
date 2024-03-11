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
import { useRef, useState } from "react";
import { MultiSelect } from "react-selectize";
import useUser from "../../../Hooks/useUser";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const ManageArtists = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [prisons, isPrisonsDataLoading] = usePrisons();
  const [userData, isUserDataLoading] = useUser();
    const [artistsData, isArtistsDataLoading] = useArtists();
    const [selectedFile, setSelectedFile] = useState(null);
  const [passhide, setPasshide] = useState(true);
  const [passhide2, setPasshide2] = useState(true);
  const [prison, setPrison] = useState(null);
    const fileInputRef = useRef(null);
  console.log(userData);
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
      }
    };
    
    console.log(selectedFile);
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
    const [tags, setTags] = useState(
      []?.map((str) => ({ label: str, value: str }))
    );

    
    const addNewArtist = (e) => {
      e.preventDefault();
      const form = e.target;
      const userName = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const confirmPass = form.confirmPass.value;
      const bio = form.bio.value;
      const art_description = form.art_description.value;
      const bio_video_link = form.bio_video.value;
      const keywords = tags?.map((tag) => tag.label);
      const country = form.country.value;
      const states = form.states.value;
      const address = form.address.value;
      const zipCode = form.zipCode.value;
      const userPhoneNumber = form.phoneNumber.value;


      let billingInfo = {
        userName,
        country,
        states,
        address,
        userPhoneNumber,
        zipCode,
      };
      if (password !== confirmPass) {
        return toast.error("Confirmation password didn't match")
      }
      console.log({email,prison,userName, bio, art_description, bio_video_link, keywords, country, states, address, zipCode, userPhoneNumber});
      let artist = {email, password, userName, art_description, bio, bio_video_link, keywords, userPhoneNumber, billingInfo, userRole: "artist"}
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log(selectedFile);
        const uploadAndInsertArtist = () => {
          return axios.post("https://mbb-e-commerce-server.vercel.app/uploadSingle", formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          })
          .then(response => {
              console.log(response.data.url);
              artist.userPhoto = response.data.url;
              if (response.data.url) {
                  return axios.post(`https://mbb-e-commerce-server.vercel.app/artistByAdmin`, artist)
                      .then((res) => {
                          console.log(res.data);
                          return res.data; // Return data to handle success message
                      })
                      .catch((error) => {
                          console.log(error.response.data); // Log server-side error
                          throw error.response.data; // Throw server-side error
                      });
              } else {
                  return Promise.reject(new Error("No image URL found"));
              }
          })
          .catch(error => {
              console.log(error);
              throw error; // Throw error to handle error message
          });
      };
      
      const artistPromise = uploadAndInsertArtist();
      
      toast.promise(artistPromise, {
          loading: 'Please wait! while uploading artist...',
          success: 'Artist uploaded successfully',
          error: (error) => {
              return error?.message || 'An error occurred while uploading artist'; // Display server-side error if available
          },
      });
    }
    else{
      return toast.error("Please, select an Image")
    }

  }

    
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
                <Button color="success" radius="lg" className="text-white">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <Modal scrollBehavior="outside" size="5xl" backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add a New Artist</ModalHeader>
              <ModalBody>
        <form onSubmit={addNewArtist} className="">
        <div className="border border-gray-300 rounded-lg mb-6">
        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
          Sign Up Credentials
        </h4>
        <div className="grid grid-cols-2 gap-5 p-5 ">
        <div>
        <label htmlFor="name">Artist Name</label>
        <input
            type="text"
            name="name"
            id="name"
            className=" border border-gray-300 text-gray-900 mt-1 sm:text-sm rounded-md focus:outline-green-500 block w-full p-2.5 "
            placeholder="Your Name"
            required
          />
        </div>
        <div>
        <label htmlFor="email">Artist Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className=" border border-gray-300 text-gray-900 mt-1 sm:text-sm rounded-md focus:outline-green-500 block w-full p-2.5 "
            placeholder="Email"
            required
          />
        </div>
          <div className="relative">
        <label htmlFor="password">Password</label>
            <input
              type={passhide ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Password"
              className=" border border-gray-300 text-gray-900 mt-1 sm:text-sm rounded-md focus:outline-green-500 block w-full p-2.5 "
              required
            />
            <span className="absolute right-4 bottom-3">
              {passhide ? (
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setPasshide(!passhide)}
                />
              ) : (
                <IoEyeOffSharp
                  className="cursor-pointer"
                  onClick={() => setPasshide(!passhide)}
                />
              )}
            </span>
          </div>
          <div className="relative">
        <label htmlFor="confirmPass">Confirmation Password</label>
            <input
              type={passhide2 ? "password" : "text"}
              name="confirmPass"
              id="confirmPass"
              placeholder="Confirm Password"
              className=" border border-gray-300 text-gray-900 mt-1 sm:text-sm rounded-md focus:outline-green-500 block w-full p-2.5 "
              required
            />
            <span className="absolute right-4 bottom-3">
              {passhide2 ? (
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setPasshide2(!passhide2)}
                />
              ) : (
                <IoEyeOffSharp
                  className="cursor-pointer"
                  onClick={() => setPasshide2(!passhide2)}
                />
              )}
            </span>
          </div>
          </div>
        </div>
              <div className={`border rounded-lg overflow-auto border-gray-300 mb-6`}>
        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
          Artist&apos;s personal Info
        </h4>
          <div className="p-5 grid grid-cols-12 gap-5 items-center justify-center">
            <div className="col-span-9">
              {/* <h3 className="text-base text-red-600">{error}</h3> */}
              
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
        
      </div>
              <div className={`border rounded-lg overflow-auto border-gray-300`}>
        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
          Payment information
        </h4>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-5">
           
            <div>
              <Select
                items={prisons}
                label="Assigned to"
                placeholder="Select a user"
                labelPlacement="outside"
                className="w-full"
                onChange={e => setPrison(e.target.value)}
              >
                {(prison) => (
                  <SelectItem
                    key={`${prison?.email}=${prison?.prison_name}`}
                    variant="bordered"
                    textValue={`${prison?.email} ${prison?.prison_name}`}
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
          
          <div className="grid grid-cols-2 gap-5">
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
          </div>
          <div className="grid grid-cols-2 gap-5">

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
        </div>
      </div>
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
      <Toaster></Toaster>
    </div>
    );
};

export default ManageArtists;