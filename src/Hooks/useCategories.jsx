import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCategories = () => {
    const [axiosSecure] = useAxiosSecure();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
  });
  return [categories, isCategoriesLoading, refetch];
};

export default useCategories;