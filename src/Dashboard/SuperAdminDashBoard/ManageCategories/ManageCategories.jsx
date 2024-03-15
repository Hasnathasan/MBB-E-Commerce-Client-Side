import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
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
    User,
    useDisclosure,
  } from "@nextui-org/react";
  import { FaArrowDown, FaPlus, FaSearch } from "react-icons/fa";
  import axios from "axios";
  import toast, { Toaster } from "react-hot-toast";
import usePopularCategories from "../../../Hooks/usePopularCategories";
  
  const ManageCategories = () => {
    const [categories, isCategoriesLoading] = usePopularCategories();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const hangleCategoryAdding = (e) => {
      e.preventDefault();
      const form = e.target;
      const category = form.category.value;
      const imageFile = form.image.files[0];
      const formData = new FormData();
      formData.append("file",imageFile)
      const category_details = {
        category,imageFile
      };
      console.log(category_details);
      axios
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
          console.log(res.data);
          if (res.data.url) {
            axios.post("https://mbb-e-commerce-server.vercel.app/uploadSingle")
          }
        })
        .catch((error) => {
          return toast.error(
            error?.response?.data?.message || "An Unknown Error Occurred"
          );
        });
    };
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
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<FaArrowDown></FaArrowDown>} variant="flat">
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={["data"]}
                  selectionMode="multiple"
                >
                  <DropdownItem key={"data"} className="capitalize">
                    Data
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<FaArrowDown></FaArrowDown>} variant="flat">
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={["hi"]}
                  selectionMode="multiple"
                >
                  <DropdownItem key={"hi"} className="capitalize">
                    Hi
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category?.category}>
                <TableCell>
                  <img src={category.image} className="w-16 h-16" alt="" />
                </TableCell>
                <TableCell className="capitalize">
                    {category?.category}
                </TableCell>
                <TableCell>
                    {category?.count} product's found
                </TableCell>
                <TableCell className="text-center">
                <ButtonGroup size="sm">
      <Button>Update</Button>
      <Button>Delete</Button>
    </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
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
                  <form onSubmit={hangleCategoryAdding} className="p-5">
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
        <Toaster></Toaster>
      </div>
    );
  };
  
  export default ManageCategories;
  