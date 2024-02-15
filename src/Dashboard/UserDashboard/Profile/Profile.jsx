import { Avatar } from "@nextui-org/react";
import useUser from "../../../Hooks/useUser";

const Profile = () => {
  const [userData] = useUser();
  return (
    <div>
      <div className="grid grid-cols-7 gap-6 justify-center">
        <div className="border col-span-4 flex flex-col justify-center items-center gap-2 h-[278px] border-gray-300 rounded-lg">
          <Avatar src={userData?.userPhoto} className="w-28 h-28 text-large" />
          <h2 className="text-xl font-medium">
            {userData?.userName || "Unknown"}
          </h2>
          <h3 className="text-gray-600">Customer</h3>
          <h2 className="text-lg cursor-pointer text-[#00B207] font-medium">
            Edit Profile
          </h2>
        </div>
        <div className="border col-span-3 p-7 space-y-3 border-gray-300 rounded-lg">
          <h2 className=" text-gray-600 mb-5 font-medium">Billing Address</h2>
          <h2 className="text-xl font-medium">
            {userData?.userName || "Unknown"}
          </h2>
          <h3 className="text-gray-600 text-sm">
            {userData?.billingInfo?.address}
          </h3>
          <h3 className="text-gray-900 font-medium">{userData?.email}</h3>
          <h3 className="text-gray-900 font-medium">
            {userData?.userPhoneNumber}
          </h3>
          <h2 className="text-lg cursor-pointer text-[#00B207] font-medium">
            Edit Address
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
