import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Avatar } from "@nextui-org/react";


const AccountSettings = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className={`border rounded-lg overflow-auto border-gray-300`}>
            <h4 className="p-4 text-lg border-b border-gray-300 font-semibold">Account Settings</h4>
            <div className="p-5 grid grid-cols-5 gap-5 items-center justify-center">
                <div className="col-span-3">
                <form
          className=""
        >
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
          <label htmlFor="name">Email Address</label>
          <input
            type="text"
            name="name"
            id="name"
            className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
            placeholder="Name"
            required
          />
          <label htmlFor="name">Phone Number</label>
          <input
            type="text"
            name="name"
            id="name"
            className=" border border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-[80%] p-2.5 "
            placeholder="Name"
            required
          />
          <button
            type="submit"
            className=" text-white bg-[#00B207] hover:bg-[#00b206f6] focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center "
          >
            Save Changes
          </button>

        </form>
                </div>
                <div className="flex justify-center col-span-2 items-center gap-5 flex-col">
                <Avatar src={user?.photoURL} className="w-48 h-48 text-large" />
                <button
            type="submit"
            className=" text-white bg-[#00B207] hover:bg-[#00b206f6] focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center "
          >
            Chose Image
          </button>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;