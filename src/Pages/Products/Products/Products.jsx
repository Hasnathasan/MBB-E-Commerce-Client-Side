import {
  Accordion,
  AccordionItem,
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";
import { Drawer, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import Rating from "react-rating";
import { IoStarSharp } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { AuthContext } from "../../../Providers/AuthProvider";
import useCategories from "../../../Hooks/useCategories";
import { Outlet } from "react-router-dom";
import usePopularTags from "../../../Hooks/usePopularTags";
import Loader from "../../../Components/Loader/Loader";
const Products = () => {
  const {categoryFilter, setSelectedTag, setCategoryFilter, priceSlider, setPriceSlider, minRating, setMinRating, setSort, setSearchQuery} = useContext(AuthContext);
  const [openFilter, setOpenFilter] = useState(false);
  const openFilterDrawer = () => setOpenFilter(true);
  const closeFilterDrawer = () => setOpenFilter(false);

  const [categories, isCategoriesLoading] = useCategories();
  const [tags, isTagsLoading, refetch] = usePopularTags();
  
  if(isCategoriesLoading || isTagsLoading){
    return <Loader></Loader>
  }
  console.log(priceSlider);
  const allCategories = [...new Set(categories?.map(item => item.toLowerCase()))];
  console.log(categories, allCategories);
  return (
    <>
      <div className="grid grid-cols-12 mx-2 lg:mx-8 mt-8 mb-24">
        <div className="col-span-12 flex justify-start items-center gap-3 lg:hidden">
        <Button size="sm" onClick={openFilterDrawer} className="text-white bg-green-500" radius="full">
            Filter <LuSettings2 className="w-5 h-5" />
          </Button>
          <Button
          size="sm"
          onClick={() => {
            setCategoryFilter(null);
            setPriceSlider([0,1000])
            setMinRating(null)
            setSort(null)
            setSearchQuery(null)
            setSelectedTag(null)
          }} 
          className="text-white bg-green-500" radius="full">
            Reset Filter <LuSettings2 className="w-5 h-5" />
          </Button>
        </div>
        <div className="col-span-3 mr-5 hidden py-4 lg:inline">
          <div className="flex justify-start items-center gap-3">
          <Button className="text-white bg-green-500" radius="full">
            Filter <LuSettings2 className="w-5 h-5" />
          </Button>
          <Button
          onClick={() => {
            setCategoryFilter(null);
            setPriceSlider([0,1000])
            setMinRating(null)
            setSort(null)
            setSearchQuery(null)
            setSelectedTag(null)
          }} 
          className="text-white bg-green-500" radius="full">
            Reset Filter <LuSettings2 className="w-5 h-5" />
          </Button>
          </div>
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
                <Radio value={null}>
                  <Typography className="capitalize" variant="small">All Products</Typography>
                </Radio>
                {
                  allCategories?.map(category => <Radio key={category} value={category}>
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
                  value={priceSlider}
                  onChange={setPriceSlider}
                  className="max-w-[100%]"
                />
                <p className="text-default-500 font-medium mt-2 text-small">
                  Price:{" "}
                  <span className="font-medium text-gray-900">
                    {Array.isArray(priceSlider) &&
                      priceSlider.map((b) => `$${b}`).join(" – ")}
                  </span>
                </p>
              </div>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Rating">
              <RadioGroup value={minRating} onValueChange={setMinRating} color="success" className="!mb-5">
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
              {tags?.map(tag => <Button onClick={() => setSelectedTag(tag)} key={tag} className="text-white bg-[#00B207]" radius="full">
                  {tag}
                </Button>)}
              </div>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="col-span-12 py-4 lg:col-span-9">
        <div className="flex justify-end gap-2 items-center">
              <h3 className="text-nowrap text-sm text-gray-700">Sort By:</h3>
              <Select
              size="sm"
      placeholder="Short By"
      className="w-40 text-nowrap"
      disableSelectorIconRotation
      onChange={e => setSort(e.target.value)}
    >
        <SelectItem key={"none"} value={"none"}>
          Short By
        </SelectItem>
        <SelectItem key={"newest"} value={"newest"}>
        Newest
        </SelectItem>
        <SelectItem key={"oldest"} value={"oldest"}>
        Oldest
        </SelectItem>
    </Select>
            </div>
          <Outlet></Outlet>
        </div>
      </div>
      <Drawer
        open={openFilter}
        overlay={false}
        size={300}
        onClose={closeFilterDrawer}
        className="p-4 h-full flex flex-col shadow-large overflow-y-auto"
      >
        <div className="mr-5 py-4">
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
                <Radio value={null}>
                  <Typography className="capitalize" variant="small">All Products</Typography>
                </Radio>
                {
                  allCategories?.map(category => <Radio key={category} value={category}>
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
                  value={priceSlider}
                  onChange={setPriceSlider}
                  className="max-w-[100%]"
                />
                <p className="text-default-500 font-medium mt-2 text-small">
                  Price:{" "}
                  <span className="font-medium text-gray-900">
                    {Array.isArray(priceSlider) &&
                      priceSlider.map((b) => `$${b}`).join(" – ")}
                  </span>
                </p>
              </div>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Rating">
              <RadioGroup value={minRating} onValueChange={setMinRating} color="success" className="!mb-5">
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
              {tags?.map(tag => <Button onClick={() => setSelectedTag(tag)} key={tag} className="text-white bg-[#00B207]" radius="full">
                  {tag}
                </Button>)}
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </Drawer>
    </>
  );
};

export default Products;
