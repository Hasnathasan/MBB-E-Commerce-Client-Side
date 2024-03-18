import { Avatar, Button, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
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

            <div>
            <Table aria-label="Example table with custom cells">
      <TableHeader>
        <TableColumn>Id</TableColumn>
        <TableColumn>Seller</TableColumn>
        <TableColumn>Commision</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
          <TableRow key={products?._id}>
            <TableCell>
              <div className="flex justify-start items-center gap-3">
                <h3>{products?._id}</h3>
              </div>
            </TableCell>
            <TableCell>{products?.artistEmail}</TableCell>
            <TableCell>
              <div className="flex justify-center gap-2 items-center">
                <div>$577</div>
                <span>|</span>
                <div>$234</div>
                <span>|</span>
                <div>$456</div>
              </div>
            </TableCell>
            <TableCell>{products?.rating}</TableCell>
            <TableCell>
              <Button color="success" radius="lg" className="text-white">
                View Details
              </Button>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
            </div>
        </div>
    );
};

export default SalesReport;