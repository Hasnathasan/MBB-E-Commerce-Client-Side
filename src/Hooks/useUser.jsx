import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useUser = () => {
    const [axiosSecure] = useAxiosSecure()
    const {user} = useContext(AuthContext);
    const { data: userData, isLoading: isUserDataLoading, refetch } = useQuery({
        queryKey: [`user-${user?.email}`],
        queryFn: async() => {
            const res = await axiosSecure.get(`/${user?.email}`)
            return res.data;
        },
      })
      return [userData, isUserDataLoading, refetch]
};

export default useUser;