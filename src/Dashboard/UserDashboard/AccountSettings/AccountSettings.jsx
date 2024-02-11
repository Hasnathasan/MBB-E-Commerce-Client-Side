
import { Avatar } from "@nextui-org/react";
import useUser from "../../../Hooks/useUser";

const AccountSettings = () => {
  const [userData, isUserDataLoading] = useUser();
  if(isUserDataLoading){
    return <h1>Loading......</h1>;
  }
  console.log(userData);
  return (
    <div>
      {/* Account Information */}
      <div className={`border rounded-lg overflow-auto border-gray-300 mb-6`}>
        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
          Account Settings
        </h4>
        <div className="p-5 grid grid-cols-5 gap-5 items-center justify-center">
          <div className="col-span-3">
            <form className="">
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
                required
              />
              <label htmlFor="tel">Phone Number</label>
              <input
                type="tel"
                name="tel"
                id="tel"
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
            <Avatar src={userData?.userPhoto} className="w-48 h-48 text-large" />
            <button
              type="submit"
              className=" text-white bg-[#00B207] hover:bg-[#00b206f6] focus:outline-none font-medium rounded-3xl text-sm px-7 py-2.5 text-center "
            >
              Chose Image
            </button>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className={`border rounded-lg overflow-auto border-gray-300`}>
        <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">
          Billing Address
        </h4>
        <form className="p-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="Name"
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
    </div>
  );
};

export default AccountSettings;
