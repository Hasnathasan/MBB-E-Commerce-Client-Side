import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";


const useAllSalesReport = () => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: salesReport,
      isLoading: isSalesReportLoading,
      refetch,
    } = useQuery({
      queryKey: ["sales-report-all"],
      queryFn: async () => {
        const res = await axios.get(`http://localhost:8000/sales-report-all`);
        return res.data;
      },
    });
    return [salesReport, isSalesReportLoading, refetch];
};

export default useAllSalesReport;