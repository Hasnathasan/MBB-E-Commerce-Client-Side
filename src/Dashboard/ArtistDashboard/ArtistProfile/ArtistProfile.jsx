import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useUser from "../../../Hooks/useUser";
import axios from "axios";
import Swal from "sweetalert2";
import { Avatar, Button, Select, SelectItem } from "@nextui-org/react";
import { MultiSelect } from "react-selectize";
import usePrisons from "../../../Hooks/usePrisons";

const ArtistProfile = () => {
  const { user } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

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
  const [userData, isUserDataLoading, refetch] = useUser();
  const [prisons, isPrisonsLoading] = usePrisons();
  // const [binaryCode, setBinaryCode] = useState();
  const [tags, setTags] = useState(
    []?.map((str) => ({ label: str, value: str }))
  );
  // axios.get("http://localhost:8000/images")
  // .then(res => {
  //   console.log(res.data)
  //   setBinaryCode(res.data[0].image)
  // })
  // .catch(error=> console.log(error))
  useEffect(() => {
    setTags(
      userData?.keyWords?.map((str) => ({ label: str, value: str })) || []
    );
  }, [userData?.keyWords]);

  console.log(tags);
  const updatedKeyWords = tags?.map((tag) => tag.label);
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedName = form.name.value;
    const updatedBio = form.bio.value;
    const updatedArtDescription = form.art_description.value;
    const updatedBioVideo = form.bio_video.value;
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log(selectedFile);
      //     formData.append("upload_preset", "iwbft8xu")
      //     formData.append("cloud_name", "dyewzhari")
      //     console.log(formData, selectedFile);
      //     axios.post('https://api.cloudinary.com/v1_1/dyewzhari/image/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // })
      // .then(response => {
      //   console.log(response.data);
      // })
      // .catch(error => {
      //   console.error('Error uploading file: ', error);
      // });
      axios
        .post("https://mbb-e-commerce-server.vercel.app/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.url);
          if (response.data?.url) {
            axios
              .patch(
                `https://mbb-e-commerce-server.vercel.app/artistUpdate/${user?.email}`,
                {
                  updatedName,
                  updatedBio,
                  updatedArtDescription,
                  updatedBioVideo,
                  updatedKeyWords,
                  userPhoto: response?.data?.url,
                }
              )
              .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                  refetch();
                  Swal.fire(
                    "Congratulation",
                    "Successfully Updated Your Data",
                    "success"
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
        });
    }
  };

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
  if (isPrisonsLoading || isUserDataLoading) {
    return <h1>Loading......</h1>;
  }
  const defaultPrisons = [
    {
      _id: "65d8bde73a844ba9417a45be",
      prison_name: "Mary Hutchinson Prison",
      country: "United States",
      states: "New York State",
      address: "9525 Manchester Lane Bay Shore, NY 11706",
      zipCode: "17212",
      email: "newyork389@gmail.com",
      number: "5247379174",
    },
    {
      _id: "65d8bdf23a844ba9417a45bf",
      prison_name: "Melbourne Youth Justice Centre",
      country: "United States",
      states: "New York State",
      address: "9525 Manchester Lane Bay Shore, NY 11706",
      zipCode: "17212",
      email: "newyork389@gmail.com",
      number: "5247379174",
    },
    {
      _id: "65d8bdf93a844ba9417a45c0",
      prison_name: "Tzalmon Prison",
      country: "United States",
      states: "New York State",
      address: "9525 Manchester Lane Bay Shore, NY 11706",
      zipCode: "17212",
      email: "newyork389@gmail.com",
      number: "5247379174",
    },
    {
      _id: "65d8be183a844ba9417a45c1",
      prison_name: "Damelin Prison Hall",
      country: "United States",
      states: "New York State",
      address: "9525 Manchester Lane Bay Shore, NY 11706",
      zipCode: "17212",
      email: "newyork389@gmail.com",
      number: "5247379174",
    },
  ];

  return (
    <div>
      {/* Account Information */}
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
                defaultValue={userData?.userName}
                required
              />
              <label htmlFor="bio">Artist Bio</label>
              <textarea
                name="bio"
                id="bio"
                className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                placeholder="Artist Bio"
                defaultValue={userData?.bio}
                required
              />
              <label htmlFor="art_description">Art Description</label>
              <textarea
                name="art_description"
                id="art_description"
                className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                placeholder="Art Description"
                defaultValue={userData?.art_description}
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
                    defaultValue={userData?.bio_video_link}
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
                src={userData?.userPhoto}
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

      {/* Payment Information */}
      <div className={`border rounded-lg overflow-auto border-gray-300`}>
        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
          Payment information
        </h4>
        <form onSubmit={handlePaymentInfoUpdate} className="p-5">
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
              <Select
                items={prisons || defaultPrisons}
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
      </div>
    </div>
  );
};

export default ArtistProfile;
