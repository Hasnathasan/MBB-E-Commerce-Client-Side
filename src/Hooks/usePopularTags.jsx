import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePopularTags = () => {
    const [axiosSecure] = useAxiosSecure();
  const {
    data: tags,
    isLoading: isTagsLoading,
    refetch,
  } = useQuery({
    queryKey: ["popular-tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popularTags");
      return res.data;
    },
  });
  return [tags, isTagsLoading, refetch];
};

export default usePopularTags;