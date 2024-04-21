import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import CategoryCard from "./CategoryCard";
import { useState } from "react";
import usePopularCategories from "../../../Hooks/usePopularCategories";
import Loader from "../../../Components/Loader/Loader";

const PopularCategories = () => {
  const [hovered, setHovered] = useState(false);
  const [categories, isCategoriesLoading] = usePopularCategories();
  if (isCategoriesLoading) {
    return <Loader></Loader>;
  }
  console.log(categories);
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
          to={"/categories"}
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
          <CategoryCard
            key={category.category}
            category={category}
          ></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
