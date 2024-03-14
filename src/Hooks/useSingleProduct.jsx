import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useSingleProduct = ({id}) => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: product,
      isLoading: isProductLoading,
      refetch,
    } = useQuery({
      queryKey: ["singleProduct", id],
      queryFn: async () => {
        const res = await axiosSecure.get(`/singleProduct/${id}`);
        return res.data;
      },
    });
    return [product, isProductLoading, refetch];
};

export default useSingleProduct;