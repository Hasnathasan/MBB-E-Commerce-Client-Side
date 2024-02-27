import { Avatar, Button, Select, SelectItem } from "@nextui-org/react";
import { useRef, useState } from "react";
import { MultiSelect } from "react-selectize";
import "../../../../node_modules/react-selectize/themes/index.css";
import useArtists from "../../../Hooks/useArtists";
import usePrisons from "../../../Hooks/usePrisons";
const AddNewProductForAdmin = () => {
  const [artistData, isArtistsDataLoading] = useArtists();
  const [prisonsData, isPrisonsDataLoading] = usePrisons();
  const [tags, setTags] = useState(
    [].map((str) => ({ label: str, value: str }))
  );
  const [categories, setCategories] = useState(
    [].map((str) => ({ label: str, value: str }))
  );
  const regularPriceRef = useRef(null);
  const salePriceRef = useRef(null);
  const costPriceRef = useRef(null);
  const [regularPrice, setRegularPrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [costPrice, setCostPrice] = useState();
  const [artist, setArtist] = useState(null);
  const [prison, setPrison] = useState(null);

  
  // const handleAddNewProduct = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const product_name = form.productName.value;
  //   const product_price = form.productPrice.value;
  //   const product_quantity = form.productQuantity.value;
  // };
  console.log(tags, categories, regularPrice, prison, artist);



  const handleProductAdding = e => {
    e.preventDefault();
    const form = e.target;
    const product_name = form.product_name.value;
    const featured_photo = form.featured_photo.files;
    const gallery_photos = form.gallery_photos.files;
    const description = form.description.value;
    const regular_price = form.regular_price.value;
    const sale_price = form.sale_price.value;
    const cost_price = form.cost_price.value;
    const addedBy = artist;
    const prison_of_artist = prison;
    const product_tags = tags.map(tag => tag.label);
    const product_categories = categories.map(category => category.label);
    console.log(product_name, featured_photo, gallery_photos, product_tags, product_categories);
  }

  if(isArtistsDataLoading || isPrisonsDataLoading){
    return <h1>Loading</h1>
  }
  return (
    <div className="w-[95%] mx-auto">
      
      <form onSubmit={handleProductAdding} className={``}>
        <div className="border border-gray-300 rounded-lg mb-8">
      <h4 className="p-4 text-xl border-b border-gray-300 font-semibold">
        Add a New Product
      </h4>
        <div className="p-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="product_name">Product Name</label>
            <input
              type="text"
              name="product_name"
              id="product_name"
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
                  .filter(
                    (text) => !values.some((item) => item.label === text.trim())
                  )
                  .map((text) => ({ label: text.trim(), value: text.trim() }));
              }}
              restoreOnBackspace={(item) => item.label}
              onValuesChange={(categories) => setCategories(categories)}
              createFromSearch={(options, values, search) => {
                const labels = values.map((value) => value.label);
                if (
                  search.trim().length === 0 ||
                  labels.includes(search.trim())
                )
                  return null;
                return { label: search.trim(), value: search.trim() };
              }}
              renderNoResultsFound={(values, search) => (
                <div className="no-results-found">
                  {(() => {
                    if (search.trim().length === 0)
                      return "Type a few characters to create a Category";
                    else if (
                      values.some((item) => item.label === search.trim())
                    )
                      return "Tag already exists";
                  })()}
                </div>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <label htmlFor="featured_photo">Product Feature photo</label>
            <input
              type="file"
              name="featured_photo"
              id="featured_photo"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
              placeholder="Feature photo of your product"
              required
            />
          </div>
          <div>
            <label htmlFor="gallery_photos">Gallery photos</label>
            <input
              type="file"
              multiple
              name="gallery_photos"
              id="gallery_photos"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
              placeholder="Product Photos"
              required
            />
          </div>
          <div>
            <label htmlFor="product_tags">Tags</label>
            <MultiSelect
              values={tags}
              delimiters={[188]}
              valuesFromPaste={(options, values, pastedText) => {
                return pastedText
                  .split(",")
                  .filter(
                    (text) => !values.some((item) => item.label === text.trim())
                  )
                  .map((text) => ({ label: text.trim(), value: text.trim() }));
              }}
              restoreOnBackspace={(item) => item.label}
              onValuesChange={(tags) => setTags(tags)}
              createFromSearch={(options, values, search) => {
                const labels = values.map((value) => value.label);
                if (
                  search.trim().length === 0 ||
                  labels.includes(search.trim())
                )
                  return null;
                return { label: search.trim(), value: search.trim() };
              }}
              renderNoResultsFound={(values, search) => (
                <div className="no-results-found">
                  {(() => {
                    if (search.trim().length === 0)
                      return "Type a few characters to create a tag";
                    else if (
                      values.some((item) => item.label === search.trim())
                    )
                      return "Tag already exists";
                  })()}
                </div>
              )}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
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
       <div className="border border-gray-300 mb-8 rounded-lg">
       <h4 className="p-4 text-xl border-b border-gray-300 font-semibold">
        Pricing Section
      </h4>
        <div className="grid grid-cols-3 gap-5 p-5">
          <div>
            <label htmlFor="regular_price">Regular Price</label>
            <input
              ref={regularPriceRef}
              onChange={() => setRegularPrice(regularPriceRef?.current?.value)}
              type="number"
              name="regular_price"
              min={0}
              id="regular_price"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
              placeholder="Product's regular Price"
              required
            />
          </div>
          <div>
            <label htmlFor="sale_price">Sale Price</label>
            <input
              ref={salePriceRef}
              onChange={() => setSalePrice(salePriceRef?.current?.value)}
              type="number"
              name="sale_price"
              min={0}
              id="sale_price"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
              placeholder="Product's sale Price"
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
            <label htmlFor="cost_price">Cost of Product</label>
            <input
              ref={costPriceRef}
              onChange={() => setCostPrice(costPriceRef?.current?.value)}
              type="number"
              min={0}
              name="cost_price"
              id="cost_price"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
              placeholder="Cost of your Product"
              required
            />
          </div>
        </div>
        <div className={`${regularPrice && costPrice ? "block" : "hidden"} px-5`}>
          <h2 className="text-lg font-semibold mb-4">Profit Distribution</h2>
          <h4 className="mb-3">
            Artist(you){" "}
            <span className="relative">
              <input
                defaultValue={70}
                className="max-w-16 text-right pr-5 bg-gray-300 outline-none rounded-sm p-1 text-sm"
                disabled
                type="number"
              />
              <span className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
                %
              </span>
            </span>
            : ${ regularPrice && costPrice ? ((((salePrice || regularPrice) - costPrice) * 0.7).toFixed(2)) : 0.00} + ${costPrice || 0.00} (cost) = ${ (regularPrice && costPrice) ? Number((((Number(salePrice) || Number(regularPrice)) - Number(costPrice)) * 0.7) + Number(costPrice)).toFixed(2) : '0.00'}
          </h4>
          <h4 className="mb-3">
            MBB{" "}
            <span className="relative">
              <input
                defaultValue={15}
                className="max-w-16 text-right pr-5 bg-gray-300 outline-none rounded-sm p-1 text-sm"
                disabled
                type="number"
              />
              <span className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
                %
              </span>
            </span>
            : ${regularPrice && costPrice ?((((salePrice || regularPrice) - costPrice) * 0.15).toFixed(2)) : 0.00}
          </h4>
          <h4 className="mb-3">
            Prison{" "}
            <span className="relative">
              <input
                defaultValue={15}
                className="max-w-16 text-right pr-5 bg-gray-300 outline-none rounded-sm p-1 text-sm"
                disabled
                type="number"
              />
              <span className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
                %
              </span>
            </span>
            : ${regularPrice && costPrice ?((((salePrice || regularPrice) - costPrice) * 0.15).toFixed(2)): 0.00}
          </h4>
        </div>
       </div>

        <div className="border border-gray-300 mb-8 rounded-lg">
        <h4 className="p-4 text-xl border-b border-gray-300 font-semibold">
        Seller Information
      </h4>
          <div className="grid grid-cols-2 w-full gap-10 justify-center items-center p-5">
          <Select
      items={artistData}
      label="Assign to an Artist"
      placeholder="Select a user"
      labelPlacement="outside"
      className="w-full"
      onChange={e => setArtist(e.target.value)}
    >
      {(artist) => (
        <SelectItem key={artist.email} variant="bordered" textValue={artist?.email}>
          <div className="flex gap-2 items-center">
            <Avatar alt={artist?.prison_name} className="flex-shrink-0" size="sm" src={artist?.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{artist?.name}</span>
              <span className="text-tiny text-default-400">{artist?.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
    <Select
      items={prisonsData}
      label="Assign to a Prison/Organization"
      placeholder="Select a prison"
      labelPlacement="outside"
      className="w-full"
      onChange={e => setPrison(e.target.value)}
    >
      {(prison) => (
        <SelectItem key={prison?.email} variant="bordered" textValue={prison?.email}>
          <div className="flex gap-2 items-center">
            <Avatar alt={prison?.prison_name} className="flex-shrink-0" size="sm" src={prison?.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{prison?.prison_name}</span>
              <span className="text-tiny text-default-400">{prison?.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
          </div>
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

export default AddNewProductForAdmin;
