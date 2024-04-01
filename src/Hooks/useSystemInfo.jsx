
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useSystemInfo = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: systemInfo, isLoading: isSystemInfo, refetch } = useQuery({
        queryKey: ["system-info"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/system-setting`)
            return res.data;
        },
      })
      return [systemInfo, isSystemInfo, refetch];
};

export default useSystemInfo;