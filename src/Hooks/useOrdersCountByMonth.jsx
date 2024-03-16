import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useOrdersCountByMonth = () => {
    const [axiosSecure] = useAxiosSecure();
  const {
    data: ordersByMonth,
    isLoading: isOrdersByMonthLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders-by-month"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders-by-month");
      return res.data;
    },
  });
  return [ordersByMonth, isOrdersByMonthLoading, refetch];
};

export default useOrdersCountByMonth;