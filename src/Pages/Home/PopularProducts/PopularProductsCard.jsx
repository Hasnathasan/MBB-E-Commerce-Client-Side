import { useContext, useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@nextui-org/react";
import axios from "axios";
import useWishListByUser from "../../../Hooks/useWishListByUser";

const PopularProductsCard = ({ product, isRounded }) => {
  const [hovered, setHovered] = useState(false);
  const [isWishListedId, setIsWishListedId] = useState(null);
  const [, , refetch] = useWishListByUser();
  useEffect(() => {
    axios.get(`http://localhost:8000/isWishListed/${product?._id}`)
    .then(res => {
      if(res.data){
        setIsWishListedId(res.data?._id)
    }
    else(setIsWishListedId(null))
  })
    .catch(err => console.log(err))
  },[product?._id])
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
    const wishItem = { addedBy: user?.email, product };
    if(!isWishListedId){
      axios
      .post(`https://mbb-e-commerce-server.vercel.app/wish-list`, wishItem)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          setIsWishListedId(res.data.insertedId)
          refetch()
          toast.success("Product added to wishlist");
        }
      })
      .catch((err) => console.log(err));
    }
    else{
      axios
      .delete(`https://mbb-e-commerce-server.vercel.app/wish-list/${isWishListedId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          setIsWishListedId(null)
          refetch()
          toast.success("Product removed from wishlist");
        }
      })
      .catch((err) => console.log(err));
    }
  };
  const success = () => toast.success("Product Successfully added to cart");

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (available_quantity === 0) {
      return toast.error("This Product is out of stock");
    }
    const cartProduct = {
      addedBy: user?.email,
      artist_details: { artist: addedBy, prison_of_artist },
      quantity: 1,
      product_id: _id,
      product_name,
      total: price?.sale_price
        ? price?.sale_price * 1
        : price?.regular_price * 1,
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
    setOpenCart(true);
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
          <Button
            radius="full"
            isIconOnly
            onClick={handleAddToCart}
            className={`bg-[#ebebeb] absolute bottom-3 right-3 z-10 rounded-full cursor-pointer  flex justify-center items-center w-10 h-10`}
          >
            <HiOutlineShoppingBag className="w-5 h-5"></HiOutlineShoppingBag>
          </Button>
        </div>

        {/* Hovered Buttons - Details + Wishlist */}
        <div
          className={`absolute right-3 z-50 top-3 transition-all !duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          } flex-col justify-center items-center gap-5`}
        >
          <div
            onClick={handleWishList}
            className="bg-[#ffffff] border border-gray-100 shadow rounded-full cursor-pointer flex justify-center items-center w-10 h-10"
          >
            {
              isWishListedId ? <GoHeartFill className="w-5 h-5 text-red-500" /> :  <GoHeart className="w-5 h-5" />
            }
           
            
          </div>
        </div>
      </Link>
      <Toaster />
    </>
  );
};

export default PopularProductsCard;
