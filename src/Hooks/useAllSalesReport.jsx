import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";


const useAllSalesReport = ({status}) => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: salesReport,
      isLoading: isSalesReportLoading,
      refetch,
    } = useQuery({
      queryKey: ["sales-report-all", status],
      queryFn: async () => {
        const res = await axios.get(`https://mbb-e-commerce-server.vercel.app/sales-report-all/${status ? `?status=${status}` : ""}`);
        return res.data;
      },
    });
    return [salesReport, isSalesReportLoading, refetch];
};

export default useAllSalesReport;