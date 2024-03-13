import { useContext, useState } from "react";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const PopularProductsCard = ({ product, isRounded }) => {
  const [hovered, setHovered] = useState(false);

  const { user, setIsProductAdded, setOpenCart } = useContext(AuthContext);
  const {
    _id,
    product_name,
    available_quantity,
    featured_photo,
    gallery_photos,
    product_tags,
    product_categories,
    description,
    rating,
    reviews,
    profit_distribution,
    price,
    addedBy,
    prison_of_artist,
  } = product;
  const handleWishList = (e) => {
    e.preventDefault();
  };
  const success = () => toast.success("Product Successfully added to cart");

  const handleAddToCart = (e) => {
    e.preventDefault();
    const cartProduct = {
      addedBy: user?.email,
      quantity: 1,
      product_id: _id,
      product_name,
      price,
      profit_distribution,
      featured_photo,
      product_available_quantity: parseInt(available_quantity),
    };
    let previousCart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = previousCart?.filter(
      (product) => product.product_id !== cartProduct.product_id
    );
    setIsProductAdded((prevCount) => prevCount + 1);
    newCart.push(cartProduct);
    localStorage.setItem("cart", JSON.stringify(newCart));
      setOpenCart(true)
    success();
  };

  return (
    <>
      <Link
        to={`/details/${_id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`px-3 relative transition-all w-full ${
          isRounded ? "rounded-lg" : ""
        } !duration-500 hover:shadow-small hover:shadow-green-600 hover:border-green-600 flex flex-col justify-between py-4 gap-3 border border-gray-200`}
      >
        <img
          className="w-[90%] h-[200px] mx-auto"
          src={featured_photo}
          alt=""
        />
        <div className="flex justify-between items-center mt-3">
          <div>
            <h3 className={`text-sm ${hovered ? "text-green-600" : ""}`}>
              {product_name}
            </h3>
            <h3 className="font-medium">
              ${price?.sale_price || price?.regular_price}
            </h3>
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
          <div
            onClick={handleAddToCart}
            className={`bg-[#ebebeb] absolute bottom-3 right-3 z-50 rounded-full cursor-pointer  flex justify-center items-center w-10 h-10`}
          >
            <HiOutlineShoppingBag className="w-5 h-5"></HiOutlineShoppingBag>
          </div>
        </div>

        {/* Hovered Buttons - Details + Wishlist */}
        <div
          className={`absolute hidden right-3 z-50 top-3 transition-all !duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          } flex-col justify-center items-center gap-5`}
        >
          <div
            onClick={handleWishList}
            className="bg-[#ffffff] border border-gray-100 shadow rounded-full cursor-pointer flex justify-center items-center w-10 h-10"
          >
            <GoHeart className="w-5 h-5" />
          </div>
        </div>
      </Link>
      <Toaster />
    </>
  );
};

export default PopularProductsCard;
