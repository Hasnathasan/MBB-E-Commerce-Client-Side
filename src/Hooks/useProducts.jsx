import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";


const useProducts = ({categoryFilter, priceSlider, minRating, searchQuery, sort, tag}) => {
  const [axiosSecure] = useAxiosSecure();
    const {
      data: products,
      isLoading: isProductsLoading,
      refetch,
    } = useQuery({
      queryKey: ["products", categoryFilter, priceSlider, minRating, searchQuery, sort, tag],
      queryFn: async () => {
        const res = await axios.get(`http://localhost:8000/products?${categoryFilter ? `category=${categoryFilter}` : ""}${priceSlider ? `&priceSlider=${priceSlider}` : ""}${minRating ? `&minRating=${minRating}` : ""}${searchQuery ? `&searchQuery=${searchQuery}` : ""}${sort ? `&sort=${sort}` : ""}${tag ? `&tag=${tag}` : ""}`);
        return res.data;
      },
    });
    return [products, isProductsLoading, refetch];
};

export default useProducts;