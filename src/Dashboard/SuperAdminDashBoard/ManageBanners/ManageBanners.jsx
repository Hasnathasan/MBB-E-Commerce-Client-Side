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
import { Typography } from "@material-tailwind/react";

const ManageBanners = () => {
  const [bannerImages, isBannerImagesLoading, refetch] = useBannerImages();
  const [imageToShow, setImageToShow] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onOpenChange: onUpdateOpenChange,
  } = useDisclosure();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const handleButtonClick = () => {
    onUpdateOpen()
    // fileInputRef.current.click();
  };

  const handleBannerUpload = (e, onClose) => {
    e.preventDefault();
    const form = e.target;
    const link = form.link.value;
    const imageFile = form.image.files[0];
    console.log(imageFile);
    if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadAndAddBanner = () => {
            return axios.post("https://mbb-e-commerce-server.vercel.app/uploadSingle", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    if (res.data.url) {
                        console.log(res.data.url);
                        const banner = {
                            img: res.data.url,
                            link
                        };
                        return axios.post("https://mbb-e-commerce-server.vercel.app/bannerImages", banner)
                            .then(res => {
                                if (res.data.insertedId) {
                                  refetch()
                                    onClose();
                                    return res.data;
                                }
                            })
                            .catch(err => {
                                throw err;
                            })
                    }
                })
                .catch(err => {
                    throw err;
                });
        };

        const bannerPromise = uploadAndAddBanner();

        toast.promise(bannerPromise, {
            loading: 'Uploading banner, please wait...',
            success: 'Banner uploaded successfully',
            error: (error) => {
                return error?.response?.data?.message || "An Unknown Error Occurred";
            },
        });
    }
};

  const deleteFunc = (id) => {
    axios
      .delete(`https://mbb-e-commerce-server.vercel.app/banner-image-delete/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("Image Deleted");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleImageDelete = (id) => {
    toast((t) => (
      <span>
        Do You Want To Delete This Image?
        <ButtonGroup variant="solid" radius="none" size="sm">
          <Button
            className="px-9 mt-3 float-right  text-white"
            color="danger"
            onClick={() => {
              deleteFunc(id);
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
              Add New Banner <FaPlus></FaPlus>
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
          Total {bannerImages?.length || 0} Images
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
          {bannerImages?.map((banner) => (
            <TableRow key={banner?.img}>
              <TableCell>
                <img className="w-40 h-20" src={banner?.img} alt="" />
              </TableCell>
              <TableCell><Typography
                      as="a"
                      href={banner?.link}
                      target="_blank"
                      color="gray"
                      className="py-1.5 font-normal transition-colors text-blue-gray-500 hover:text-blue-gray-900"
                    >
                      {banner?.link?.slice(0,35)}...
                    </Typography></TableCell>
              <TableCell>
                <ButtonGroup size="sm">
                  <Button
                    onClick={() => {
                      setImageToShow(banner?.img);
                      onOpen();
                    }}
                    color="success"
                    className="text-white"
                  >
                    Preview
                  </Button>
                  <Button
                    onClick={() => handleImageDelete(banner?._id)}
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
        size="2xl"
        backdrop="opaque"
        className="!z-50"
        isOpen={isUpdateOpen}
        onOpenChange={onUpdateOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Banner
              </ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => handleBannerUpload(e, onClose)} className="p-5">
                  <div>
                    <label htmlFor="image">Banner Image</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                      placeholder="Banner Image Image"
                    />
                  </div>
                  <div>
                    <label htmlFor="link">Link</label>
                    <input
                      type="text"
                      name="link"
                      id="link"
                      className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                      placeholder="link"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    color="success"
                    radius="full"
                    className="text-white mb-2 px-12 bg-green-500"
                  >
                    Add Banner
                  </Button>
                </form>
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
