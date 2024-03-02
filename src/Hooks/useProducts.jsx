import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useProducts = ({categoryFilter}) => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: products,
      isLoading: isProductsLoading,
      refetch,
    } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/products?${categoryFilter ? `category=${categoryFilter}` : ""}`);
        return res.data;
      },
    });
    return [products, isProductsLoading, refetch];
};

export default useProducts;