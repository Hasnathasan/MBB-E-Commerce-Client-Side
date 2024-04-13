import { Avatar, Tab, Tabs } from "@nextui-org/react";
import PopularProductsCard from "../Home/PopularProducts/PopularProductsCard";
import useArtist from "../../Hooks/useArtist";
import { useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Loader from "../../Components/Loader/Loader";
import useArtistProductsByID from "../../Hooks/useArtistProductsByID";
const ArtistDetailsPage = () => {
  const  {id} = useParams();
  console.log(id);
  const [artistData, isArtistDataLoading] = useArtist({ id });
  const [products, isProductsLoading] = useArtistProductsByID({ id });
  const location = useLocation();
  if (isArtistDataLoading || isProductsLoading) {
    return <Loader></Loader>;
  }
  console.log(artistData, products);
  return (
    <div className="mx-3 lg:mx-8 my-8">
      <div className="grid grid-cols-12 justify-center gap-6 border border-gray-300 p-3 lg:p-5 rounded-lg ">
        <div className=" col-span-12 lg:col-span-5 flex flex-col justify-center items-center gap-2">
          <Avatar
            src={artistData?.userPhoto}
            className="w-44 h-44 text-large"
          />
          <h2 className="text-2xl font-semibold">
            {artistData?.userName || "Unknown"}
          </h2>
        </div>
        <div className="lg:col-span-7 col-span-12 flex justify-center items-center">
          <ReactPlayer url={artistData?.bio_video_link} />
        </div>
      </div>
      <div className="mt-7">
        <Tabs
          className="w-full flex items-center justify-center"
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList:
              "gap-6 w-full relative flex justify-center item-center rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#20B526]",
            tab: "w-max px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#050505] text-base",
          }}
        >
          <Tab
            key="photos"
            title={
              <div className="flex px-6 items-center">
                {/* <GalleryIcon/> */}
                <span>Artist Info</span>
              </div>
            }
          >
            <h2 className="text-lg font-semibold text-gray-900">Bio:</h2>
            <p className="mb-6">{artistData?.bio}</p>
            <h2 className="text-lg font-semibold text-gray-900">
              Art Description:
            </h2>
            <p className="mb-6">{artistData?.art_description}</p>

            <h2 className="text-lg font-semibold mb-5 text-gray-900">
              Correctional System:{" "}
              <span className="text-gray-800">Unknown</span>
            </h2>
            <h2 className="text-lg font-semibold mb-5 text-gray-900">
              Prison Name:{" "}
              <span className="text-gray-800">{artistData?.billingInfo?.prison?.prison_name}</span>
            </h2>
            <h2 className="text-lg font-semibold mb-5 space-x-3 text-gray-900">
              Keywords:{" "}
              {artistData?.keywords?.map((keyword) => (
                <span key={keyword} className="text-gray-800">
                  {keyword},
                </span>
              ))}
            </h2>
            <h2 className="text-lg font-semibold text-gray-900">
              State:{" "}
              <span className="text-gray-800">
                {artistData?.billingInfo?.states}
              </span>
            </h2>
          </Tab>
          <Tab
            key="music"
            title={
              <div className="flex px-6 items-center">
                {/* <MusicIcon/> */}
                <span>Products</span>
              </div>
            }
          >
            {products?.length !== 0 ? (
              <div
                className={`grid grid-cols-1 md:grid-cols-2 mt-5 px-1 lg:px-3 md:px-14  gap-6 justify-center items-center  ${
                  location.pathname.includes("/adminDashboar")
                    ? "md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                    : "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                }`}
              >
                {products?.map((product) => (
                  <PopularProductsCard
                    key={product?.name}
                    product={product}
                    isRounded={true}
                  ></PopularProductsCard>
                ))}
              </div>
            ) : (
              <div className="my-16">
                {" "}
                <h1 className="text-3xl text-center font-semibold">
                  No Products Available
                </h1>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtistDetailsPage;
