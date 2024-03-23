import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useBannerImages = () => {
    const [axiosSecure] = useAxiosSecure();
    const {
      data: bannerImages,
      isLoading: isBannerImagesLoading,
      refetch,
    } = useQuery({
      queryKey: ["banner-images"],
      queryFn: async () => {
        const res = await axiosSecure.get("/bannerImages");
        return res.data;
      },
    });
    return [bannerImages, isBannerImagesLoading, refetch];
};

export default useBannerImages;