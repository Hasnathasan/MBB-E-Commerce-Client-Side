import { Avatar, Button, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import "../../../../../node_modules/react-selectize/themes/index.css";
import axios from "axios";
import toast from "react-hot-toast";
import usePopularCategories from "../../../../Hooks/usePopularCategories";
import useArtists from "../../../../Hooks/useArtists";
import CreatableSelect from "react-select/creatable";
import usePopularTags from "../../../../Hooks/usePopularTags";
import useSystemInfo from "../../../../Hooks/useSystemInfo";
const ProductUpdateModal = ({ product, refetchProducts, onClose }) => {
  const [systemInfo] = useSystemInfo();
  console.log(product);
  const [artistData, isArtistsDataLoading] = useArtists();
  const [allCategories, isCategoriesLoading, refetch] = usePopularCategories();
  const [tags, isTagsLoading] = usePopularTags();
  const existingCategories = allCategories?.map((category) => {
    const option = { value: category?.category, label: category.category };
    return option;
  });
  const existingTags = tags?.map((tag) => {
    const option = { value: tag, label: tag };
    return option;
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  console.log(selectedCategories);

  useEffect(() => {
    const productCategories = product?.product_categories?.map((category) => {
      const option = { value: category, label: category };
      return option;
    });
    const productTags = product?.product_tags?.map((tag) => {
      const option = { value: tag, label: tag };
      return option;
    });
    setSelectedCategories(productCategories);
    setSelectedTags(productTags);
  }, [product?.product_categories, product?.product_tags]);
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };
  const handleTagsChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  // Custom function to handle new option creation
  const handleCreateOption = (inputValue) => {
    const newValue = { value: inputValue.toLowerCase(), label: inputValue };
    setSelectedCategories([...selectedCategories, newValue]);
    return newValue; // Return the new option
  };
  const handleCreateOptionForTags = (inputValue) => {
    const newValue = { value: inputValue.toLowerCase(), label: inputValue };
    setSelectedTags([...selectedTags, newValue]);
    return newValue; // Return the new option
  };

  const salePriceRef = useRef(null);
  const regularPriceRef = useRef(null);
  const artistPercentRef = useRef(null);
  const websitePercentRef = useRef(null);
  const prisonPercentRef = useRef(null);
  const costPriceRef = useRef(null);
  const [regularPrice, setRegularPrice] = useState(
    product?.price?.regular_price
  );
  const [salePrice, setSalePrice] = useState(product?.price?.sale_price);
  const [costPrice, setCostPrice] = useState(product?.price?.cost_price);
  const [artist, setArtist] = useState(product?.addedBy);
  const [prison, setPrison] = useState(null);
  const [artistProfit, setArtistProfit] = useState();
  const [artistPercent, setArtistPercent] = useState(
    artistPercentRef?.current?.value
  );
  const [websiteProfit, setWebsiteProfit] = useState();
  const [websitePercent, setWebsitePercent] = useState(
    websitePercentRef?.current?.value
  );
  const [prisonProfit, setPrisonProfit] = useState();
  const [prisonPercent, setPrisonPercent] = useState(
    prisonPercentRef?.current?.value
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function calculateArtistProfit(salePrice, regularPrice, costPrice) {
    const sale = Number(salePrice) || 0.0;
    const regular = Number(regularPrice) || 0.0;
    const cost = Number(costPrice) || 0.0;

    const firstPart =
      ((sale || regular) - cost) * (parseFloat(artistPercent) / 100);
    return parseFloat(firstPart.toFixed(2));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateWebsiteProfit = (salePrice, regularPrice, costPrice) => {
    return regularPrice && costPrice
      ? parseFloat(
          (
            ((salePrice || regularPrice) - costPrice) *
            (parseFloat(websitePercent) / 100)
          ).toFixed(2)
        )
      : 0.0;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculatePrisonProfit = (salePrice, regularPrice, costPrice) => {
    return regularPrice && costPrice
      ? parseFloat(
          (
            ((salePrice || regularPrice) - costPrice) *
            (parseFloat(prisonPercent) / 100)
          ).toFixed(2)
        )
      : 0.0;
  };

  console.log(
    prisonPercent,
    websitePercent,
    artistPercent,
    artistPercentRef?.current?.value
  );

  // Example usage:
  useEffect(() => {
    const selectedArtist =
      artistData?.filter((eachArtist) => eachArtist._id === artist) || [];
    console.log("object", selectedArtist[0]?.billingInfo?.prison?.prison_name);
    setPrison(selectedArtist[0]?.billingInfo?.prison);
    const artistProfit = calculateArtistProfit(
      salePrice,
      regularPrice,
      costPrice
    );
    setArtistProfit(artistProfit);
    const websiteProfit = calculateWebsiteProfit(
      salePrice,
      regularPrice,
      costPrice
    );
    console.log(websiteProfit);
    setWebsiteProfit(websiteProfit);
    const prisonProfit = calculatePrisonProfit(
      salePrice,
      regularPrice,
      costPrice
    );
    setPrisonProfit(prisonProfit);
    setArtistPercent(artistPercentRef.current.value);
    setWebsitePercent(websitePercentRef.current.value);
    setPrisonPercent(prisonPercentRef.current.value);
  }, [
    artist,
    artistData,
    calculateArtistProfit,
    calculatePrisonProfit,
    calculateWebsiteProfit,
    costPrice,
    regularPrice,
    salePrice,
  ]);
  console.log(artistProfit, websiteProfit, prisonProfit);
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const product_name = form.product_name.value;
    const available_quantity = parseInt(form.available_quantity.value);
    const featured_photo_file = form.featured_photo.files[0];
    const gallery_photos_files = form.gallery_photos.files;
    const multipleImages = [...gallery_photos_files];
    const description = form.description.value;
    const regular_price = parseFloat(form.regular_price.value);
    const sale_price = parseFloat(form.sale_price.value);
    const cost_price = parseFloat(form.cost_price.value);
    const artist_percentage = parseFloat(form.artist_percentage.value);
    const website_percentage = parseFloat(form.website_percentage.value);
    const prison_percentage = parseFloat(form.prison_percentage.value);
    const addedBy = artist;
    const prison_of_artist = prison?.prison_email;
    const product_tags = selectedTags.map((option) => option.value);

    const product_categories = selectedCategories?.map(
      (option) => option.value
    );

    const firstFormData = new FormData();
    firstFormData.append("file", featured_photo_file);

    try {
      let featured_photo = null;
      let gallery_photos = null;

      // Upload featured photo if available
      if (featured_photo_file) {
        const response = await axios.post(
          "https://mbb-e-commerce-server.vercel.app/uploadSingle",
          firstFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        featured_photo = response.data.url;
      }

      // Upload gallery photos if available
      if (multipleImages.length > 0) {
        const secondFormData = new FormData();
        multipleImages.forEach((file) => {
          secondFormData.append(`files`, file);
        });
        const response = await axios.post(
          "https://mbb-e-commerce-server.vercel.app/uploadMultiple",
          secondFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        gallery_photos = response.data?.imageUrls;
      }

      // Update product
      const productUpdateData = {
        product_name,
        available_quantity,
        product_tags,
        product_categories,
        description,
        profit_distribution: {
          artist_profit_details: {
            artist_percentage,
            artistProfit,
            artistTotal: artistProfit + cost_price,
          },
          website_profit_details: {
            website_percentage,
            websiteProfit,
          },
          prison_profit_details: {
            prison_percentage,
            prisonProfit,
          },
        },
        price: { regular_price, sale_price, cost_price },
        addedBy,
        prison_of_artist,
      };

      if (featured_photo) {
        productUpdateData.featured_photo = featured_photo;
      }
      if (gallery_photos) {
        productUpdateData.gallery_photos = gallery_photos;
      }
      console.log(productUpdateData);
      const response = await axios.patch(
        `https://mbb-e-commerce-server.vercel.app/updateProducts/${product?._id}`,
        productUpdateData
      );

      console.log(response.data);
      form.reset();
      refetchProducts();
      onClose();
      toast.success("Product inserted successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("An Error Occurred while uploading product");
    }
  };

  return (
    <div className="w-[98%] mx-auto">
      <form onSubmit={handleUpdateProduct} className={``}>
        <div className="border border-gray-300 rounded-lg mb-8">
          <h4 className="p-4 text-xl border-b border-gray-300 font-semibold">
            Product Information
          </h4>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="product_name">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  placeholder="Product Name"
                  required
                  defaultValue={product?.product_name}
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
                  defaultValue={product?.available_quantity}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div>
                <label htmlFor="product_categories">Product Categories</label>
                <CreatableSelect
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  options={existingCategories}
                  isMulti
                  isClearable
                  onCreateOption={handleCreateOption} // Handle creation of new options
                />
              </div>
              <div>
                <label htmlFor="product_tags">Product Tags</label>
                <CreatableSelect
                  value={selectedTags}
                  onChange={handleTagsChange}
                  options={existingTags}
                  isMulti
                  isClearable
                  onCreateOption={handleCreateOptionForTags} // Handle creation of new options
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="featured_photo">
                  Select new Feature photo (optional)
                </label>
                <input
                  type="file"
                  name="featured_photo"
                  id="featured_photo"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
                  placeholder="Feature photo of your product"
                />
              </div>
              <div>
                <label htmlFor="gallery_photos">
                  Select new gallery photos (optional)
                </label>
                <input
                  type="file"
                  multiple
                  name="gallery_photos"
                  id="gallery_photos"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
                  placeholder="Product Photos"
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
                defaultValue={product?.description}
              />
            </div>
          </div>
        </div>

        {!isArtistsDataLoading && (
          <div className="border border-gray-300 mb-8 rounded-lg">
            <h4 className="p-4 text-xl border-b border-gray-300 font-semibold">
              Seller Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10 justify-center items-center p-5">
              <Select
                items={artistData}
                label="Select An Artist"
                placeholder="Select an Artist"
                labelPlacement="outside"
                className="w-full"
                onChange={(e) => setArtist(e.target.value)}
                defaultSelectedKeys={[product?.addedBy]}
              >
                {(artist) => (
                  <SelectItem
                    key={artist._id}
                    variant="bordered"
                    textValue={artist?.userName}
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
              <div>
                <label htmlFor="prison_of_artist">Company / Organization</label>
                <input
                  type="text"
                  value={prison?.prison_name}
                  name="prison_of_artist"
                  id="prison_of_artist"
                  className=" border w-full border-gray-300 mb-6 mt-2 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  placeholder="Company / Organization"
                  disabled
                />
              </div>
            </div>
          </div>
        )}

        <div className="border border-gray-300 mb-8 rounded-lg">
          <h4 className="p-4 text-xl border-b border-gray-300 font-semibold">
            Pricing Section
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
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
                defaultValue={product?.price?.regular_price}
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
                defaultValue={product?.price?.sale_price}
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
                defaultValue={product?.price?.cost_price}
              />
            </div>
          </div>
          <div
            className={`${
              product?.price?.regular_price && product?.price?.cost_price
                ? "block"
                : "hidden"
            } px-5`}
          >
            <h2 className="text-lg font-semibold mb-4">Profit Distribution</h2>
            <h4 className="mb-3">
              {(artist &&
                artistData?.find((user) => user.email == artist)?.userName) ||
                "Unknown"}{" "}
              (Artist)
              <span className="relative">
                <input
                  name="artist_percentage"
                  id="artist_percentage"
                  defaultValue={70}
                  className="max-w-16 text-right pr-5 bg-gray-300 outline-none rounded-sm p-1 text-sm"
                  type="number"
                  ref={artistPercentRef}
                  onChange={(e) => setArtistPercent(parseFloat(e.target.value))}
                />
                <span className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
                  %
                </span>
              </span>
              : ${artistProfit} + {costPrice} ={" "}
              {artistProfit + parseFloat(costPrice)}
            </h4>
            <h4 className="mb-3">
              {systemInfo?.[0]?.system_name}{" "}
              <span className="relative">
                <input
                  name="website_percentage"
                  id="website_percentage"
                  defaultValue={15}
                  className="max-w-16 text-right pr-5 bg-gray-300 outline-none rounded-sm p-1 text-sm"
                  type="number"
                  ref={websitePercentRef}
                  onChange={(e) =>
                    setWebsitePercent(parseFloat(e.target.value))
                  }
                />
                <span className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
                  %
                </span>
              </span>
              : ${websiteProfit}
            </h4>
            <h4 className="mb-3">
              {prison?.prison_name || "Unknown"} (Prison)
              <span className="relative">
                <input
                  name="prison_percentage"
                  id="prison_percentage"
                  defaultValue={15}
                  className="max-w-16 text-right pr-5 bg-gray-300 outline-none rounded-sm p-1 text-sm"
                  type="number"
                  ref={prisonPercentRef}
                  onChange={(e) => setPrisonPercent(parseFloat(e.target.value))}
                />
                <span className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
                  %
                </span>
              </span>
              : ${prisonProfit}
            </h4>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          color="success"
          radius="full"
          className="text-white mb-2 px-12 bg-green-500"
        >
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default ProductUpdateModal;
