import { Accordion, AccordionItem, Radio, RadioGroup, Slider } from "@nextui-org/react";
import { Typography } from "@material-tailwind/react";
import product1 from "../../../assets/products1.png";
import product2 from "../../../assets/products2.png";
import product3 from "../../../assets/products3.png";
import product4 from "../../../assets/products4.png";
import product5 from "../../../assets/products5.png";
import product6 from "../../../assets/products6.png";
import product7 from "../../../assets/products7.jpg";
import product8 from "../../../assets/products8.png";
import product9 from "../../../assets/products9.png";
import product10 from "../../../assets/products10.png";
import PopularProductsCard from "../../Home/PopularProducts/PopularProductsCard";
import { useState } from "react";
const Products = () => {

    const products = [
      {
        name: "The Starry Night",
        price: 50.0,
        rating: 4.2,
        img: product1,
      },
      {
        name: "Girl with a Pearl Earring",
        price: 42.0,
        rating: 4.9,
        img: product2,
      },
      {
        name: "Las Meninas",
        price: 120.0,
        rating: 2.5,
        img: product3,
      },
      {
        name: "The Garden of Earthly Delights",
        price: 70.0,
        rating: 3.5,
        img: product4,
      },
      {
        name: "The Kiss",
        price: 20.0,
        rating: 4.2,
        img: product5,
      },
      {
        name: "Water lilies",
        price: 20.0,
        rating: 4.2,
        img: product6,
      },
      {
        name: "Las Meninas",
        price: 70.0,
        rating: 3.5,
        img: product7,
      },
      {
        name: "The Arnolfini Portrait",
        price: 120.0,
        rating: 2.5,
        img: product8,
      },
      {
        name: "The Scream",
        price: 42.0,
        rating: 4.9,
        img: product9,
      },
      {
        name: "Guernica",
        price: 50.0,
        rating: 4.2,
        img: product10,
      },
      {
        name: "Las Meninas",
        price: 120.0,
        rating: 2.5,
        img: product3,
      },
      {
        name: "Green Apple",
        price: 42.0,
        rating: 4.9,
        img: product7,
      },
      {
        name: "Water lilies",
        price: 20.0,
        rating: 4.2,
        img: product6,
      },
      {
        name: "The Garden of Earthly Delights",
        price: 70.0,
        rating: 3.5,
        img: product4,
      },
      {
        name: "Girl with a Pearl Earring",
        price: 42.0,
        rating: 4.9,
        img: product2,
      },
    ];
    const [value, setValue] = useState([100, 300]);
  return (
    <>
      <div className="grid grid-cols-12 mx-5 mt-8 mb-24">
      <div className="col-span-3 mr-5 hidden py-4 md:inline">
        <Accordion itemClasses={{ title: "font-bold text-xl",}} showDivider={false} selectionMode="multiple"  defaultExpandedKeys={["1","2", "3"]}>
      <AccordionItem key="1" aria-label="Accordion 1" title="All Categories">
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
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
      <div className="overflow-hidden">
        <Typography className="mb-1" variant="h6">Price</Typography>
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
      <p className="text-default-500 font-medium text-small">
        Price: <span className="font-medium text-gray-900">{Array.isArray(value) && value.map((b) => `$${b}`).join(" – ")}</span>
      </p>
          </div>
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
      {/* <RadioGroup
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
          </RadioGroup> */}
          <input type="radio" name="Hasnat" />
          <input type="radio" name="Hasnat" />
          <input type="radio" name="Hasnat" />
          <input type="radio" name="Hasnat" />
      </AccordionItem>
    </Accordion>
      </div>
      <div className="col-span-12 md:col-span-9">
        {/* <Outlet></Outlet> */}
        <div className="grid grid-cols-2 px-14 sm:grid-cols-2 gap-8 justify-center items-center lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
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
    </>
  );
};

export default Products;
