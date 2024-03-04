import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePopularArtist = () => {
    const [axiosSecure] = useAxiosSecure();
  const {
    data: artistData,
    isLoading: isArtistDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["pupularArtist"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popularArtist");
      return res.data;
    },
  });
  return [artistData, isArtistDataLoading, refetch];
};

export default usePopularArtist;