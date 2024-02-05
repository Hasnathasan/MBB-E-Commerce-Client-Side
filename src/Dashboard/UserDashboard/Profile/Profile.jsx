import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Avatar } from "@nextui-org/react";


const Profile = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <div className="grid grid-cols-7 gap-6 justify-center">
                <div className="border col-span-4 flex flex-col justify-center items-center gap-2 h-[278px] border-gray-300 rounded-lg">
                <Avatar src={user?.photoURL} className="w-28 h-28 text-large" />
                <h2 className="text-xl font-medium">{user?.displayName || "Unknown"}</h2>
                <h3 className="text-gray-600">Customer</h3>
                <h2 className="text-lg cursor-pointer text-[#00B207] font-medium">Edit Profile</h2>
                </div>
                <div className="border col-span-3 border-gray-300 rounded-lg">
                <h2 className=" text-gray-600 font-medium">Billing Address</h2>
                <h2 className="text-xl font-medium">{user?.displayName || "Unknown"}</h2>
                <h3 className="text-gray-600">4140 Parker Rd. Allentown, New Mexico 31134</h3>
                <h3 className="text-gray-900 font-medium">{user?.email}</h3>
                </div>
            </div>
        </div>
    );
};

export default Profile;