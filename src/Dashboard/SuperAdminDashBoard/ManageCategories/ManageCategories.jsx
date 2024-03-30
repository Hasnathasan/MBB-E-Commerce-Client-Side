import {
  Button,
  ButtonGroup,
  Input,
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
import { FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import usePopularCategories from "../../../Hooks/usePopularCategories";
import { useState } from "react";

const ManageCategories = () => {
  const [categories, , refetch] = usePopularCategories();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onOpenChange: onUpdateOpenChange,
  } = useDisclosure();
  const handleModalOpen = (category) => {
    setCategoryToUpdate(category);
    onUpdateOpen();
  };
  const handleCategoryDelete = (category) => {
    axios
      .delete(
        `https://mbb-e-commerce-server.vercel.app/deleteCategory/${category}`
      )
      .then((res) => {
        if (res.data.deletedCategory.deletedCount > 0) {
          refetch();
          toast.success("Category Deleted from All Products");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleCategoryUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const imageFile = form.image.files[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      axios
        .post(
          "https://mbb-e-commerce-server.vercel.app/uploadSingle",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.url) {
            console.log(res.data.url, "Image");
            const updatedCategoryData = {
              category,
              image: res.data.url,
              id: categoryToUpdate?._id,
              previous_category: categoryToUpdate?.category,
            };
            axios
              .patch(
                "https://mbb-e-commerce-server.vercel.app/updateCategories",
                updatedCategoryData
              )
              .then((res) => {
                if (res.data.updatedCategory?.modifiedCount > 0) {
                  console.log(res.data);
                  refetch();
                  form.reset;
                  toast.success("Product Category Updated");
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((err) => console.log(err));
    } else {
      const updatedCategoryData = {
        category,
        image: undefined,
        id: categoryToUpdate?._id,
        previous_category: categoryToUpdate?.category,
      };
      axios
        .patch(
          "https://mbb-e-commerce-server.vercel.app/updateCategories",
          updatedCategoryData
        )
        .then((res) => {
          if (res.data.updatedCategory?.modifiedCount > 0) {
            refetch();
            form.reset;
            toast.success("Product Category Updated");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleCategoryAdding = (e, onClose) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const imageFile = form.image.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    const category_details = {
        category,
    };
    console.log(category_details);

    const uploadAndAddCategory = () => {
        return axios.post("https://mbb-e-commerce-server.vercel.app/uploadSingle", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.url) {
                    category_details.image = res.data.url;
                    return axios.post("https://mbb-e-commerce-server.vercel.app/categories", category_details)
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.insertedId) {
                              refetch()
                              onClose()
                                return res.data;
                            }
                        })
                        .catch((error) => {
                            throw error;
                        });
                }
            })
            .catch((error) => {
                throw error;
            });
    };

    const categoryPromise = uploadAndAddCategory();

    toast.promise(categoryPromise, {
        loading: 'Adding category, please wait...',
        success: 'Product Category Added',
        error: (error) => {
            return error?.response?.data?.message || "An Unknown Error Occurred";
        },
    });
};
  // const hangleCategoryAdding = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const category = form.category.value;
  //   const imageFile = form.image.files[0];
  //   const formData = new FormData();
  //   formData.append("file", imageFile);
  //   const category_details = {
  //     category,
  //   };
  //   console.log(category_details);
  //   axios
  //     .post("https://mbb-e-commerce-server.vercel.app/uploadSingle", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data.url) {
  //         category_details.image = res.data.url;
  //         axios
  //           .post(
  //             "https://mbb-e-commerce-server.vercel.app/categories",
  //             category_details
  //           )
  //           .then((res) => {
  //             console.log(res.data);
  //             if (res.data.insertedId) {
  //               toast.success("Product Category Added");
  //             }
  //           })
  //           .catch((error) => console.log(error));
  //       }
  //     })
  //     .catch((error) => {
  //       return toast.error(
  //         error?.response?.data?.message || "An Unknown Error Occurred"
  //       );
  //     });
  // };
  return (
    <div className="overflow-x-auto w-full md:w-[95%]">
      <div className="flex flex-col  gap-4">
        <div className="flex justify-between p-5 bg-white rounded-xl gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<FaSearch></FaSearch>}
          />
          <div className="flex gap-3">
            <Button
              onPress={onOpen}
              color="primary"
              endContent={<FaPlus></FaPlus>}
            >
              Add New
            </Button>
          </div>
        </div>
        <span className="text-gray-600 mb-2">
          Total {categories?.length} Categories
        </span>
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          <TableColumn>Category Image</TableColumn>
          <TableColumn>Category Name</TableColumn>
          <TableColumn>Total Product's found</TableColumn>
          <TableColumn className="text-center">Action's</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Category Available"}>
          {categories?.length > 0
            ? categories?.map((category) => (
                <TableRow key={category?.category}>
                  <TableCell>
                    <img src={category.image} className="w-16 h-16" alt="" />
                  </TableCell>
                  <TableCell className="capitalize">
                    {category?.category}
                  </TableCell>
                  <TableCell>{category?.count || 0} product's found</TableCell>
                  <TableCell className="text-center">
                    <ButtonGroup size="sm">
                      <Button onClick={() => handleModalOpen(category)}>
                        Update
                      </Button>
                      <Button
                        onClick={() => handleCategoryDelete(category?.category)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
      <Modal
        size="2xl"
        backdrop="opaque"
        className="!z-50"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Category
              </ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => handleCategoryAdding(e, onClose)} className="p-5">
                  <div>
                    <label htmlFor="image">Category Image</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                      placeholder="Category Image"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category">Category Name</label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                      placeholder="Category Name"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    color="success"
                    radius="full"
                    className="text-white mb-2 px-12 bg-green-500"
                  >
                    Add Category
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
                Update Category
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleCategoryUpdate} className="p-5">
                  <div>
                    <label htmlFor="image">Category Image</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                      placeholder="Category Image"
                    />
                  </div>
                  <div>
                    <label htmlFor="category">Category Name</label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                      placeholder="Category Name"
                      defaultValue={categoryToUpdate?.category}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    color="success"
                    radius="full"
                    className="text-white mb-2 px-12 bg-green-500"
                  >
                    Update Category
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
    </div>
  );
};

export default ManageCategories;
