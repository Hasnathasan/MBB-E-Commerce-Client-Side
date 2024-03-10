import { Avatar, Button, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { MultiSelect } from "react-selectize";
import "../../../../node_modules/react-selectize/themes/index.css";
import useArtists from "../../../Hooks/useArtists";
import usePrisons from "../../../Hooks/usePrisons";
import axios from "axios";
import toast from "react-hot-toast";
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
const [artistProfit, setArtistProfit] = useState();
const [websiteProfit, setWebsiteProfit] = useState();
const [prisonProfit, setPrisonProfit] = useState();
  console.log(tags, categories, regularPrice, prison, artist);
  function calculateArtistProfit(salePrice, regularPrice, costPrice) {
    const sale = Number(salePrice) || 0.0;
    const regular = Number(regularPrice) || 0.0;
    const cost = Number(costPrice) || 0.0;

    const firstPart = ((sale || regular) - cost) * 0.7;

    return firstPart.toFixed(2)
}
const calculateWebsiteProfit = (salePrice, regularPrice, costPrice) => {
  return regularPrice && costPrice
      ? (((salePrice || regularPrice) - costPrice) * 0.15).toFixed(2)
      : 0.0;
};

const calculatePrisonProfit = (salePrice, regularPrice, costPrice) => {
  return regularPrice && costPrice
      ? (((salePrice || regularPrice) - costPrice) * 0.15).toFixed(2)
      : 0.0;
};






// Example usage:
useEffect(() => {
  const artistProfit = calculateArtistProfit(salePrice, regularPrice, costPrice);
  setArtistProfit(artistProfit)
  const websiteProfit = calculateWebsiteProfit(salePrice, regularPrice, costPrice);
  setWebsiteProfit(websiteProfit);
  const prisonProfit = calculatePrisonProfit(salePrice, regularPrice, costPrice);
  setPrisonProfit(prisonProfit)
},[costPrice, regularPrice, salePrice])
console.log(artistProfit, websiteProfit, prisonProfit);
  const handleProductAdding = (e) => {
    e.preventDefault();
    const form = e.target;
    const product_name = form.product_name.value;
    const available_quantity = form.available_quantity.value;
    const featured_photo_file = form.featured_photo.files[0];
    const gallery_photos_files = form.gallery_photos.files;
    const multipleImages = [...gallery_photos_files];
    const description = form.description.value;
    const regular_price = parseFloat(form.regular_price.value);
    const sale_price = parseFloat(form.sale_price.value);
    const cost_price = parseFloat(form.cost_price.value);
    const addedBy = artist;
    const prison_of_artist = prison;
    const product_tags = tags.map((tag) => tag.label);
    const product_categories = categories.map((category) => category.label);

    const firstFormData = new FormData();
    firstFormData.append('file', featured_photo_file);

      
      
    const uploadAndInsertProduct = () => {
      return axios.post('https://mbb-e-commerce-server.vercel.app/uploadSingle', firstFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
          console.log(response.data);
          if (response.data.url) {
              const featured_photo = response.data.url;
              const secondFormData = new FormData();
              multipleImages.map((file) => {
                  secondFormData.append(`files`, file);
              });
              return axios.post("https://mbb-e-commerce-server.vercel.app/uploadMultiple", secondFormData, {
                  headers: {
                      "Content-Type": "multipart/form-data",
                  },
              }).then((response) => {
                  if (response?.data?.imageUrls) {
                      const gallery_photos = response.data?.imageUrls;
                      const product = {
                          product_name,
                          available_quantity,
                          featured_photo,
                          gallery_photos,
                          product_tags,
                          product_categories,
                          description,
                          rating: 0,
                          reviews: [],
                          price: { regular_price, sale_price, cost_price },
                          addedBy,
                          prison_of_artist,
                          createdAt: new Date()
                      };
                      return axios.post("https://mbb-e-commerce-server.vercel.app/products", product).then((res) => {
                          console.log(res.data);
                          form.reset()
                          return res.data;
                      }).catch((error) => {
                          console.log(error.message);
                          toast.error(`${error?.message}`)
                          throw error;
                      });
                  } else {
                      return Promise.reject(new Error("No upload responses found"));
                  }
              }).catch((error) => {
                  console.log(error.message);
                  toast.error(`${error?.message}`)
                  throw error;
              });
          }
      }).catch((error) => {
          console.log(error.message);
          () => toast.error(`${error?.message}`)
          throw error;
      });
  };
  
  const myPromise = uploadAndInsertProduct();
  
  toast.promise(myPromise, {
      loading: 'Please wait! while uploading product...',
      success: 'Product inserted successfully',
      error: 'An Error Occoured while uploading product',
  });
   
  };

  
  return (
    <div className="w-[98%] mx-auto">
      <form onSubmit={handleProductAdding} className={``}>
        <div className="border border-gray-300 rounded-lg mb-8">
          <h4 className="p-4 text-xl border-b border-gray-300 font-semibold">
            Add a New Product
          </h4>
          <div className="p-5">
            <div className="grid grid-cols-3 gap-3">
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
                        (text) =>
                          !values.some((item) => item.label === text.trim())
                      )
                      .map((text) => ({
                        label: text.trim(),
                        value: text.trim(),
                      }));
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
              <div>
            <label htmlFor="available_quantity">Available quantity</label>
            <input
              type="number"
              name="available_quantity"
              min={0}
              id="available_quantity"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
              placeholder="Available quantity"
              required
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
                        (text) =>
                          !values.some((item) => item.label === text.trim())
                      )
                      .map((text) => ({
                        label: text.trim(),
                        value: text.trim(),
                      }));
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
                onChange={() =>
                  setRegularPrice(regularPriceRef?.current?.value)
                }
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
          <div
            className={`${regularPrice && costPrice ? "block" : "hidden"} px-5`}
          >
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
              : $
              {regularPrice && costPrice
                ? (((salePrice || regularPrice) - costPrice) * 0.7).toFixed(2)
                : 0.0}{" "}
              + ${costPrice || 0.0} (cost) = $
              {regularPrice && costPrice
                ? Number(
                    ((Number(salePrice) || Number(regularPrice)) -
                      Number(costPrice)) *
                      0.7 +
                      Number(costPrice)
                  ).toFixed(2)
                : "0.00"}
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
              : $
              {regularPrice && costPrice
                ? (((salePrice || regularPrice) - costPrice) * 0.15).toFixed(2)
                : 0.0}
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
              : $
              {regularPrice && costPrice
                ? (((salePrice || regularPrice) - costPrice) * 0.15).toFixed(2)
                : 0.0}
            </h4>
          </div>
        </div>



{ !(isArtistsDataLoading || isPrisonsDataLoading) && <div className="border border-gray-300 mb-8 rounded-lg">
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
              onChange={(e) => setArtist(e.target.value)}
            >
              {(artist) => (
                <SelectItem
                  key={artist.email}
                  variant="bordered"
                  textValue={artist?.email}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={artist?.prison_name}
                      className="flex-shrink-0"
                      size="sm"
                      src={artist?.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{artist?.name}</span>
                      <span className="text-tiny text-default-400">
                        {artist?.email}
                      </span>
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
              onChange={(e) => setPrison(e.target.value)}
            >
              {(prison) => (
                <SelectItem
                  key={prison?.email}
                  variant="bordered"
                  textValue={prison?.email}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={prison?.prison_name}
                      className="flex-shrink-0"
                      size="sm"
                      src={prison?.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{prison?.prison_name}</span>
                      <span className="text-tiny text-default-400">
                        {prison?.email}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>
        </div>}
        

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
