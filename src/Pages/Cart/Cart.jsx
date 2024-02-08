import product1 from '../../assets/products1.png'

const Cart = () => {
    return (
        <div className="grid grid-cols-12">
            <div className=' border col-span-8 border-gray-300 rounded-lg overflow-hidden'>
            <table className="overflow-auto w-full">
        <tr>
          <th>PRODUCT</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
          <th>SUBTOTAL</th>
        </tr>
        <tr>
          <td className="flex items-center gap-2">
            <img className="w-16" src={product1} alt="" />
            <h3 className="font-semibold">The Starry Night</h3>
          </td>
          <td>$549</td>
          <td>x5</td>
          <td>$2638</td>
        </tr>
        <tr>
          <td className="flex items-center gap-2">
            <img className="w-16" src={product1} alt="" />
            <h3 className="font-semibold">The Starry Night</h3>
          </td>
          <td>$549</td>
          <td>x5</td>
          <td>$2638</td>
        </tr>
        <tr>
          <td className="flex items-center gap-2">
            <img className="w-16" src={product1} alt="" />
            <h3 className="font-semibold">The Starry Night</h3>
          </td>
          <td>$549</td>
          <td>x5</td>
          <td>$2638</td>
        </tr>
      </table>
            </div>
        </div>
    );
};

export default Cart;