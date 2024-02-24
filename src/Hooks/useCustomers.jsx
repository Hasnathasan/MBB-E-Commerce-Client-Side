import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useCustomers = () => {
    const [axiosSecure] = useAxiosSecure();
  const {
    data: customersData,
    isLoading: isCustomersDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/customers");
      return res.data;
    },
  });
  return [customersData, isCustomersDataLoading, refetch];
};

export default useCustomers;