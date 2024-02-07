import { Avatar } from "@nextui-org/react";

const PopularArtistsCard = ({ artist }) => {
  return (
    <div className="w-[100%]   flex flex-col border-2 cursor-pointer border-gray-200 hover:border-[#3fb643] hover:text-green-600 transition-all duration-300 py-6 rounded-md justify-center items-center gap-2">
      <Avatar src={artist?.img} className="w-32 h-32 text-large" />
      <h3 className="font-medium md:text-lg">{artist?.name}</h3>
    </div>
  );
};

export default PopularArtistsCard;
