import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useArtist = ({ email }) => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: artistData,
    isLoading: isArtistDataLoading,
    refetch,
  } = useQuery({
    queryKey: [`artist-${email}`, email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/artist/${email}`);
      return res.data;
    },
  });
  return [artistData, isArtistDataLoading, refetch];
};

export default useArtist;
