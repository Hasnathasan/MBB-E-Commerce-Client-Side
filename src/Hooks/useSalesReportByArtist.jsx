import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useSalesReportByArtist = ({artistId}) => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: salesReport,
      isLoading: isSalesReportLoading,
      refetch,
    } = useQuery({
      queryKey: ["sales-report", artistId],
      queryFn: async () => {
        const res = await axiosSecure.get(`/sales-report/${artistId ? `?artistId=${artistId}` : ""}`);
        return res.data;
      },
    });
    return [salesReport, isSalesReportLoading, refetch];
};

export default useSalesReportByArtist;