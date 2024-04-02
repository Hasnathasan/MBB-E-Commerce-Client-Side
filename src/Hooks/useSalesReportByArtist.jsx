import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useSalesReportByArtist = ({artistEmail}) => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: salesReport,
      isLoading: isSalesReportLoading,
      refetch,
    } = useQuery({
      queryKey: ["sales-report", artistEmail],
      queryFn: async () => {
        const res = await axiosSecure.get(`/sales-report/${artistEmail ? `?artistEmail=${artistEmail}` : ""}`);
        return res.data;
      },
    });
    return [salesReport, isSalesReportLoading, refetch];
};

export default useSalesReportByArtist;