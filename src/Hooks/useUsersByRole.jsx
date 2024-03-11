
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useUsersByRole = () => {
    const {
      data: usersByRole,
      isLoading: isUsersByRoleDataLoading,
      refetch,
    } = useQuery({
      queryKey: ["user's By role"],
      queryFn: async () => {
        const res = await axios.get("https://mbb-e-commerce-server.vercel.app/usersByRole");
        return res.data;
      },
    });
    return [usersByRole, isUsersByRoleDataLoading, refetch];
};

export default useUsersByRole;