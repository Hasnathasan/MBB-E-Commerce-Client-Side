import { Avatar, Select, SelectItem } from "@nextui-org/react";
import useArtists from "../../../Hooks/useArtists";
import { useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import useSalesReportByArtist from "../../../Hooks/useSalesReportByArtist";


const SalesReport = () => {
  const [artistData, isArtistsDataLoading] = useArtists();
  const [artist, setArtist] = useState();
  const [products, isProductsLoading, refetch] = useSalesReportByArtist({artistEmail: artist});
  if(isArtistsDataLoading || isProductsLoading){
    return <Loader></Loader>
  }
  console.log(artist, products);
    return (
        <div className="w-[95%]">
            <div className="flex justify-between">
                <div>
                <Select
                items={artistData}
                label="Select An Artist"
                placeholder="Select an Artist"
                labelPlacement="outside"
                className="w-60"
                onChange={(e) => setArtist(e.target.value)}
              >
                {(artist) => (
                  <SelectItem
                    key={artist.email}
                    variant="bordered"
                    textValue={artist?.email}
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={artist?.prison_name}
                        className="flex-shrink-0"
                        size="sm"
                        src={artist?.avatar}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{artist?.name}</span>
                        <span className="text-tiny text-default-400">
                          {artist?.email}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
                </div>
                <div>
h
                </div>
            </div>
        </div>
    );
};

export default SalesReport;