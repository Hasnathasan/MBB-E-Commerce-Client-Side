import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useBannerImages from "../../../Hooks/useBannerImages";
import Loader from "../../../Components/Loader/Loader";
import { Link } from "react-router-dom";

const Bannar = () => {
    const [bannerImages, isBannerImagesLoading, refetch] = useBannerImages();
    if(isBannerImagesLoading){
        return <Loader></Loader>
    }
    console.log(bannerImages);
    const settings = {
        fade: true,
        infinite: true,
        autoplay: true,
        arrows: false,
        speed: 700,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              fade: false,
              centerMode: true,
              centerPadding: "20px",
            },
          },
        ],
      };
    return (
        <div className="w-full mt-4 mb-10 mx-auto">
            <Slider {...settings} className="">
        {bannerImages?.map((banner, index) => (
          <div className="w-full" key={index}>
            <Link target="_blank" className="w-full h-full" to={banner?.link}>
            <img
              className=" rounded-[10px] md:rounded-none p-[5px] md:p-0 h-[180px] md:h-[500px] w-full"
              src={banner?.img}
            /></Link>
          </div>
        ))}
      </Slider>
        </div>
    );
};

export default Bannar;