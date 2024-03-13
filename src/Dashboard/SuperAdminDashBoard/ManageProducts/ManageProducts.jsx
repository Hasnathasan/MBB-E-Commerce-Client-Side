import {
  Button,
  Chip,
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
import product1 from "../../../assets/products1.png";
import product2 from "../../../assets/products2.png";
import product3 from "../../../assets/products3.png";
import product4 from "../../../assets/products4.png";
import product5 from "../../../assets/products5.png";
import product6 from "../../../assets/products6.png";
import product7 from "../../../assets/products7.jpg";
import product8 from "../../../assets/products8.png";
import product9 from "../../../assets/products9.png";
import product10 from "../../../assets/products10.png";
import AddNewProductForAdmin from "../AddNewProductForAdmin/AddNewProductForAdmin";
import { Toaster } from "react-hot-toast";
import useProducts from "../../../Hooks/useProducts";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const ManageProducts = () => {
  const { categoryFilter, priceSlider, minRating, searchQuery } =
    useContext(AuthContext);
  const [products, isProductsLoading, refetch] = useProducts({
    categoryFilter,
    priceSlider,
    minRating,
    searchQuery,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (isProductsLoading) {
    return <h1>Loading.....</h1>;
  }
  return (
    <div className="overflow-x-auto w-[95%] mx-auto">
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
          Total {products?.length} Products
        </span>
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Added By</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Rating</TableColumn>
          <TableColumn>Details</TableColumn>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.name}>
              <TableCell>
                <div className="flex justify-start items-center gap-3">
                  <img
                    src={product?.featured_photo}
                    className="w-12 h-12"
                    alt=""
                  />
                  <h3>{product?.product_name}</h3>
                </div>
              </TableCell>
              <TableCell>{product?.addedBy}</TableCell>
              <TableCell>
                ${product?.price?.sale_price || product?.price?.regular_price}
              </TableCell>
              <TableCell>{product?.rating}</TableCell>
              <TableCell>
                <Button color="success" radius="lg" className="text-white">
                  View Details
                </Button>
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
                Add a New Product
              </ModalHeader>
              <ModalBody>
                <AddNewProductForAdmin refetchProducts={refetch}></AddNewProductForAdmin>
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
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ManageProducts;
