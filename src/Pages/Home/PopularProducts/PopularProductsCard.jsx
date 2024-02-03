import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import Rating from "react-rating";

const PopularProductsCard = ({ product }) => {
  const { name, price, rating } = product;
  return (
    <div>
      <img src="" alt="" />
      <div>
        <div>
          <h3>{name}</h3>
          <h3>${price}</h3>
          <Rating
            className="text-orange-400"
            emptySymbol={
              <IoStarOutline className="w-6 h-6 opacity-75"></IoStarOutline>
            }
            fullSymbol={<IoStarSharp className="w-6 h-6"></IoStarSharp>}
            fractions={2}
            initialRating={rating}
            readonly
          />
        </div>
      </div>
    </div>
  );
};

export default PopularProductsCard;
