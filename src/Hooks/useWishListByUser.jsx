import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useWishListByUser = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const {
      data: userWishList,
      isLoading: isUserWishLishLoading,
      refetch,
    } = useQuery({
      queryKey: [`cartOf-${user?.email}`, user],
      queryFn: async () => {
        const res = await axiosSecure.get(`/wish-list-by-email/${user?.email}`);
        return res.data;
      },
    });
    return [userWishList, isUserWishLishLoading, refetch];
};

export default useWishListByUser;