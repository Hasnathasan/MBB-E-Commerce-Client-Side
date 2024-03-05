import { Option, Select } from "@material-tailwind/react";
import PopularProductsCard from "../../Home/PopularProducts/PopularProductsCard";
import useProducts from "../../../Hooks/useProducts";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";



const ProductCardsForProductPage = () => {
    
  const {categoryFilter, priceSlider, minRating, searchQuery} = useContext(AuthContext);
    const [products, isProductsLoading] = useProducts({categoryFilter, priceSlider, minRating, searchQuery});
    if(isProductsLoading){
        return <h1>Loading</h1>
    }
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-3 md:items-center">
            <div className="flex justify-center gap-2 items-center">
              <h3 className="text-nowrap text-sm text-gray-700">Sort By:</h3>
              <Select size="sm" label="Select">
                <Option>Newest</Option>
                <Option>Oldest</Option>
                <Option>A to Z</Option>
              </Select>
            </div>
            <h3 className="text-gray-800 text-sm">
              <span className="font-medium !text-gray-900">
                {products?.length}
              </span>{" "}
              Results Found
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:px-5 xl:px-14 sm:col-span-2 md:grid-cols-3 gap-4 lg:gap-5 xl:gap-8 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {products?.map((product) => (
              <PopularProductsCard
                key={product?.name}
                product={product}
                isRounded={true}
              ></PopularProductsCard>
            ))}
          </div>
        </div>
    );
};

export default ProductCardsForProductPage;