import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";


const useProducts = ({categoryFilter, priceSlider}) => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: products,
      isLoading: isProductsLoading,
      refetch,
    } = useQuery({
      queryKey: ["products", categoryFilter, priceSlider],
      queryFn: async () => {
        const res = await axios.get(`http://localhost:8000/products?${categoryFilter ? `category=${categoryFilter}` : ""}${priceSlider ? `&priceSlider=${priceSlider}` : ""}`);
        return res.data;
      },
    });
    return [products, isProductsLoading, refetch];
};

export default useProducts;