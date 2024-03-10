import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useOrdersLength = () => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: ordersLength,
      isLoading: isOrdersLengthLoading,
      refetch,
    } = useQuery({
      queryKey: ["ordersLength"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/ordersLength`);
        return res.data;
      },
    });
    return [ordersLength, isOrdersLengthLoading, refetch];
};

export default useOrdersLength;