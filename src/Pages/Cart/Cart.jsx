import { Button } from "@nextui-org/react";
import "./Cart.css";
import { FiMinus, FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
const Cart = () => {

const [userCart, setUserCart] = useState([]);
const {setIsProductAdded} = useContext(AuthContext)
useEffect(() => {
  // Try retrieving the cart from localStorage, with a default of an empty array if not found
  const cart = localStorage.getItem("cart") || '[]';

  // Parse the retrieved data (either an empty string or valid JSON string)
  try {
    setUserCart(JSON.parse(cart));
  } catch (error) {
    // Handle parsing error gracefully (e.g., log the error)
    console.error("Error parsing local storage cart:", error);
    // Set userCart to an empty array in case of parsing error
    setUserCart([]);
  }
}, []);
  const subTotal = userCart?.reduce((accumulator, product) => {
    const price = product?.price;
    return accumulator + (price.sale_price* product?.quantity || price.regular_price* product?.quantity); // Use nullish coalescing for price2
  }, 0);
  console.log(subTotal);
  const handleQuantityMinus = (id) => {
    setUserCart(prevCart => {
      const updatedCart = prevCart.map(product => {
        if (product.product_id === id && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setIsProductAdded(prevCount => prevCount + 1);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleQuantityPlus = (id) => {
    setUserCart(prevCart => {
      const updatedCart = prevCart.map(product => {
        console.log(product);
        if (product.product_id === id) {
          return { ...product, quantity: product?.quantity == product?.product_available_quantity ? product?.quantity : product?.quantity + 1 };
        }
        return product;
      });
      setIsProductAdded(prevCount => prevCount + 1);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  const handleDeleteFromCart = (id) => {
    setUserCart(prevCart => {
      const updatedCart = prevCart.filter(product => product.product_id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsProductAdded(prevCount => prevCount + 1);
      return updatedCart;
    });
  };

  
  return (
    <div className="grid mx-8 mt-7 justify-start grid-cols-12 gap-10 mb-40">
      <div className=" border col-span-8 border-gray-300 rounded-lg overflow-hidden">
        <table className="overflow-auto w-full">
          <tr className="border-b border-gray-300">
            <th className="bg-transparent">PRODUCT</th>
            <th className="bg-transparent">PRICE</th>
            <th className="bg-transparent">QUANTITY</th>
            <th className="bg-transparent">SUBTOTAL</th>
          </tr>
         {
          userCart.length !== 0 ? userCart?.map(cartProduct =>  <tr key={cartProduct?._id} className="border-b border-gray-300">
          <td className="flex py-6 items-center gap-3">
            <img className="w-20" src={cartProduct?.featured_photo} alt="" />
            <h3 className="font-semibold">{cartProduct?.product_name}</h3>
          </td>
          <td className="font-semibold">${cartProduct?.price?.sale_price || cartProduct?.price?.regular_price}</td>
          <td>
            <div className="flex border p-2 w-min border-gray-300 rounded-full justify-center items-center gap-3">
              <div>
                <Button onClick={() => handleQuantityMinus(cartProduct?.product_id)} size="sm" radius="full" variant="flat" isIconOnly>
                  <FiMinus></FiMinus>
                </Button>
              </div>
              <div className="text-base">{cartProduct?.quantity}</div>
              <div>
                <Button  onClick={() => handleQuantityPlus(cartProduct?.product_id)} size="sm" radius="full" variant="flat" isIconOnly>
                  <FiPlus></FiPlus>
                </Button>
              </div>
            </div>
          </td>
          <td>
            <div className="font-semibold flex justify-between items-center">
              <h4>{cartProduct?.price?.sale_price ? (cartProduct?.price?.sale_price * cartProduct?.quantity): (cartProduct?.price?.regular_price * cartProduct?.quantity)}</h4>
              <Button onClick={() => handleDeleteFromCart(cartProduct?.product_id)} size="sm" radius="full" variant="bordered" isIconOnly>
                <RxCross2></RxCross2>
              </Button>{" "}
            </div>
          </td>
        </tr>) : <tr><td className="pt-10" colSpan={4}>
          <h3 className="text-center font-semibold text-3xl">No Product Available</h3></td></tr>
         }
        </table>
      </div>
      <div className="col-span-4 border border-gray-300 rounded-lg">
        <h2 className="text-lg font-medium p-5">Cart Total</h2>

        <div className="px-5 pb-5">
          <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
            <h3 className=" text-gray-500 text-sm font-medium">Subtotal:</h3>
            <h5 className="text-sm font-medium">${subTotal || 0.00}</h5>
          </div>
          <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
            <h3 className=" text-gray-500 text-sm font-medium">Discount:</h3>
            <h5 className="text-sm font-medium">$00</h5>
          </div>
          <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
            <h3 className=" text-gray-500 text-sm font-medium">Shipping:</h3>
            <h5 className="text-sm font-medium">Free</h5>
          </div>
          <div className="flex justify-between pt-2 pb-3 items-center">
            <h3 className=" font-medium">Total</h3>
            <h5 className="text-green-800 font-bold">${subTotal || 0.00}</h5>
          </div>
          <Link to={"/checkout"}>
          <Button
          type="submit"
                color="success"
                radius="full"
                className="text-white mb-2 bg-green-500 w-full"
              >
                Procced to Checkout
              </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
