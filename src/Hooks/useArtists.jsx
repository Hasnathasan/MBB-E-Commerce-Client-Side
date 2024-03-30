import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useArtists = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: artistsData,
    isLoading: isArtistsDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      const res = await axiosSecure.get("/artists");
      return res.data;
    },
  });
  return [artistsData, isArtistsDataLoading, refetch];
};

export default useArtists;
