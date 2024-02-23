import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePrisons = () => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: prisons,
      isLoading: isPrisonsLoading,
      refetch,
    } = useQuery({
      queryKey: ["AllUsers"],
      queryFn: async () => {
        const res = await axiosSecure.get("/prisons");
        return res.data;
      },
    });
    return [prisons, isPrisonsLoading, refetch];
};

export default usePrisons;