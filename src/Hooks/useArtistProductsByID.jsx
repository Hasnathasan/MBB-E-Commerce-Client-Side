import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useArtistProductsByID = ({ id }) => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: products,
    isLoading: isProductsLoading,
    refetch,
  } = useQuery({
    queryKey: [`artistProducts-${id}`, id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/eachArtistProducts/${id}`);
      return res.data;
    },
  });
  return [products, isProductsLoading, refetch];
};

export default useArtistProductsByID;
