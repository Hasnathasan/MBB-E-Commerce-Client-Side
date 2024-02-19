import useUser from "../../../Hooks/useUser";

const AddNewProduct = () => {
  const [userData] = useUser();
  return <div className="w-full  border border-gray-300 rounded-lg">
    <h4 className="p-4 text-xl border-b border-gray-300 font-semibold">Add a New Product</h4>
    <div className={`p-5`}>
          <div className="">
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
                <label htmlFor="productsPhoto">
                  Products photos
                </label>
                <input
                  type="file"
                  multiple
                  name="productsPhoto"
                  id="productsPhoto"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
                  placeholder="Products Photo"
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
                <label htmlFor="availableQuantity">
                  Available quantity
                </label>
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
                <label htmlFor="costOfProduct">
                  Cost of Product
                </label>
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
            
           
            
          </div>
        </div>
  </div>;
};

export default AddNewProduct;
