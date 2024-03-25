import { Avatar } from "@nextui-org/react";
import useArtists from "../../Hooks/useArtists";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

const Artists = () => {
  const [artistsData, isArtistsDataLoading] = useArtists();
  if (isArtistsDataLoading) {
    return <Loader></Loader>;
  }
  console.log(artistsData);
  return (
    <div className="lg:mx-8 mx-2 py-9">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">All Arists</h1>
        <h1 className="text-sm text-gray-800  font-semibold">
          Total {artistsData?.length} Artist&apos;s found
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {artistsData?.map((artist) => (
          <Link to={`/artistDetails/${artist?.email}`} key={artist?._id}>
            <div className="flex bg-white border-2 transition-all duration-300 items-center p-6 border-gray-300 rounded-lg hover:border-green-500 flex-col gap-2">
              <Avatar
                src={artist?.userPhoto}
                className="lg:w-40 w-24 lg:h-40 h-24 text-large"
              />
              <h3 className="lg:text-xl font-semibold">{artist.userName}</h3>
              <h4 className="text-sm font-medium">
                Total Products: {artist?.total_products || 0}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Artists;
