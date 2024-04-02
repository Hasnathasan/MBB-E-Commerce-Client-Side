
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsersByRole = () => {
  const [axiosSecure] = useAxiosSecure()
  const {
    data: usersByRole,
    isLoading: isUsersByRoleDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["user's By role"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/usersByRole"
      );
      return res.data;
    },
  });
  return [usersByRole, isUsersByRoleDataLoading, refetch];
};

export default useUsersByRole;
