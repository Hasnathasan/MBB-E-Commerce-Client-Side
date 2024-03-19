import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import useArtists from "../../../Hooks/useArtists";
import { useEffect, useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import useSalesReportByArtist from "../../../Hooks/useSalesReportByArtist";
import PDFGenerator from "./PDFGenerator/PDFGenerator";

const SalesReport = () => {
  const [artistData, isArtistsDataLoading] = useArtists();
  const [artist, setArtist] = useState();
  const [salesReport, isSalesReportLoading, refetch] = useSalesReportByArtist({artistEmail: artist});
  const [totalArtistProfit, setTotalArtistProfit] = useState(0)
  const [totalWebsiteProfit, setTotalWebsiteProfit] = useState(0)
  const [totalPrisonProfit, setTotalPrisonProfit] = useState(0)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  

// Iterate through each product
useEffect(() => {
  let totalArtistProfit = 0;
  let totalWebsiteProfit = 0;
  let totalPrisonProfit = 0;

  salesReport?.products?.forEach(product => {
      // Calculate total profit for each type and multiply by quantity
      const artistProfit = product.profit_distribution.artist_profit_details.artistTotal * product.quantity;
      const websiteProfit = product.profit_distribution.website_profit_details.websiteProfit * product.quantity;
      const prisonProfit = product.profit_distribution.prison_profit_details.prisonProfit * product.quantity;

      // Accumulate the totals
      totalArtistProfit += artistProfit;
      totalWebsiteProfit += websiteProfit;
      totalPrisonProfit += prisonProfit;
  });

  // Set the total profits after iterating through all products
  setTotalArtistProfit(totalArtistProfit);
  setTotalWebsiteProfit(totalWebsiteProfit);
  setTotalPrisonProfit(totalPrisonProfit);
}, [salesReport, isSalesReportLoading]);
  if(isArtistsDataLoading){
    return <Loader></Loader>
  }
  console.log(artist, salesReport);
  // Initialize variables to store total profits


// Log the total profits
console.log("Total Artist Profit:", totalArtistProfit);
console.log("Total Website Profit:", totalWebsiteProfit);
console.log("Total Prison Profit:", totalPrisonProfit);
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
        <TableColumn className="text-center">Commision</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
          <TableRow key={salesReport?._id}>
            <TableCell>
              <div className="flex justify-start items-center gap-3">
                <h3>{salesReport?._id}</h3>
              </div>
            </TableCell>
            <TableCell>{salesReport?.artistEmail}</TableCell>
            <TableCell>
              <div className="flex justify-center gap-3 items-center">
                <div className="p-2 border-r-2">
                    <p className="underline">Artist</p>
                    <p className="font-semibold">${totalArtistProfit}</p>
                </div>
                <div className="p-2 border-r-2">
                    <p className="underline">Website</p>
                    <p className="font-semibold">${totalWebsiteProfit}</p></div>
                
                <div className="p-2">
                    <p className="underline">Prison</p>
                    <p className="font-semibold">${totalPrisonProfit}</p></div>
              </div>
            </TableCell>
            <TableCell>{salesReport?.status}</TableCell>
            <TableCell>
              <Button onPress={onOpen} color="success" radius="lg" className="text-white">
                Download report
              </Button>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
            </div>

            <Modal
      scrollBehavior="outside"
      size="5xl"
      backdrop="opaque"
      className="!z-50"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add a New Product
            </ModalHeader>
            <ModalBody>
              <PDFGenerator salesReport={salesReport}></PDFGenerator>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
        </div>
    );
};

export default SalesReport;