import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useArtist = ({email}) => {
    const [axiosSecure] = useAxiosSecure();
  const {
    data: artistsData,
    isLoading: isArtistsDataLoading,
    refetch,
  } = useQuery({
    queryKey: [`artist-${email}`, email],
    queryFn: async () => {
      const res = await axiosSecure.get(`artist/${email}`);
      return res.data;
    },
  });
  return [artistsData, isArtistsDataLoading, refetch];
};

export default useArtist;