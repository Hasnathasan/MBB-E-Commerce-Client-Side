import { Link } from "react-router-dom";
import useProductLength from "../../../Hooks/useProductLength";
import cubes from "../../../assets/cubes.png";
import packages from "../../../assets/package.png";
import team from "../../../assets/team.png";

const OverView = () => {
  const [productsLength, isProductsLengthLoading] = useProductLength();
  if (isProductsLengthLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="w-[97%] mx-auto">
      <div className="grid grid-cols-2 xl:grid-cols-4 w-full gap-5 justify-center">
        <div className="w-full p-1 md:p-4 xl:p-5 rounded-xl shadow-sm flex justify-center items-center gap-4 bg-[#008ffb] !text-white">
          <img className="w-5 md:w-8 xl:w-8" src={cubes} alt="" />
          <div>
            <h2 className="text-white text-nowrap text-[10px] md:text-base font-bold ">
              Total Products - {productsLength?.length}
            </h2>
            <Link
              to={"/adminDashboard/products"}
              className="text-white font-bold text-[8px] md:text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="w-full p-3 md:p-4 xl:p-5 rounded-xl shadow-sm flex justify-center items-center gap-4  bg-[#2dcf99]">
          <img className="w-3 md:w-8 xl:w-8" src={packages} alt="" />
          <div>
            <h2 className="text-white text-nowrap font-bold">
              Total Orders - {productsLength?.length}
            </h2>
            <Link
              to={"/adminDashboard/products"}
              className="text-white font-bold  text-[10px] md:text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="w-full shadow-sm lg:col-span-1 p-3 md:p-4 xl:p-5 flex justify-center items-center gap-4 rounded-xl bg-[#ff4560]">
          <img className="w-3 md:w-8 xl:w-8" src={team} alt="" />
          <div>
            <h2 className="text-white text-nowrap font-bold">
              Total Customers - {productsLength?.length}
            </h2>
            <Link
              to={"/adminDashboard/products"}
              className="text-white font-bold  text-[10px] md:text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="w-full shadow-sm lg:col-span-1 p-3 md:p-4 xl:p-5 flex justify-center items-center gap-4 rounded-xl bg-[#ff4560]">
          <img className="w-3 md:w-8 xl:w-8" src={team} alt="" />
          <div>
            <h2 className="text-white text-nowrap font-bold">
              Total Artists - {productsLength?.length}
            </h2>
            <Link
              to={"/adminDashboard/products"}
              className="text-white font-bold text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
