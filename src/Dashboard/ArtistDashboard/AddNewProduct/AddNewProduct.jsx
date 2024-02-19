
import { Button, Select, SelectItem } from "@nextui-org/react";

const AddNewProduct = () => {
  const handleAddNewProduct = e => {
    e.preeventDefault()
    const form = e.target;
    const product_name = form.productName.value;
    const product_price = form.productPrice.value;
    const product_quantity = form.productQuantity.value;
  }
  return (
    <div className="w-full  border border-gray-300 rounded-lg">
      <h4 className="p-4 text-xl border-b border-gray-300 font-semibold">
        Add a New Product
      </h4>
      <form className={`p-5`}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              name="productName"
              id="productName"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
              placeholder="Product Name"
              required
            />
          </div>
          <div>
          <Select
      label="Product Category"
      placeholder="Select an category"
      labelPlacement="outside"
      className="w-full"
      variant="bordered"
      radius="sm"
      // disableSelectorIconRotation
      // selectorIcon={<SelectorIcon />}
    >
        <SelectItem key={"Art"} value={"art"}>
          Art
        </SelectItem>
        <SelectItem key={"music"} value={"music"}>
          Music
        </SelectItem>
        <SelectItem key={"Scatch"} value={"Scatch"}>
          Scatch
        </SelectItem>
    </Select></div>
          
          
        </div>
        <div className="grid grid-cols-2 gap-5">
        <div>
            <label htmlFor="productsPhoto">Product Feature photo</label>
            <input
              type="file"
              name="productsPhoto"
              id="productsPhoto"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
              placeholder="Feature photo of your product"
              required
            />
          </div>
        <div>
            <label htmlFor="productsPhoto">Product&apos;s other photos</label>
            <input
              type="file"
              multiple
              name="productsPhoto"
              id="productsPhoto"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
              placeholder="Product Photos"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label htmlFor="productPrice">Product Price</label>
            <input
              type="number"
              name="productPrice"
              min={0}
              id="productPrice"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
              placeholder="Product Price"
              required
            />
          </div>
          <div>
            <label htmlFor="availableQuantity">Available quantity</label>
            <input
              type="number"
              name="availableQuantity"
              min={0}
              id="availableQuantity"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
              placeholder="Available quantity"
              required
            />
          </div>
          <div>
            <label htmlFor="costOfProduct">Cost of Product</label>
            <input
              type="number"
              min={0}
              name="costOfProduct"
              id="costOfProduct"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
              placeholder="Cost of your Product"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="name">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
            placeholder="Description of your products"
            rows={4}
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          color="success"
          radius="full"
          className="text-white mb-2 px-12 bg-green-500"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddNewProduct;
