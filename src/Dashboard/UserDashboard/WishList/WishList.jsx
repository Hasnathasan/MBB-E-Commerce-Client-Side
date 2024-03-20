import { Button, Chip } from "@nextui-org/react";
import Loader from "../../../Components/Loader/Loader";
import useWishListByUser from "../../../Hooks/useWishListByUser";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


const WishList = () => {
    const [userWishList, isUserWishLishLoading, refetch] = useWishListByUser();
    const {user, setIsProductAdded, setOpenCart} = useContext(AuthContext);
    if(isUserWishLishLoading){
        return <Loader></Loader>
    }

    const handleDeleteFromWishList = id => {
        console.log(id);
        axios.delete(`https://mbb-e-commerce-server.vercel.app/deleteWishLish/${id}`)
        .then(res => {
            if(res.data.deletedCount > 0){
                refetch()
                toast.success("Product removed from wishlist")
            }
        })
        .then(err => console.log(err))
    }
    
    const handleAddToCart = (product) => {
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
          if(available_quantity === 0){
            return toast.error("This Product is out of stock")
          }
        
        const cartProduct = {
          addedBy: user?.email,
          artist_details: {artist: addedBy, prison_of_artist},
          quantity: 1,
          product_id: _id,
          product_name,
          total: (price?.sale_price ? (price?.sale_price * 1): (price?.regular_price * 1)),
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
          toast.success("Product added to cart");
      };
    return (
        <div className="">
  <div className="border border-gray-300 rounded-lg overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="bg-transparent">PRODUCT</th>
          <th className="bg-transparent">PRICE</th>
          <th className="bg-transparent">Stock Status</th>
          <th className="bg-transparent"></th>
        </tr>
      </thead>
      <tbody>
        {userWishList.length !== 0 ? (
          userWishList.map((wishlist) => (
            <tr key={wishlist?._id} className="border-b border-gray-300">
              <td className="flex py-6 items-center w-72 gap-3">
                <img
                  className="w-20"
                  src={wishlist?.product?.featured_photo}
                  alt=""
                />
                <h3 className="font-semibold text-nowrap">
                  {wishlist?.product?.product_name}
                </h3>
              </td>
              <td className="font-semibold">
                ${
                  wishlist?.product?.price?.sale_price ||
                  wishlist?.product?.price?.regular_price
                }
              </td>
              <td className="font-semibold">
                {wishlist?.product?.available_quantity > 0 ? (
                  <Chip color="success" variant="flat" radius="sm">
                    In Stock
                  </Chip>
                ) : (
                  <Chip color="danger" variant="flat" radius="sm">
                    Out Of Stock
                  </Chip>
                )}
              </td>
              <td>
                <div className="font-semibold flex justify-center gap-4 items-center">
                  <Button
                    onClick={() => handleAddToCart(wishlist?.product)}
                    color="success"
                  >
                    Add To Cart
                  </Button>
                  <Button
                    onClick={() => handleDeleteFromWishList(wishlist?._id)}
                    size="sm"
                    radius="full"
                    variant="bordered"
                    isIconOnly
                  >
                    <RxCross2 />
                  </Button>{" "}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="pt-10" colSpan={4}>
              <h3 className="text-center font-semibold text-3xl">
                No Product Available
              </h3>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  <Toaster></Toaster>
</div>
    );
};

export default WishList;