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
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";

const ManageBanners = () => {
  const [bannerImages, isBannerImagesLoading, refetch] = useBannerImages();
  const [imageToShow, setImageToShow] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const deleteFunc = (img) => {
    axios
      .patch(`https://mbb-e-commerce-server.vercel.app/banner-image-delete`, {
        img,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success("Image Deleted");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleImageDelete = (img) => {
    toast((t) => (
      <span>
        Do You Want To Delete This Image?
        <ButtonGroup variant="solid" radius="none" size="sm">
          <Button
            className="px-9 mt-3 float-right  text-white"
            color="danger"
            onClick={() => {
              deleteFunc(img);
              toast.dismiss(t.id);
            }}
          >
            Yes
          </Button>
          <Button
            className="px-9 mt-3 float-right  text-white"
            color="success"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </Button>
        </ButtonGroup>
      </span>
    ));
  };
  if (isBannerImagesLoading) {
    return <Loader></Loader>;
  }

  const handleImageUpload = () => {
    console.log(selectedFiles);
    if (!(selectedFiles?.length > 0)) {
      return toast.error("Select Images");
    }
    const multipleImages = [...selectedFiles];
    const formData = new FormData();
    console.log(multipleImages);
    multipleImages?.map((file) => {
      formData.append(`files`, file);
    });
    axios
      .post(
        "https://mbb-e-commerce-server.vercel.app/uploadMultiple",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res?.data?.imageUrls) {
          console.log(res.data.imageUrls);

          axios
            .post("https://mbb-e-commerce-server.vercel.app/bannerImage", {
              newImages: res.data.imageUrls,
            })
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                refetch();
                toast.success("Images added");
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="overflow-x-auto w-full md:w-[95%]">
      <div className="flex flex-col  gap-4">
        <div className="flex justify-end p-5 bg-white rounded-xl gap-3 items-end">
          <div className="flex gap-3">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
            <Button
              onClick={handleButtonClick}
              color="primary"
              className="text-white text-sm"
            >
              Add New Images <FaPlus></FaPlus>
            </Button>
            <Button
              onClick={handleImageUpload}
              color="success"
              className="text-white text-sm mb-2"
            >
              Upload
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
                <img className="w-40 h-20" src={image} alt="" />
              </TableCell>
              <TableCell>{image?.slice(0, 100)}</TableCell>
              <TableCell>
                <ButtonGroup size="sm">
                  <Button
                    onClick={() => {
                      setImageToShow(image);
                      onOpen();
                    }}
                    color="success"
                    className="text-white"
                  >
                    Preview
                  </Button>
                  <Button
                    onClick={() => handleImageDelete(image)}
                    color="danger"
                    className="text-white"
                  >
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
              <ModalHeader className="flex flex-col gap-1">Preview</ModalHeader>
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
