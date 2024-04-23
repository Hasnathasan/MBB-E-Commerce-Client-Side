import { Avatar, Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactSelect from "../../../../Components/ReactSelect/ReactSelect";

const CustomerUpdateModal = ({ userData, refetch }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [instantImg, setInstantImg] = useState(null);
  const [selectedState, SetSelectedState] = useState(null);
  useEffect(() => {
    const statesOfUsa = {
      AL: "Alabama",
      AK: "Alaska",
      AZ: "Arizona",
      AR: "Arkansas",
      CA: "California",
      CO: "Colorado",
      CT: "Connecticut",
      DE: "Delaware",
      FL: "Florida",
      GA: "Georgia",
      HI: "Hawaii",
      ID: "Idaho",
      IL: "Illinois",
      IN: "Indiana",
      IA: "Iowa",
      KS: "Kansas",
      KY: "Kentucky",
      LA: "Louisiana",
      ME: "Maine",
      MD: "Maryland",
      MA: "Massachusetts",
      MI: "Michigan",
      MN: "Minnesota",
      MS: "Mississippi",
      MO: "Missouri",
      MT: "Montana",
      NE: "Nebraska",
      NV: "Nevada",
      NH: "New Hampshire",
      NJ: "New Jersey",
      NM: "New Mexico",
      NY: "New York",
      NC: "North Carolina",
      ND: "North Dakota",
      OH: "Ohio",
      OK: "Oklahoma",
      OR: "Oregon",
      PA: "Pennsylvania",
      RI: "Rhode Island",
      SC: "South Carolina",
      SD: "South Dakota",
      TN: "Tennessee",
      TX: "Texas",
      UT: "Utah",
      VT: "Vermont",
      VA: "Virginia",
      WA: "Washington",
      WV: "West Virginia",
      WI: "Wisconsin",
      WY: "Wyoming",
    };
    SetSelectedState({
      value: userData?.billingInfo?.states,
      label: statesOfUsa?.[userData?.billingInfo?.states],
    });
  }, [userData?.billingInfo?.states]);

  const options = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
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

  console.log(selectedFile);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleUserUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedName = form.name.value;
    const updatedNum = form.phoneNumber.value;
    console.log(updatedName, updatedNum);

    let promise;

    if (!selectedFile) {
      promise = updateUser(updatedName, updatedNum); // Call updateUser function with null for userphoto
    } else {
      promise = new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", selectedFile);

        axios
          .post(
            "https://mbb-e-commerce-server.vercel.app/uploadSingle",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            console.log(res.data.url);
            if (res.data.url) {
              updateUser(updatedName, updatedNum, res.data.url) // Call updateUser function with uploaded image URL
                .then(resolve)
                .catch(reject);
            }
          })
          .catch(reject);
      });
    }

    toast.promise(promise, {
      loading: "Updating user data...",
      success: "User data updated",
      error: (error) => error || "An error occurred while updating user data",
    });
  };

  const updateUser = (updatedName, updatedNum, userphoto) => {
    return axios
      .patch(
        `https://mbb-e-commerce-server.vercel.app/userUpdate/${userData?.email}`,
        {
          updatedName,
          updatedNum,
          userphoto,
        }
      )
      .then((res) => {
        console.log(res.data);
        refetch();
        if (res.data.modifiedCount > 0) {
          return "User data updated";
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  const handleBillingUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedName = form.name.value;
    const companyName = form.companyName.value;
    const country = form.country.value;
    const states = selectedState?.value;
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
        `https://mbb-e-commerce-server.vercel.app/userBillingInfoUpdate/${userData?.email}`,
        billingInfo
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success("User Billing Info Updated");
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
          <div className=" col-span-5 lg:col-span-3 order-2 lg:order-1">
            <form onSubmit={handleUserUpdate} className="">
              {/* <h3 className="text-base text-red-600">{error}</h3> */}
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-full lg:w-[80%] p-2.5 "
                placeholder="Name"
                defaultValue={userData?.userName}
                required
              />
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-full lg:w-[80%] p-2.5 "
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
                className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-full lg:w-[80%] p-2.5 "
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
          <div className="flex justify-center lg:col-span-2 col-span-5  order-1 lg:order-2 items-center gap-5 flex-col">
            <Avatar
              src={instantImg || userData?.userPhoto}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="country">City</label>
              <input
                type="text"
                name="country"
                id="country"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="City"
                defaultValue={userData?.billingInfo?.country}
                required
              />
            </div>
            <ReactSelect
              selectedState={selectedState}
              SetSelectedState={SetSelectedState}
              options={options}
            />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
    </div>
  );
};

export default CustomerUpdateModal;
