import {
  Button,
  ButtonGroup,
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
  useDisclosure,
} from "@nextui-org/react";
import { FaArrowDown, FaPlus, FaSearch } from "react-icons/fa";
import AddNewProductForAdmin from "../AddNewProductForAdmin/AddNewProductForAdmin";
import toast, { Toaster } from "react-hot-toast";
import useProducts from "../../../Hooks/useProducts";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Loader from "../../../Components/Loader/Loader";
import { Link, Outlet, useLocation } from "react-router-dom";
import ProductUpdateModal from "./ProductUpdateModal/ProductUpdateModal";
import axios from "axios";

const ManageProducts = () => {
  const location = useLocation();
  const [productToShow, setProductToShow] = useState();
  const { categoryFilter, priceSlider, minRating, searchQuery, setSearchQuery } =
    useContext(AuthContext);
  const [products, isProductsLoading, refetch] = useProducts({
    categoryFilter,
    priceSlider,
    minRating,
    searchQuery,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isDetailsModalOpen, onOpen: onDetailsModalOpen, onOpenChange: onDetalsModalOpenChange } = useDisclosure();
  const handleProductToShow = product => {
    setProductToShow(product);
    onDetailsModalOpen()
  }
  const deleteFunc = id => {
    axios.delete(`http://localhost:8000/productDelete/${id}`)
    .then(res => {
      console.log(res.data)
      if(res.data.deletedCount > 0){
        refetch()
        toast.success("Product Deleted")
      }
    })
    .catch(err => console.log(err))
  }
  const handleProductDelete = id => {
    toast((t) => (
      <span>
        Do You Want To Delete This Product?
        <ButtonGroup variant="solid" radius="none" size="sm">
        <Button  className="px-9 mt-3 float-right  text-white" color="danger" onClick={() => deleteFunc(id)}>
          Yes
        </Button>
        <Button  className="px-9 mt-3 float-right  text-white" color="success" onClick={() => toast.dismiss(t.id)}>
          No
        </Button>
        </ButtonGroup>
      </span>
    ));

  }
  return (
   <>
   {
    <div className="overflow-x-auto w-[95%] mx-auto">
    <div className="flex flex-col  gap-4">
      <div className="flex justify-between p-5 bg-white rounded-xl gap-3 items-end">
        <Input
          isClearable={false}
          type="text"
          onClear={() => console.log("cleared")}
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name/category..."
          startContent={<FaSearch></FaSearch>}
          onChange={e => setSearchQuery(e.target.value)}
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
        Total {products?.length} Products
      </span>
    </div>
    <Table aria-label="Example table with custom cells">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Added By</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Rating</TableColumn>
        <TableColumn>Action</TableColumn>
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
              <ButtonGroup size="sm" radius="sm">
              <Button onClick={() => handleProductToShow(product)} color="success" className="text-white">
                View Details
              </Button>
              <Button onClick={() => handleProductDelete(product?._id)} color="danger" className="text-white">
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
    <Modal
      scrollBehavior="outside"
      size="5xl"
      backdrop="opaque"
      className="!z-50"
      isOpen={isDetailsModalOpen}
      onOpenChange={onDetalsModalOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add a New Product
            </ModalHeader>
            <ModalBody>
            <ProductUpdateModal onClose={onClose} product={productToShow} refetchProducts={refetch}></ProductUpdateModal>
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
   }
   </>
  );
};

export default ManageProducts;
