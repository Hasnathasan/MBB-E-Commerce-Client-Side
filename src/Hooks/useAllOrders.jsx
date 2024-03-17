
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllOrders = ({status}) => {
  const [axiosSecure] = useAxiosSecure();
  console.log(status);
  const {
    data: orders,
    isLoading: isOrdersLoading,
    refetch,
  } = useQuery({
    queryKey: ["allOrdersForAdmin", status],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allOrders${status ? `?status=${status}` : ""}`);
      return res.data;
    },
  });
  return [orders, isOrdersLoading, refetch];
};

export default useAllOrders;
