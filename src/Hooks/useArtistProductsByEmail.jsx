import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useArtistProductsByEmail = ({email}) => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: products,
      isLoading: isProductsLoading,
      refetch,
    } = useQuery({
      queryKey: [`artistProducts-${email}`, email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/eachArtistProduct`);
        return res.data;
      },
    });
    return [products, isProductsLoading, refetch];
};

export default useArtistProductsByEmail;