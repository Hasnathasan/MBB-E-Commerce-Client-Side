import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import Rating from "react-rating";

const PopularProductsCard = ({ product }) => {
  const { name, price, rating, img } = product;
  return (
    <div className="px-3 flex flex-col justify-between py-4 gap-3 border border-gray-200">
      <img className="w-[80%] mx-auto" src={img} alt="" />
      <div className="flex justify-between items-center mt-3">
        <div>
          <h3 className="text-sm">{name}</h3>
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
    </div>
  );
};

export default PopularProductsCard;
