import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";
import image4 from "../../../assets/image4.png";
import image5 from "../../../assets/image5.png";
import image6 from "../../../assets/image6.png";
import image7 from "../../../assets/image7.png";
import CategoryCard from "./CategoryCard";
import { useState } from "react";

const PopularCategories = () => {
  const [hovered, setHovered] = useState(false);
  const categories = [
    { img: image1, name: "Drawing" },
    { img: image2, name: "Sculpture" },
    { img: image3, name: "Cubism" },
    { img: image4, name: "Abstract art" },
    { img: image5, name: "Graphic design" },
    { img: image6, name: "Advertising" },
    { img: image7, name: "Art Design" },
    { img: image3, name: "Cubism" },
    { img: image1, name: "Drawing" },
    { img: image6, name: "Advertising" },
    { img: image2, name: "Sculpture" },
    { img: image5, name: "Graphic design" },
  ];
  return (
    <div className="my-16">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl md:text-3xl font-semibold">
          Popular Categories
        </h2>
        <Link
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-32 text-left text-green-500 flex justify-center items-center gap-2 relative font-medium"
          to={"/products"}
        >
          View All{" "}
          <BsArrowRight
            className={`absolute transition-all duration-75 ${
              hovered ? "left-[105px]" : "left-[100px]"
            }`}
          ></BsArrowRight>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-5 justify-center items-center">
        {categories?.map((category) => (
          <CategoryCard key={category.img} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
