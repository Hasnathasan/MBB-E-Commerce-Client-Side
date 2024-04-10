
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useTaxAndShippingData = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: data, isLoading: isDataLoading, refetch } = useQuery({
        queryKey: ["taxAndShippingData"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/taxAndShippingData`)
            return res.data;
        },
      })
      return [data, isDataLoading, refetch];
};

export default useTaxAndShippingData;