import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, totalProduct }) => {
  const navigate = useNavigate();
  const {setCategoryFilter} = useContext(AuthContext)
  const handleCategoryClick = () => {
    setCategoryFilter(category?.category)
    navigate("/shop/filter")
  }
  return (
    <div onClick={handleCategoryClick} className="w-[100%] bg-white  flex flex-col border-2 cursor-pointer border-gray-200 hover:border-[#3fb643] hover:text-green-600 transition-all duration-300 py-6 rounded-md justify-center items-center gap-2">
      <img className="w-[90%] h-[130px] mx-auto" src={category?.image} alt="" />
      <h3 className="font-medium md:text-lg capitalize">{category?.category}</h3>
      { totalProduct && <h3 className="font-medium text-[12px] capitalize">({category?.count} Product&apos;s available)</h3>}
    </div>
  );
};

export default CategoryCard;
