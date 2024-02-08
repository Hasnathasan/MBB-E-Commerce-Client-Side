import { Button } from "@nextui-org/react";
import product1 from "../../assets/products1.png";
import "./Cart.css";
import { FiMinus, FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
const Cart = () => {
  return (
    <div className="grid mx-5 mt-7 grid-cols-12 mb-40">
      <div className=" border col-span-8 border-gray-300 rounded-lg overflow-hidden">
        <table className="overflow-auto w-full">
          <tr className="border-b border-gray-300">
            <th className="bg-transparent">PRODUCT</th>
            <th className="bg-transparent">PRICE</th>
            <th className="bg-transparent">QUANTITY</th>
            <th className="bg-transparent">SUBTOTAL</th>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="flex py-6 items-center gap-3">
              <img className="w-20" src={product1} alt="" />
              <h3 className="font-semibold">The Starry Night</h3>
            </td>
            <td className="font-semibold">$549</td>
            <td>
              <div className="flex border p-2 w-min border-gray-300 rounded-full justify-center items-center gap-3">
                <div>
                  <Button size="sm" radius="full" variant="flat" isIconOnly>
                    <FiMinus></FiMinus>
                  </Button>
                </div>
                <div className="text-base">5</div>
                <div>
                  <Button size="sm" radius="full" variant="flat" isIconOnly>
                    <FiPlus></FiPlus>
                  </Button>
                </div>
              </div>
            </td>
            <td>
              <div className="font-semibold flex justify-between items-center">
              <h4>$2639</h4>
              <Button size="sm" radius="full" variant="bordered" isIconOnly>
                <RxCross2></RxCross2>
              </Button>{" "}
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Cart;
