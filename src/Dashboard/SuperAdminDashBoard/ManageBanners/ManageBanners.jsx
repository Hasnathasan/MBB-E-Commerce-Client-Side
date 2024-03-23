import {
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
  } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import useBannerImages from "../../../Hooks/useBannerImages";
import { useState } from "react";

const ManageBanners = () => {
    const [bannerImages, isBannerImagesLoading, refetch] = useBannerImages();
    const [imageToShow, setImageToShow] = useState();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleImageDelete = img => {
        console.log(img);
    }
    
    return (
        <div className="overflow-x-auto w-full md:w-[95%]">
      <div className="flex flex-col  gap-4">
        <div className="flex justify-between p-5 bg-white rounded-xl gap-3 items-end">
          
          <div className="flex gap-3">
            
            <Button color="primary" endContent={<FaPlus></FaPlus>}>
              Add Images
            </Button>
          </div>
        </div>
        <span className="text-gray-600 mb-2">
          Total {bannerImages[0]?.images?.length} Images
        </span>
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          <TableColumn>Preview</TableColumn>
          <TableColumn>Link</TableColumn>
          <TableColumn>
            <h5 className="text-center">Action</h5>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {bannerImages[0]?.images?.map((image) => (
            <TableRow key={image}>
              <TableCell>
                <img className="w-40" src={image} alt="" />
              </TableCell>
              <TableCell>
                {image?.slice(0,100)}
              </TableCell>
              <TableCell>
                <ButtonGroup>
                <Button onClick={ () => {
                    setImageToShow(image)
                    onOpen()
                }} color="success" radius="lg" className="text-white">
                  Preview
                </Button>
                <Button onClick={() => handleImageDelete(image)} color="danger" className="text-white">
                Delete
              </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
                    Preview
                  </ModalHeader>
                  <ModalBody>
                    <img src={imageToShow} alt="" />
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

export default ManageBanners;