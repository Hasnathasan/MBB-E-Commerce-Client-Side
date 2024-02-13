import { Accordion, AccordionItem, Radio, RadioGroup } from "@nextui-org/react";
import { Typography } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";

const Products = () => {
const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    // <div className="drawer lg:drawer-open">
    //   <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    //   <div className="drawer-content max-w-5xl py-14 md:py-0  mx-auto flex flex-col items-start justify-start">
    //     <Outlet></Outlet>
    //     <label
    //       htmlFor="my-drawer-2"
    //       className="px-5 py-3 border border-green-500 hover:bg-green-500 hover:text-white transition-all duration-250 absolute top-4 left-2 md:left-10 drawer-button lg:hidden"
    //     >
    //       Filter
    //     </label>
    //   </div>
    //   <div className="drawer-side z-[100] p-">
    //     <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

    //     <div className="w-[320px]"></div>
    //     <ul className="menu flex-nowrap shadow-lg shadow-gray-300 bg-white px-5  py-10 w-[320px] space-y-2">
       




         
    //       {/* <p className="text-default-500 text-small">Selected: {selected}</p>

    //       <div>
    //         <Typography className="mb-1" variant="paragraph">
    //           Price Range
    //         </Typography>
    //         <Slider
    //           size="sm"
    //           label=" "
    //           step={10}
    //           minValue={0}
    //           maxValue={1000}
    //           color="success"
    //           defaultValue={[100, 500]}
    //           formatOptions={{ style: "currency", currency: "BDT" }}
    //           className="max-w-md"
    //         />
    //       </div> */}
    //     </ul>
    //   </div>
    // </div>
    <>
      <div className="grid grid-cols-12 mx-5 mt-8 mb-24">
      <div className="col-span-3 mr-9 hidden py-4 md:inline">
        <Accordion itemClasses={{ title: "font-bold text-xl",}} showDivider={false} selectionMode="multiple"  defaultExpandedKeys={["1","2", "3"]}>
      <AccordionItem key="1" aria-label="Accordion 1" title="All Categories">
      <RadioGroup
            // value={filter}
            // onValueChange={setFilter}
            className="!mb-5 px-5"
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
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
      </div>
      <div className="col-span-12 md:col-span-9">
        <Outlet></Outlet>
      </div>
    </div>
    </>
  );
};

export default Products;
