import { Avatar } from "@nextui-org/react";
import useArtists from "../../Hooks/useArtists";


const Artists = () => {
    const [artistsData, isArtistsDataLoading] = useArtists();
    if(isArtistsDataLoading){
        return <h1>Loading</h1>
    }
    console.log(artistsData);
    return (
        <div className="mx-8 py-9">
            <h1 className="text-2xl mb-5 font-semibold">All Arists</h1>
            <div className="grid grid-cols-5 gap-5">
            {
                artistsData?.map(artist => <div key={artist?._id} className="flex bg-white border-2 transition-all duration-300 items-center p-6 border-gray-300 rounded-lg hover:border-green-500 flex-col gap-2">
                    <Avatar src={artist?.userPhoto} className="w-40 h-40 text-large" />
                    <h3 className="text-xl font-semibold">{artist.userName}</h3>
                    <h4 className="text-sm font-medium">Total Products: 5</h4>
                    <h4 className="text-sm font-medium">Rating: 2</h4>
                </div>)
            }
            </div>
        </div>
    );
};

export default Artists;