import toast from "react-hot-toast";
import Loader from "../../../../Components/Loader/Loader";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import usePrisons from "../../../../Hooks/usePrisons";
import useArtists from "../../../../Hooks/useArtists";
import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, SelectItem, Select, useDisclosure } from "@nextui-org/react";
import { MultiSelect } from "react-selectize";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
import ReactSelect from "../../../../Components/ReactSelect/ReactSelect";

const ArtistUpdateModal = ({ artist, onClose }) => {
  const { setArtistToAddProduct, onProductAddingModalOpen } =
    useContext(AuthContext);
  const [prisons, isPrisonsDataLoading] = usePrisons();
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const [artistsData, isArtistsDataLoading, refetch] = useArtists();
  const [selectedState, SetSelectedState] = useState(null);
  const [passhide, setPasshide] = useState(true);
  const [passhide2, setPasshide2] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [instantImg, setInstantImg] = useState(null);
  const [prison, setPrison] = useState(null);
  const [prisonEmail, setPrisonEmail] = useState(null);
  const fileInputRef = useRef(null);

useEffect( () => {
  const statesOfUsa = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "FL": "Florida",
    "GA": "Georgia",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};
SetSelectedState({value: artist?.billingInfo?.states, label: statesOfUsa?.[artist?.billingInfo?.states]})
},[artist?.billingInfo?.states])



