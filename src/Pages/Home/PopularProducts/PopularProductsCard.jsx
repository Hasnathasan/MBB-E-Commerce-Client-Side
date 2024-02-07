import { useState } from "react";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoEyeOutline, IoStarOutline, IoStarSharp } from "react-icons/io5";
import Rating from "react-rating";

const PopularProductsCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const { name, price, rating, img } = product;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-3 relative transition-all !duration-500 hover:shadow-small hover:shadow-green-400 hover:border-green-600 flex flex-col justify-between py-4 gap-3 border border-gray-200"
    >
      <img className="w-[90%] h-[200px] mx-auto" src={img} alt="" />
      <div className="flex justify-between items-center mt-3">
        <div>
          <h3 className={`text-sm ${hovered ? "text-[#35a538]" : ""}`}>
            {name}
          </h3>
          <h3 className="font-medium">${price}</h3>
          <Rating
            className="text-orange-400"
            emptySymbol={
              <IoStarOutline className="w-3 h-3 opacity-75"></IoStarOutline>
            }
            fullSymbol={<IoStarSharp className="w-3 h-3"></IoStarSharp>}
            fractions={2}
            initialRating={rating}
            readonly
          />
        </div>
        <div className="bg-[#ebebeb] rounded-full cursor-pointer flex justify-center items-center w-10 h-10">
          <HiOutlineShoppingBag className="w-5 h-5"></HiOutlineShoppingBag>
        </div>
      </div>

      {/* Hovered Buttons - Details + Wishlist */}
      <div
        className={`absolute right-3 top-3 flex transition-all !duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        } flex-col justify-center items-center gap-5`}
      >
        <div className="bg-[#ffffff] border border-gray-100 shadow rounded-full cursor-pointer flex justify-center items-center w-10 h-10">
          <GoHeart className="w-5 h-5" />
        </div>
        <div className="bg-[#ffffff] border border-gray-100 shadow rounded-full cursor-pointer flex justify-center items-center w-10 h-10">
          <IoEyeOutline className="w-5 h-5"></IoEyeOutline>
        </div>
      </div>
    </div>
  );
};

export default PopularProductsCard;
