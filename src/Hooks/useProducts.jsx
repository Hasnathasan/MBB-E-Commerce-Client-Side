import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useProducts = ({categoryFilter, priceSlider, minRating, searchQuery}) => {
    const {
      data: products,
      isLoading: isProductsLoading,
      refetch,
    } = useQuery({
      queryKey: ["products", categoryFilter, priceSlider, minRating],
      queryFn: async () => {
        const res = await axios.get(`https://mbb-e-commerce-server.vercel.app/products?${categoryFilter ? `category=${categoryFilter}` : ""}${priceSlider ? `&priceSlider=${priceSlider}` : ""}${minRating ? `&minRating=${minRating}` : ""}${searchQuery ? `&searchQuery=${searchQuery}` : ""}`);
        return res.data;
      },
    });
    return [products, isProductsLoading, refetch];
};

export default useProducts;