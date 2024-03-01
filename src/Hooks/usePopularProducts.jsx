import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePopularProducts = () => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: products,
      isLoading: isProductsLoading,
      refetch,
    } = useQuery({
      queryKey: ["popularProducts"],
      queryFn: async () => {
        const res = await axiosSecure.get("/popularProducts");
        return res.data;
      },
    });
    return [products, isProductsLoading, refetch];
};

export default usePopularProducts;