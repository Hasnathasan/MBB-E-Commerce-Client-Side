
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUsersByRole = () => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: usersByRole,
      isLoading: isUsersByRoleDataLoading,
      refetch,
    } = useQuery({
      queryKey: ["user's By role"],
      queryFn: async () => {
        const res = await axios.get("http://localhost:8000/usersByRole");
        return res.data;
      },
    });
    return [usersByRole, isUsersByRoleDataLoading, refetch];
};

export default useUsersByRole;