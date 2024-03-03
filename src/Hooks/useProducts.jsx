import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";


const useProducts = ({categoryFilter, priceSlider, minRating}) => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: products,
      isLoading: isProductsLoading,
      refetch,
    } = useQuery({
      queryKey: ["products", categoryFilter, priceSlider, minRating],
      queryFn: async () => {
        const res = await axios.get(`https://mbb-e-commerce-server.vercel.app/products?${categoryFilter ? `category=${categoryFilter}` : ""}${priceSlider ? `&priceSlider=${priceSlider}` : ""}${minRating ? `&minRating=${minRating}` : ""}`);
        return res.data;
      },
    });
    return [products, isProductsLoading, refetch];
};

export default useProducts;