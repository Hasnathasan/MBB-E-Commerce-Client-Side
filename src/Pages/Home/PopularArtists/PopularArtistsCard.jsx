import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";

const PopularArtistsCard = ({ artist }) => {
  return (
    <Link className="w-[100%] bg-white" to={`/artistDetails/${artist?._id}`}>
      <div className="flex flex-col border-2 cursor-pointer border-gray-200 hover:border-[#3fb643] hover:text-green-600 transition-all duration-300 py-6 rounded-md justify-center items-center gap-2">
        <Avatar src={artist?.userPhoto} className="w-32 h-32 text-large" />
        <h3 className="font-medium md:text-lg">{artist?.userName}</h3>
      </div>
    </Link>
  );
};

export default PopularArtistsCard;
