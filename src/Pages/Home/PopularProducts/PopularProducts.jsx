import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import PopularProductsCard from "./PopularProductsCard";
import usePopularProducts from "../../../Hooks/usePopularProducts";

const PopularProducts = () => {
  const [hovered, setHovered] = useState(false);
  const [products, isProductsLoading] = usePopularProducts();
  

  return (
    <div className="my-20">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl md:text-3xl font-semibold">Popular Products</h2>
        <Link
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-32 text-left text-green-500 flex justify-center items-center gap-2 relative font-medium"
          to={"/shop/filter"}
        >
          View All{" "}
          <BsArrowRight
            className={`absolute transition-all duration-75 ${
              hovered ? "left-[105px]" : "left-[100px]"
            }`}
          ></BsArrowRight>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products?.map((product) => (
          <PopularProductsCard
            key={product?._id}
            product={product}
          ></PopularProductsCard>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
