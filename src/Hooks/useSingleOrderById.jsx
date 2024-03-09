import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useSingleOrderById = ({id}) => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: order,
      isLoading: isOrderLoading,
      refetch,
    } = useQuery({
      queryKey: ["order", id],
      queryFn: async () => {
        const res = await axiosSecure.get(`/singleOrder/${id}`);
        return res.data;
      },
    });
    return [order, isOrderLoading, refetch];
};

export default useSingleOrderById;