import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePopularCategories = () => {
    const [axiosSecure] = useAxiosSecure();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch,
  } = useQuery({
    queryKey: ["popularCategories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popularCategories");
      return res.data;
    },
  });
  return [categories, isCategoriesLoading, refetch];
};

export default usePopularCategories;