const options = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];
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

  console.log(artist);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const [tags, setTags] = useState(
    artist?.keywords?.map((str) => ({ label: str, value: str }))
  );
  useEffect(() => {
    const selectedPrison = prisons?.find(
      (eachPrison) => eachPrison?.email == prisonEmail
    );

    setPrison(selectedPrison);
  }, [prisonEmail, prisons]);

  const handleArtistUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const email = form.email.value;
    const bio = form.bio.value;
    const art_description = form.art_description.value;
    const bio_video_link = form.bio_video.value;
    const keywords = tags?.map((tag) => tag.label);
    const country = form.country.value;
    const states = selectedState?.value;
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
    let artistUpdatedData = {
      userName,
      art_description,
      bio,
      bio_video_link,
      keywords,
      userPhoneNumber,
      billingInfo,
    };

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(selectedFile);
    console.log(artistUpdatedData);
    const uploadImageAndInsertArtist = async () => {
      try {
        if (selectedFile) {
          const response = await axios.post(
            "https://mbb-e-commerce-server.vercel.app/uploadSingle",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data.url);
          artistUpdatedData.userPhoto = response.data.url;
        }
        const res = await axios.patch(
          `https://mbb-e-commerce-server.vercel.app/updateArtist/${artist?._id}`,
          artistUpdatedData
        );
        console.log(res.data);
        setInstantImg(null);
        onClose();
        refetch();
        form.reset();
        return res.data; // Return data to handle success message
      } catch (error) {
        console.log(error.response.data); // Log server-side error
        throw error.response.data; // Throw server-side error
      }
    };

    const artistPromise = uploadImageAndInsertArtist();

    toast.promise(artistPromise, {
      loading: "Please wait! while uploading artist...",
      success: "Artist Data Updated successfully",
      error: (error) => {
        console.log(error);
        return error?.message || "An error occurred while uploading artist"; // Display server-side error if available
      },
    });
  };
  const handleAddProductForArtist = () => {
    setArtistToAddProduct(artist?._id);
    onClose();
    navigate("/adminDashboard/products");
    onProductAddingModalOpen();
  };

  const handleCreateLogin = (e,onClose) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPass = form.confirmPass.value;
    if (password !== confirmPass) {
        return toast.error("Confirmation password didn't match");
    }

    const credentials = { email, password, userName: artist?.userName };

    const promise = axios.patch(`https://mbb-e-commerce-server.vercel.app/createLogin/${artist?._id}`, credentials)
        .then(res => {
            console.log(res.data);
            refetch();
            onClose();
            return res.data;
        })
        .catch(err => {
            throw err;
        });

    toast.promise(promise, {
        loading: 'Creating login...',
        success: 'Login created successfully',
        error: (error) => {
            return error?.response?.data?.message || "An error occurred while creating login";
        }
    });
};

  if (isPrisonsDataLoading || isArtistsDataLoading) {
    return <Loader></Loader>;
  }
  return (
    <>
    <form onSubmit={handleArtistUpdate} className="">
      <div className={`border rounded-lg overflow-auto border-gray-300 mb-6`}>
        <div className="flex justify-between items-center border-b border-gray-300 p-4 ">
          <h4 className="text-lg font-semibold">Artist&apos;s personal Info</h4>
          <div className="space-x-3">
          <Button
            onClick={handleAddProductForArtist}
            color="success"
            size="sm"
            className="text-white text-sm mb-2 bg-green-500"
          >
            Add Product
          </Button>
          <Button
            onPress={onOpen}
            color="success"
            size="sm"
            className="text-white text-sm mb-2 bg-green-500"
          >
            Create Login
          </Button>
          </div>
        </div>
        <div className="p-5 grid grid-cols-12 gap-5 items-center justify-center">
          <div className="lg:col-span-9 col-span-12">
            {/* <h3 className="text-base text-red-600">{error}</h3> */}
            <div className="mb-3">
              <label htmlFor="name">Artist Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className=" border border-gray-300 text-gray-900 mt-1 sm:text-sm rounded-md focus:outline-green-500 block w-full lg:w-[80%] p-2.5 "
                placeholder="Your Name"
                defaultValue={artist?.userName}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Artist Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className=" border border-gray-300 text-gray-900 mt-1 sm:text-sm rounded-md focus:outline-green-500 block  w-full lg:w-[80%] p-2.5 "
                placeholder="Email"
                disabled
                defaultValue={artist?.email}
                required
              />
            </div>
            <label htmlFor="bio">Artist Bio</label>
            <textarea
              name="bio"
              id="bio"
              className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-full lg:w-[80%] p-2.5 "
              placeholder="Artist Bio"
              defaultValue={artist?.bio}
              required
            />
            <label htmlFor="art_description">Art Description</label>
            <textarea
              name="art_description"
              id="art_description"
              className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-full lg:w-[80%] p-2.5 "
              placeholder="Art Description"
              defaultValue={artist?.art_description}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2">
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
                          values.some((item) => item.label === search.trim())
                        )
                          return "Tag already exists";
                      })()}
                    </div>
                  )}
                />
              </div>
              <div>
                <label htmlFor="bio_video">Bio Video Link </label>
                <input
                  type="url"
                  name="bio_video"
                  id="bio_video"
                  className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                  placeholder="Your Bio Video"
                  defaultValue={artist?.bio_video_link}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center col-span-12 lg:col-span-2 items-center gap-5 flex-col">
            <Avatar
              src={instantImg || artist?.userPhoto}
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
              className="text-white text-sm mb-2 bg-green-500 w-full"
            >
              Select new Image
            </Button>
          </div>
        </div>
      </div>
      <div className={`border rounded-lg overflow-auto border-gray-300`}>
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
                isRequired
                onChange={(e) => setPrisonEmail(e.target.value)}
                defaultSelectedKeys={[
                  artist?.billingInfo?.prison?.prison_email,
                ]}
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
                defaultValue={artist?.billingInfo?.address}
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
                defaultValue={artist?.billingInfo?.country}
                required
              />
            </div>
                <ReactSelect
      selectedState={selectedState}
      SetSelectedState={SetSelectedState}
      options={options}
    />
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
                defaultValue={artist?.billingInfo?.zipCode}
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
                defaultValue={artist?.billingInfo?.userPhoneNumber}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className=" text-white bg-[#00B207] hover:bg-[#00b206f6] focus:outline-none font-medium rounded-3xl text-sm px-7 py-2.5 text-center "
          >
            Update Artist
          </button>
        </div>
      </div>
    </form>
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
                Create Login For This Artist
              </ModalHeader>
              <ModalBody>
              <form className="space-y-4" onSubmit={(e) => handleCreateLogin(e, onClose)}>
              <div>
                            <label htmlFor="email">Artist Email</label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className=" border border-gray-300 text-gray-900 mt-1 sm:text-sm rounded-md focus:outline-green-500 block w-full p-2.5 "
                              placeholder="Email"
                              defaultValue={artist?.email}
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
                            <label htmlFor="confirmPass">
                              Confirmation Password
                            </label>
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
                          <button
                            type="submit"
                            className=" text-white bg-[#00B207] hover:bg-[#00b206f6] focus:outline-none font-medium rounded-3xl text-sm px-7 py-2.5 text-center "
                          >
                            Create Login
                          </button>
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
    </>
  );
};

export default ArtistUpdateModal;
