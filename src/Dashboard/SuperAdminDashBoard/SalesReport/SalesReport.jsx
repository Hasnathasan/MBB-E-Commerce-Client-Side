import {
  Avatar,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import useArtists from "../../../Hooks/useArtists";
import { useEffect, useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import useSalesReportByArtist from "../../../Hooks/useSalesReportByArtist";
import PDFGenerator from "./PDFGenerator/PDFGenerator";
import useAllSalesReport from "../../../Hooks/useAllSalesReport";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SalesReport = () => {
  const [artistData, isArtistsDataLoading] = useArtists();
  const [status, setStatus] = useState();
  const [artist, setArtist] = useState();
  const [allSalesReport, isAllSalesReportLoading, refetch] = useAllSalesReport({
    status,
  });
  const [reportToDownload, setReportToDownload] = useState(null);
  const [isArtistAvailable, setIsArtistAvailable] = useState(false);
  const [salesReport, isSalesReportLoading] = useSalesReportByArtist({
    artistId: artist,
  });
  const [totalArtistProfit, setTotalArtistProfit] = useState(0);
  const [totalWebsiteProfit, setTotalWebsiteProfit] = useState(0);
  const [totalPrisonProfit, setTotalPrisonProfit] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dummyStatus, setDummyStatus] = useState("unpaid");

  console.log(salesReport);
  // Iterate through each product
  useEffect(() => {
    let totalArtistProfit = 0;
    let totalWebsiteProfit = 0;
    let totalPrisonProfit = 0;

    salesReport?.products?.forEach((product) => {
      // Calculate total profit for each type and multiply by quantity
      const artistProfit =
        product.profit_distribution.artist_profit_details.artistTotal *
        product.quantity;
      const websiteProfit =
        product.profit_distribution.website_profit_details.websiteProfit *
        product.quantity;
      const prisonProfit =
        product.profit_distribution.prison_profit_details.prisonProfit *
        product.quantity;

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

  const handleReportGenerate = (e) => {
    e.preventDefault();
    console.log("hello");
    if (!artist) {
      return toast.error("No Artist Selected");
    }
    setIsArtistAvailable(true);
  };
  if (isArtistsDataLoading || isAllSalesReportLoading) {
    return <Loader></Loader>;
  }
  console.log(artist, salesReport);
  // Initialize variables to store total profits

  // Log the total profits
  console.log("Total Artist Profit:", totalArtistProfit);
  console.log("Total Website Profit:", totalWebsiteProfit);
  console.log("Total Prison Profit:", totalPrisonProfit);

  const handleDownloadReport = (report) => {
    setReportToDownload(report);
    onOpen();
  };
  const handleStatusUpdate = (report) => {
    axios
      .patch(
        `https://mbb-e-commerce-server.vercel.app/sales-report-update/${report?._id}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          setDummyStatus("paid");
          toast.success("Status updated to paid");
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const processSalesReport = (salesReport) => {
    let totalArtistProfit = 0;
    let totalWebsiteProfit = 0;
    let totalPrisonProfit = 0;

    salesReport?.products?.forEach((product) => {
      // Calculate total profit for each type and multiply by quantity
      const artistProfit =
        product.profit_distribution.artist_profit_details.artistTotal *
        product.quantity;
      const websiteProfit =
        product.profit_distribution.website_profit_details.websiteProfit *
        product.quantity;
      const prisonProfit =
        product.profit_distribution.prison_profit_details.prisonProfit *
        product.quantity;

      // Accumulate the totals
      totalArtistProfit += artistProfit;
      totalWebsiteProfit += websiteProfit;
      totalPrisonProfit += prisonProfit;
    });
    return { totalArtistProfit, totalWebsiteProfit, totalPrisonProfit };
  };

  console.log(salesReport);
  return (
    <div className="w-[95%]">
      <div className="flex justify-between flex-col md:flex-row mt-10 mb-5">
        <form
          onSubmit={handleReportGenerate}
          className="flex justify-start gap-4 items-end"
        >
          <Select
            items={artistData}
            label="Select An Artist"
            placeholder="Select an Artist"
            labelPlacement="outside"
            className="w-60"
            onClose={() => setIsArtistAvailable(false)}
            onChange={(e) => {
              refetch();
              toast("Click on the Generate Report Button to see result", {
                duration: 2000,
              });
              setArtist(e.target.value);
            }}
          >
            {(artist) => (
              <SelectItem
                key={artist._id}
                variant="bordered"
                textValue={artist?.userName}
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={artist?.userName}
                    className="flex-shrink-0"
                    size="sm"
                    src={artist?.userPhoto}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{artist?.userName}</span>
                    <span className="text-tiny text-default-400">
                      {artist?.email}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
          <Button type="submit" color="success" className="text-white">
            Generate Report
          </Button>
        </form>
        <div className="">
          <Select
            placeholder="Filter By Status"
            className="w-40 text-nowrap"
            disableSelectorIconRotation
            onChange={(e) => setStatus(e.target.value)}
          >
            <SelectItem key={"all"} value={"all"}>
              Filter By Status
            </SelectItem>
            <SelectItem key={"paid"} value={"paid"}>
              Paid
            </SelectItem>
            <SelectItem key={"unpaid"} value={"unpaid"}>
              Unpaid
            </SelectItem>
          </Select>
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
          <TableBody emptyContent={"No Report Available"}>
            {isArtistAvailable ? (
              salesReport?.products?.length !== 0 ? (
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
                        <p className="font-semibold">${totalWebsiteProfit}</p>
                      </div>

                      <div className="p-2">
                        <p className="underline">Prison</p>
                        <p className="font-semibold">${totalPrisonProfit}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{dummyStatus}</TableCell>
                  <TableCell className="text-center">
                    <ButtonGroup
                      size="sm"
                      color="success"
                      className="text-white"
                    >
                      <Button
                        onClick={() => handleStatusUpdate(salesReport)}
                        className="text-white"
                      >
                        Mark As Paid
                      </Button>
                      <Button
                        onClick={() => handleDownloadReport(salesReport)}
                        className="text-white"
                      >
                        Download
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ) : (
                []
              )
            ) : allSalesReport ? (
              allSalesReport?.map((report) => (
                <TableRow key={report?._id}>
                  <TableCell>
                    <div className="flex justify-start items-center gap-3">
                      <h3>{report?._id}</h3>
                    </div>
                  </TableCell>
                  <TableCell>{report?.artistEmail}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-3 items-center">
                      <div className="p-2 border-r-2">
                        <p className="underline">Artist</p>
                        <p className="font-semibold">
                          ${processSalesReport(report)?.totalArtistProfit}
                        </p>
                      </div>
                      <div className="p-2 border-r-2">
                        <p className="underline">Website</p>
                        <p className="font-semibold">
                          ${processSalesReport(report)?.totalWebsiteProfit}
                        </p>
                      </div>

                      <div className="p-2">
                        <p className="underline">Prison</p>
                        <p className="font-semibold">
                          ${processSalesReport(report)?.totalPrisonProfit}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{report?.status}</TableCell>
                  <TableCell>
                    <ButtonGroup size="sm" color="success">
                      <Button
                        onClick={() => handleStatusUpdate(report)}
                        className="text-white"
                      >
                        Mark As Paid
                      </Button>
                      <Button
                        onClick={() => handleDownloadReport(report)}
                        className="text-white"
                      >
                        Download
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              []
            )}
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
                <PDFGenerator salesReport={reportToDownload}></PDFGenerator>
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
