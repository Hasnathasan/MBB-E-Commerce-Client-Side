
import PopularArtistsCard from "./PopularArtistsCard";

import usePopularArtist from "../../../Hooks/usePopularArtist";
import Loader from "../../../Components/Loader/Loader";

const PopularArtists = () => {
  const [artistsData, isArtistDataLoading] = usePopularArtist();
  if(isArtistDataLoading){
    return <Loader></Loader>
  }
  console.log(artistsData);
  return (
    <div className="my-16">
      <h2 className="text-xl mb-4 md:text-3xl font-semibold">
        Popular Artists
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-5 justify-center items-center">
        {artistsData?.map((artist) => (
          <PopularArtistsCard key={artist?._id} artist={artist}></PopularArtistsCard>
        ))}
      </div>
    </div>
  );
};

export default PopularArtists;
