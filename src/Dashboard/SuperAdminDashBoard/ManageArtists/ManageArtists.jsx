import {
  Avatar,
  Pagination,
  Button,
  ButtonGroup,
  Chip,
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
import { FaPlus } from "react-icons/fa";
import useArtists from "../../../Hooks/useArtists";
import usePrisons from "../../../Hooks/usePrisons";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { MultiSelect } from "react-selectize";
import useUser from "../../../Hooks/useUser";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../Components/Loader/Loader";
import ArtistUpdateModal from "./ArtistUpdateModal/ArtistUpdateModal";

const ManageArtists = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isArtistUpdateModalOpen,
    onOpen: onArtistUpdateModalOpen,
    onOpenChange: onArtistUpdateModalOpenChange,
  } = useDisclosure();
  const [prisons, isPrisonsDataLoading] = usePrisons();
  const [artistToShowOnModal, setArtistToShowOnModal] = useState();
  const [userData] = useUser();
  const [artistsData, isArtistsDataLoading, refetch] = useArtists();
  const [selectedFile, setSelectedFile] = useState(null);
  const [instantImg, setInstantImg] = useState(null);
  const [passhide, setPasshide] = useState(true);
  const [passhide2, setPasshide2] = useState(true);
  const [prison, setPrison] = useState(null);
  const [prisonEmail, setPrisonEmail] = useState(null);
  const fileInputRef = useRef(null);
  console.log(userData);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setInstantImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleArtistUpdateModal = (user) => {
    setArtistToShowOnModal(user);
    onArtistUpdateModalOpen();
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const pages = Math.ceil(artistsData?.length / rowsPerPage);

  const artists = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return artistsData?.slice(start, end);
  }, [page, artistsData]);

  console.log(selectedFile);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const [tags, setTags] = useState(
    []?.map((str) => ({ label: str, value: str }))
  );
  useEffect(() => {
    const selectedPrison = prisons?.find(
      (eachPrison) => eachPrison?.email == prisonEmail
    );

    setPrison(selectedPrison);
  }, [prisonEmail, prisons]);
  console.log("Prison", prison);
  const addNewArtist = (e, onClose) => {
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
      prison: { prison_name: prison?.prison_name, prison_email: prison?.email },
      zipCode,
    };
    if ( password && confirmPass && password !== confirmPass) {
      return toast.error("Confirmation password didn't match");
    }
    console.log({
      email,
      prison,
      userName,
      bio,
      art_description,
      bio_video_link,
      keywords,
      country,
      states,
      address,
      zipCode,
      userPhoneNumber,
    });
    let artist = {
      email,
      password,
      userName,
      art_description,
      createdAt: new Date(),
      bio,
      bio_video_link,
      keywords,
      userPhoneNumber,
      billingInfo,
      userRole: "artist",
      isLoginCreated: false
    };
    if(email && password && confirmPass && password !== confirmPass){
      artist.isLoginCreated = true;
    }
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log(selectedFile);
      const uploadAndInsertArtist = () => {
        return axios
          .post(
            "https://mbb-e-commerce-server.vercel.app/uploadSingle",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            console.log(response.data.url);
            artist.userPhoto = response.data.url;
            if (response.data.url) {
              return axios
                .post(
                  `https://mbb-e-commerce-server.vercel.app/artistByAdmin`,
                  artist
                )
                .then((res) => {
                  setInstantImg(null);
                  setSelectedFile(null)
                  console.log(res.data);
                  refetch();
                  form.reset();
                  onClose();
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
          .catch((error) => {
            console.log(error);
            throw error; // Throw error to handle error message
          });
      };

      const artistPromise = uploadAndInsertArtist();

      toast.promise(artistPromise, {
        loading: "Please wait! while uploading artist...",
        success: "Artist uploaded successfully",
        error: (error) => {
          return error?.message || "An error occurred while uploading artist"; // Display server-side error if available
        },
      });
    } else {
      return toast.error("Please, select an Image");
    }
  };

  if (isPrisonsDataLoading || isArtistsDataLoading) {
    return <Loader></Loader>;
  }

  const deleteFunc = (email) => {
    axios
      .delete(`https://mbb-e-commerce-server.vercel.app/artistDelete/${email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("User Deleted");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleArtistDelete = (email) => {
    toast((t) => (
      <span>
        Do You Want To Delete This Artist?
        <ButtonGroup variant="solid" radius="none" size="sm">
          <Button
            className="px-9 mt-3 float-right  text-white"
            color="danger"
            onClick={() => {
              deleteFunc(email);
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
      {
        <div className="overflow-x-auto w-[95%] mx-auto">
          <div className="flex flex-col  gap-4">
            <div className="flex justify-end p-5 bg-white rounded-xl gap-3 items-end">
              <div className="flex gap-3">
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
              Total {artistsData?.length} users
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
              <TableColumn>Name</TableColumn>
              <TableColumn>Email / Number</TableColumn>
              <TableColumn>User Role</TableColumn>
              <TableColumn>
                <h5 className="text-center">Details</h5>
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No Artist Available"}>
              {artists?.length > 0
                ? artists?.map((user) => (
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
                          color={
                            user.userRole == "mbbAdmin" ? "danger" : "success"
                          }
                          size="sm"
                          variant="flat"
                        >
                          {user.userRole}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <ButtonGroup size="sm">
                          <Button
                            onClick={() => handleArtistUpdateModal(user)}
                            color="success"
                            className="text-white"
                          >
                            View Details
                          </Button>
                          <Button
                            onClick={() => handleArtistDelete(user?.email)}
                            color="danger"
                            className="text-white"
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                : []}
            </TableBody>
          </Table>

          <Modal
            scrollBehavior="outside"
            size="5xl"
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={() => {
              setInstantImg(null);
              onOpenChange();
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add a New Artist
                  </ModalHeader>
                  <ModalBody>
                    <form
                      onSubmit={(e) => addNewArtist(e, onClose)}
                      className=""
                    >
                      <div className="border border-gray-300 rounded-lg mb-6">
                        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
                          Account Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 ">
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
                            <label htmlFor="confirmPass">
                              Confirmation Password
                            </label>
                            <input
                              type={passhide2 ? "password" : "text"}
                              name="confirmPass"
                              id="confirmPass"
                              placeholder="Confirm Password"
                              className=" border border-gray-300 text-gray-900 mt-1 sm:text-sm rounded-md focus:outline-green-500 block w-full p-2.5 "
                              
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
                      <div
                        className={`border rounded-lg overflow-auto border-gray-300 mb-6`}
                      >
                        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
                          Artist&apos;s personal Info
                        </h4>
                        <div className="p-5 grid grid-cols-12 gap-5 items-center justify-center">
                          <div className="lg:col-span-9 col-span-12">
                            {/* <h3 className="text-base text-red-600">{error}</h3> */}

                            <label htmlFor="bio">Artist Bio</label>
                            <textarea
                              name="bio"
                              id="bio"
                              className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                              placeholder="Artist Bio"
                              required
                            />
                            <label htmlFor="art_description">
                              Art Description
                            </label>
                            <textarea
                              name="art_description"
                              id="art_description"
                              className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                              placeholder="Art Description"
                              required
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2">
                              <div>
                                <label htmlFor="keywords">Key Words</label>
                                <MultiSelect
                                  values={tags}
                                  delimiters={[188]}
                                  valuesFromPaste={(
                                    options,
                                    values,
                                    pastedText
                                  ) => {
                                    return pastedText
                                      .split(",")
                                      .filter(
                                        (text) =>
                                          !values.some(
                                            (item) => item.label === text.trim()
                                          )
                                      )
                                      .map((text) => ({
                                        label: text.trim(),
                                        value: text.trim(),
                                      }));
                                  }}
                                  restoreOnBackspace={(item) => item.label}
                                  onValuesChange={(tags) => setTags(tags)}
                                  createFromSearch={(
                                    options,
                                    values,
                                    search
                                  ) => {
                                    const labels = values.map(
                                      (value) => value.label
                                    );
                                    if (
                                      search.trim().length === 0 ||
                                      labels.includes(search.trim())
                                    )
                                      return null;
                                    return {
                                      label: search.trim(),
                                      value: search.trim(),
                                    };
                                  }}
                                  renderNoResultsFound={(values, search) => (
                                    <div className="no-results-found">
                                      {(() => {
                                        if (search.trim().length === 0)
                                          return "Type a few characters to create a tag";
                                        else if (
                                          values.some(
                                            (item) =>
                                              item.label === search.trim()
                                          )
                                        )
                                          return "Tag already exists";
                                      })()}
                                    </div>
                                  )}
                                />
                              </div>
                              <div>
                                <label htmlFor="bio_video">
                                  Bio Video Link{" "}
                                </label>
                                <input
                                  type="url"
                                  name="bio_video"
                                  id="bio_video"
                                  className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                                  placeholder="Your Bio Video"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center col-span-12 md:col-span-2 items-center gap-5 flex-col">
                            <Avatar
                              src={instantImg}
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
                      <div
                        className={`border rounded-lg overflow-auto border-gray-300`}
                      >
                        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
                          Payment information
                        </h4>
                        <div className="p-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <Select
                                items={prisons}
                                label="Prison / Organization"
                                placeholder="Select a Prison"
                                labelPlacement="outside"
                                className="w-full"
                                onChange={(e) => setPrisonEmail(e.target.value)}
                              >
                                {(prison) => (
                                  <SelectItem
                                    key={prison?.email}
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

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                            Add Artist
                          </button>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => {
                        setInstantImg(null);
                        onClose();
                      }}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Modal
            scrollBehavior="outside"
            size="5xl"
            backdrop="opaque"
            className="!z-50"
            isOpen={isArtistUpdateModalOpen}
            onOpenChange={onArtistUpdateModalOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add a New Product
                  </ModalHeader>
                  <ModalBody>
                    <ArtistUpdateModal
                      onClose={onClose}
                      refetch={refetch}
                      artist={artistToShowOnModal}
                    ></ArtistUpdateModal>
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
      }
    </>
  );
};

export default ManageArtists;
