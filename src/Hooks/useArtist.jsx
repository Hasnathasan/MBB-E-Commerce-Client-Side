import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useArtist = ({ id }) => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: artistData,
    isLoading: isArtistDataLoading,
    refetch,
  } = useQuery({
    queryKey: [`artist-${id}`, id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/artist/${id}`);
      return res.data;
    },
  });
  return [artistData, isArtistDataLoading, refetch];
};

export default useArtist;
