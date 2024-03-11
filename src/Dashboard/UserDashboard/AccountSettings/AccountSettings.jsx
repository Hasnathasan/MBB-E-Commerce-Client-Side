import { Avatar, Button } from "@nextui-org/react";
import useUser from "../../../Hooks/useUser";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const AccountSettings = () => {
  const { user } = useContext(AuthContext);
  const [userData, isUserDataLoading, refetch] = useUser();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
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
  if (isUserDataLoading) {
    return <h1>Loading......</h1>;
  }
  console.log(userData);
  const handleUserUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedName = form.name.value;
    const updatedNum = form.phoneNumber.value;
    console.log(updatedName, updatedNum);
    if (!selectedFile) {
      return toast.error("Please Select an Image");
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post("https://mbb-e-commerce-server.vercel.app/uploadSingle", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.url);
        if (res.data.url) {
          axios
            .patch(
              `https://mbb-e-commerce-server.vercel.app/userUpdate/${user?.email}`,
              {
                updatedName,
                updatedNum,
                userphoto: res?.data?.url,
              }
            )
            .then((res) => {
              console.log(res.data);
              refetch();
              if (res.data.modifiedCount > 0) {
                return toast.success("User data updated");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => console.log(error));
  };

  const handleBillingUpdate = (e) => {
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
  return (
    <div>
      {/* Account Information */}
      <div className={`border rounded-lg overflow-auto border-gray-300 mb-6`}>
        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
          Account Settings
        </h4>
        <div className="p-5 grid grid-cols-5 gap-5 items-center justify-center">
          <div className="col-span-3">
            <form onSubmit={handleUserUpdate} className="">
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
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                placeholder="Email Address"
                defaultValue={userData?.email}
                disabled
                required
              />
              <label htmlFor="tel">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
                placeholder="Your Phone Number"
                defaultValue={userData?.userPhoneNumber}
                required
              />
              <button
                type="submit"
                className=" text-white bg-[#00B207] hover:bg-[#00b206f6] focus:outline-none font-medium rounded-3xl text-sm px-7 py-2.5 text-center "
              >
                Save Changes
              </button>
            </form>
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
              className="text-white mb-2 bg-green-500 px-8"
            >
              Choose Image
            </Button>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className={`border rounded-lg overflow-auto border-gray-300`}>
        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
          Billing Address
        </h4>
        <form onSubmit={handleBillingUpdate} className="p-5">
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
              <label htmlFor="companyName">
                Company Name <span className=" text-gray-700">(optional)</span>
              </label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="companyName"
                defaultValue={userData?.billingInfo?.companyName}
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
                disabled
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
      <Toaster />
    </div>
  );
};

export default AccountSettings;
