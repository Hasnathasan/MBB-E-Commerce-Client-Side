import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";

const useUserCart = () => {
  const [axiosSecure] = useAxiosSecure();
  const [userData] = useUser();
  const {
    data: userCart,
    isLoading: isUserCartLoading,
    refetch,
  } = useQuery({
    queryKey: [`cartOf-${userData?.email}`, userData],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userCart/${userData?.email}`);
      return res.data;
    },
  });
  return [userCart, isUserCartLoading, refetch];
};

export default useUserCart;
