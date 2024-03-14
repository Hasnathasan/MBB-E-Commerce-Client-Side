import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useUserOrders = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    data: orders,
    isLoading: isOrdersLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    },
  });
  return [orders, isOrdersLoading, refetch];
};

export default useUserOrders;
