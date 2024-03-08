import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useProductLength = () => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: productsLength,
      isLoading: isProductsLengthLoading,
      refetch,
    } = useQuery({
      queryKey: ["productsLength"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/productLength`);
        return res.data;
      },
    });
    return [productsLength, isProductsLengthLoading, refetch];
};

export default useProductLength;