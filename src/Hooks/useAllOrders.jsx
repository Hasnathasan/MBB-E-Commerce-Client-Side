import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useAllOrders = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: orders,
    isLoading: isOrdersLoading,
    refetch,
  } = useQuery({
    queryKey: ["allOrdersForAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allOrders`);
      return res.data;
    },
  });
  return [orders, isOrdersLoading, refetch];
};

export default useAllOrders;
