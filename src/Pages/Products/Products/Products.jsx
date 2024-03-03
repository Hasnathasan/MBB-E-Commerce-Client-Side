import {
  Accordion,
  AccordionItem,
  Button,
  Radio,
  RadioGroup,
  Slider,
} from "@nextui-org/react";
import { Drawer, Option, Select, Typography } from "@material-tailwind/react";
import PopularProductsCard from "../../Home/PopularProducts/PopularProductsCard";
import { useContext, useState } from "react";
import Rating from "react-rating";
import { IoStarSharp } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import useProducts from "../../../Hooks/useProducts";
import { AuthContext } from "../../../Providers/AuthProvider";
const Products = () => {
  const {categoryFilter, setCategoryFilter} = useContext(AuthContext);
  const [openFilter, setOpenFilter] = useState(false);
  const openFilterDrawer = () => setOpenFilter(true);
  const closeFilterDrawer = () => setOpenFilter(false);

  const [products, isProductsLoading] = useProducts({categoryFilter});
  const [value, setValue] = useState([100, 300]);
  if(isProductsLoading){
    return
  }
  const categories = [...new Set(products?.map(product => product.product_categories).flat().map(item => item.toLowerCase()))];
  console.log(categories);
  return (
    <>
      <div className="grid grid-cols-12 mx-2 lg:mx-8 mt-8 mb-24">
        <div className="col-span-12 lg:hidden">
        <Button onClick={openFilterDrawer} className="text-white bg-green-500" radius="full">
            Filter <LuSettings2 className="w-5 h-5" />
          </Button>
        </div>
        <div className="col-span-3 mr-5 hidden py-4 lg:inline">
          <Button className="text-white bg-green-500" radius="full">
            Filter <LuSettings2 className="w-5 h-5" />
          </Button>
          <Accordion
            itemClasses={{ title: "font-bold text-xl" }}
            selectionMode="multiple"
            defaultExpandedKeys={["1", "2", "3", "4"]}
          >
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="All Categories"
            >
              <RadioGroup
                value={categoryFilter}
                onValueChange={setCategoryFilter}
                color="success"
                className="!mb-5"
              >
                {
                  categories?.map(category => <Radio key={category} value={category}>
                  <Typography className="capitalize" variant="small">{category}</Typography>
                </Radio>)
                }
                
              </RadioGroup>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Price">
              <div className="overflow-hidden pb-2">
                <Slider
                  size="sm"
                  color="success"
                  step={10}
                  maxValue={1000}
                  minValue={0}
                  value={value}
                  onChange={setValue}
                  className="max-w-[100%]"
                />
                <p className="text-default-500 font-medium mt-2 text-small">
                  Price:{" "}
                  <span className="font-medium text-gray-900">
                    {Array.isArray(value) &&
                      value.map((b) => `$${b}`).join(" – ")}
                  </span>
                </p>
              </div>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Rating">
              <RadioGroup color="success" className="!mb-5">
                <Radio className="mb-[1px]" value="rating5">
                  <div className=" flex items-start gap-2">
                    <Rating
                      className="text-orange-600"
                      emptySymbol={
                        <IoStarSharp className="text-gray-400"></IoStarSharp>
                      }
                      fullSymbol={<IoStarSharp></IoStarSharp>}
                      fractions={2}
                      initialRating={5}
                      readonly
                    />
                    <span className="text-sm font-medium">5.0</span>
                  </div>
                </Radio>
                <Radio className="mb-[1px]" value="rating4">
                  <div className=" flex items-start gap-2">
                    <Rating
                      className="text-orange-600"
                      emptySymbol={
                        <IoStarSharp className="text-gray-400"></IoStarSharp>
                      }
                      fullSymbol={<IoStarSharp></IoStarSharp>}
                      fractions={2}
                      initialRating={4}
                      readonly
                    />
                    <span className="text-sm font-medium">4.0 & up</span>
                  </div>
                </Radio>
                <Radio className="mb-[1px]" value="rating3">
                  <div className=" flex items-start gap-2">
                    <Rating
                      className="text-orange-600"
                      emptySymbol={
                        <IoStarSharp className="text-gray-400"></IoStarSharp>
                      }
                      fullSymbol={<IoStarSharp></IoStarSharp>}
                      fractions={2}
                      initialRating={3}
                      readonly
                    />
                    <span className="text-sm font-medium">3.0 & up</span>
                  </div>
                </Radio>
                <Radio className="mb-[1px]" value="rating2">
                  <div className=" flex items-start gap-2">
                    <Rating
                      className="text-orange-600"
                      emptySymbol={
                        <IoStarSharp className="text-gray-400"></IoStarSharp>
                      }
                      fullSymbol={<IoStarSharp></IoStarSharp>}
                      fractions={2}
                      initialRating={2}
                      readonly
                    />
                    <span className="text-sm font-medium">2.0 & up</span>
                  </div>
                </Radio>
                <Radio value="rating1">
                  <div className=" flex items-start gap-2">
                    <Rating
                      className="text-orange-600"
                      emptySymbol={
                        <IoStarSharp className="text-gray-400"></IoStarSharp>
                      }
                      fullSymbol={<IoStarSharp></IoStarSharp>}
                      fractions={2}
                      initialRating={1}
                      readonly
                    />
                    <span className="text-sm font-medium">1.0 & up</span>
                  </div>
                </Radio>
              </RadioGroup>
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Accordion 4"
              title="Popular Tags"
            >
              <div className="flex overflow-hidden h-max flex-wrap items-center gap-2">
                <Button className="text-white bg-[#00B207]" radius="full">
                  Healthy
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Low fat
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Vegetarian
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Kids food
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Vitamin
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Bread
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Meat
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Snacks
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Tiffin
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Lunch
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Dinner
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Breakfast
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Fruits
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="col-span-12 py-4 lg:col-span-9">
          {/* <Outlet></Outlet> */}
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-3 md:items-center">
            <div className="flex justify-center gap-2 items-center">
              <h3 className="text-nowrap text-sm text-gray-700">Sort By:</h3>
              <Select size="sm" label="Select">
                <Option>Newest</Option>
                <Option>Oldest</Option>
                <Option>A to Z</Option>
              </Select>
            </div>
            <h3 className="text-gray-800 text-sm">
              <span className="font-medium !text-gray-900">
                {products?.length}
              </span>{" "}
              Results Found
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:px-5 xl:px-14 sm:col-span-2 md:grid-cols-3 gap-4 lg:gap-5 xl:gap-8 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {products?.map((product) => (
              <PopularProductsCard
                key={product?.name}
                product={product}
                isRounded={true}
              ></PopularProductsCard>
            ))}
          </div>
        </div>
      </div>
      <Drawer
        open={openFilter}
        overlay={false}
        size={300}
        onClose={closeFilterDrawer}
        className="p-4 h-full flex flex-col shadow-large overflow-y-auto"
      >
        <div className="py-4">
          <Accordion
            itemClasses={{ title: "font-bold text-xl" }}
            selectionMode="multiple"
            defaultExpandedKeys={["1", "2", "3", "4"]}
          >
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="All Categories"
            >
              <RadioGroup
                // value={filter}
                // onValueChange={setFilter}
                color="success"
                className="!mb-5"
              >
                <Radio className="mb-[1px]" value="priceHighToLow">
                  <Typography variant="small">Price High to Low</Typography>
                </Radio>
                <Radio className="mb-[1px]" value="priceLowToHigh">
                  <Typography variant="small">Price Low to High</Typography>
                </Radio>
                <Radio className="mb-[1px]" value="ratingHighToLow">
                  <Typography variant="small">Rating High to Low</Typography>
                </Radio>
                <Radio value="ratingLowToHigh">
                  <Typography variant="small">Rating Low to High</Typography>
                </Radio>
              </RadioGroup>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Price">
              <div className="overflow-hidden pb-2">
                <Slider
                  size="sm"
                  color="success"
                  step={10}
                  maxValue={1000}
                  minValue={0}
                  value={value}
                  onChange={setValue}
                  className="max-w-[100%]"
                />
                <p className="text-default-500 font-medium mt-2 text-small">
                  Price:{" "}
                  <span className="font-medium text-gray-900">
                    {Array.isArray(value) &&
                      value.map((b) => `$${b}`).join(" – ")}
                  </span>
                </p>
              </div>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Rating">
              <RadioGroup color="success" className="!mb-5">
                <Radio className="mb-[1px]" value="rating5">
                  <div className=" flex items-start gap-2">
                    <Rating
                      className="text-orange-600"
                      emptySymbol={
                        <IoStarSharp className="text-gray-400"></IoStarSharp>
                      }
                      fullSymbol={<IoStarSharp></IoStarSharp>}
                      fractions={2}
                      initialRating={5}
                      readonly
                    />
                    <span className="text-sm font-medium">5.0</span>
                  </div>
                </Radio>
                <Radio className="mb-[1px]" value="rating4">
                  <div className=" flex items-start gap-2">
                    <Rating
                      className="text-orange-600"
                      emptySymbol={
                        <IoStarSharp className="text-gray-400"></IoStarSharp>
                      }
                      fullSymbol={<IoStarSharp></IoStarSharp>}
                      fractions={2}
                      initialRating={4}
                      readonly
                    />
                    <span className="text-sm font-medium">4.0 & up</span>
                  </div>
                </Radio>
                <Radio className="mb-[1px]" value="rating3">
                  <div className=" flex items-start gap-2">
                    <Rating
                      className="text-orange-600"
                      emptySymbol={
                        <IoStarSharp className="text-gray-400"></IoStarSharp>
                      }
                      fullSymbol={<IoStarSharp></IoStarSharp>}
                      fractions={2}
                      initialRating={3}
                      readonly
                    />
                    <span className="text-sm font-medium">3.0 & up</span>
                  </div>
                </Radio>
                <Radio className="mb-[1px]" value="rating2">
                  <div className=" flex items-start gap-2">
                    <Rating
                      className="text-orange-600"
                      emptySymbol={
                        <IoStarSharp className="text-gray-400"></IoStarSharp>
                      }
                      fullSymbol={<IoStarSharp></IoStarSharp>}
                      fractions={2}
                      initialRating={2}
                      readonly
                    />
                    <span className="text-sm font-medium">2.0 & up</span>
                  </div>
                </Radio>
                <Radio value="rating1">
                  <div className=" flex items-start gap-2">
                    <Rating
                      className="text-orange-600"
                      emptySymbol={
                        <IoStarSharp className="text-gray-400"></IoStarSharp>
                      }
                      fullSymbol={<IoStarSharp></IoStarSharp>}
                      fractions={2}
                      initialRating={1}
                      readonly
                    />
                    <span className="text-sm font-medium">1.0 & up</span>
                  </div>
                </Radio>
              </RadioGroup>
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Accordion 4"
              title="Popular Tags"
            >
              <div className="flex overflow-hidden h-max flex-wrap items-center gap-2">
                <Button className="text-white bg-[#00B207]" radius="full">
                  Healthy
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Low fat
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Vegetarian
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Kids food
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Vitamin
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Bread
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Meat
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Snacks
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Tiffin
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Lunch
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Dinner
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Breakfast
                </Button>
                <Button
                  className="hover:bg-[#02a108] hover:text-white"
                  radius="full"
                >
                  Fruits
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </Drawer>
    </>
  );
};

export default Products;
