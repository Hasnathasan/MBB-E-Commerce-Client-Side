import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useProductCountFormOrderByMonth = () => {
    const [axiosSecure] = useAxiosSecure();
  const {
    data: soldProductByMonth,
    isLoading: isSoldProductByMonthLoading,
    refetch,
  } = useQuery({
    queryKey: ["product-from-order-by-month"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sold-products-count-last-12-months");
      return res.data;
    },
  });
  return [soldProductByMonth, isSoldProductByMonthLoading, refetch];
};

export default useProductCountFormOrderByMonth;