import { Button } from "@nextui-org/react";
import { useRef, useState } from "react";
import { MultiSelect } from "react-selectize";
import '../../../../node_modules/react-selectize/themes/index.css'
const AddNewProduct = () => {
  const [tags, setTags] = useState([].map(str => ({ label: str, value: str })));
  const [categories, setCategories] = useState([].map(str => ({ label: str, value: str })));
  const regularPriceRef = useRef(null);
  const salePriceRef = useRef(null);
  const costPriceRef = useRef(null);
  const [regularPrice, setRegularPrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [costPrice, setCostPrice] = useState();
  const handleAddNewProduct = (e) => {
    e.preeventDefault();
    const form = e.target;
    const product_name = form.productName.value;
    const product_price = form.productPrice.value;
    const product_quantity = form.productQuantity.value;
  };
  console.log(tags, categories, regularPrice);
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
            <label htmlFor="category">Product Category</label>
            <MultiSelect
            values={categories}
            delimiters={[188]}
            valuesFromPaste={(options, values, pastedText) => {
                return pastedText
                    .split(",")
                    .filter(text => !values.some(item => item.label === text.trim()))
                    .map(text => ({ label: text.trim(), value: text.trim() }));
            }}
            restoreOnBackspace={item => item.label}
            onValuesChange={categories => setCategories(categories)}
            createFromSearch={(options, values, search) => {
                const labels = values.map(value => value.label);
                if (search.trim().length === 0 || labels.includes(search.trim())) return null;
                return { label: search.trim(), value: search.trim() };
            }}
            renderNoResultsFound={(values, search) => (
                <div className="no-results-found">
                    {(() => {
                        if (search.trim().length === 0) return "Type a few characters to create a Category";
                        else if (values.some(item => item.label === search.trim())) return "Tag already exists";
                    })()}
                </div>
            )}
        />
          </div>
          
        </div>
        <div className="grid grid-cols-3 gap-5">
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
          <div>
            
          <label htmlFor="productPrice">Tags</label>
          <MultiSelect
            values={tags}
            delimiters={[188]}
            valuesFromPaste={(options, values, pastedText) => {
                return pastedText
                    .split(",")
                    .filter(text => !values.some(item => item.label === text.trim()))
                    .map(text => ({ label: text.trim(), value: text.trim() }));
            }}
            restoreOnBackspace={item => item.label}
            onValuesChange={tags => setTags(tags)}
            createFromSearch={(options, values, search) => {
                const labels = values.map(value => value.label);
                if (search.trim().length === 0 || labels.includes(search.trim())) return null;
                return { label: search.trim(), value: search.trim() };
            }}
            renderNoResultsFound={(values, search) => (
                <div className="no-results-found">
                    {(() => {
                        if (search.trim().length === 0) return "Type a few characters to create a tag";
                        else if (values.some(item => item.label === search.trim())) return "Tag already exists";
                    })()}
                </div>
            )}
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
        <h3 className="text-xl font-semibold underline my-4">Pricing Section</h3>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label htmlFor="regularPrice">Regular Price</label>
            <input
            ref={regularPriceRef}
            onChange={() => setRegularPrice(regularPriceRef?.current?.value)}
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
            <label htmlFor="salePrice">Sale Price</label>
            <input
            ref={salePriceRef}
            onChange={() => setSalePrice(salePriceRef?.current?.value)}
              type="number"
              name="productPrice"
              min={0}
              id="productPrice"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
              placeholder="Product Price"
              required
            />
          </div>
          {/* <div>
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
          </div> */}
          <div>
            <label htmlFor="costOfProduct">Cost of Product</label>
            <input
            ref={costPriceRef}
            onChange={() => setCostPrice(costPriceRef?.current?.value)}
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

        <h3 className="text-xl font-semibold my-4">Profit Breakdown</h3>
        <div>
          <h4 className="mb-3">Artist(you) <span className="relative"><input defaultValue={70} className="max-w-16 text-right pr-5 bg-gray-300 outline-none rounded-sm p-1 text-sm" disabled type="number" /><span className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">%</span></span>: ${(((salePrice || regularPrice) - costPrice) * 0.7).toFixed(2)}</h4>
          <h4 className="mb-3">MBB Website <span className="relative"><input defaultValue={15} className="max-w-16 text-right pr-5 bg-gray-300 outline-none rounded-sm p-1 text-sm" disabled type="number" /><span className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">%</span></span>: ${(((salePrice || regularPrice) - costPrice) * 0.15).toFixed(2)}</h4>
          <h4 className="mb-3">Prison <span className="relative"><input defaultValue={15} className="max-w-16 text-right pr-5 bg-gray-300 outline-none rounded-sm p-1 text-sm" disabled type="number" /><span className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">%</span></span>: ${(((salePrice || regularPrice) - costPrice) * 0.15).toFixed(2)}</h4>
        </div>
        

        <Button
        onSubmit={handleAddNewProduct}
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
