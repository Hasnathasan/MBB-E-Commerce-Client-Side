import { Avatar, Tab, Tabs } from "@nextui-org/react";
import useUser from "../../Hooks/useUser";
import product1 from "../../assets/products1.png";
import product2 from "../../assets/products2.png";
import product3 from "../../assets/products3.png";
import product4 from "../../assets/products4.png";
import product5 from "../../assets/products5.png";
import product6 from "../../assets/products6.png";
import product7 from "../../assets/products7.jpg";
import product8 from "../../assets/products8.png";
import PopularProductsCard from "../Home/PopularProducts/PopularProductsCard";
import useArtist from "../../Hooks/useArtist";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import useArtistProductsByEmail from "../../Hooks/useArtistProductsByEmail";
const ArtistDetailsPage = () => {
  const {email} = useParams();
  const [artistData, isArtistDataLoading] = useArtist({email});
  const [products, isProductsLoading] = useArtistProductsByEmail({email})
  if(isArtistDataLoading || isProductsLoading){
    return <h1>Loading</h1>
  }
  console.log(artistData, products);
  return (
    <div className=" mx-8 my-8">
      <div className="grid grid-cols-12 justify-center gap-6 border border-gray-300 p-5 rounded-lg ">
        <div className=" col-span-5 flex flex-col justify-center items-center gap-2">
          <Avatar src={artistData?.userPhoto} className="w-44 h-44 text-large" />
          <h2 className="text-2xl font-semibold">
            {artistData?.userName || "Unknown"}
          </h2>
        </div>
        <div className="col-span-7 flex justify-center items-center">
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
            <p className="mb-6">
              {artistData?.bio}
            </p>
            <h2 className="text-lg font-semibold text-gray-900">Art Description:</h2>
            <p className="mb-6">
              {artistData?.art_description}
            </p>

            <h2 className="text-lg font-semibold mb-5 text-gray-900">Correctional System: <span className="text-gray-800">Unknown</span></h2>
            <h2 className="text-lg font-semibold mb-5 space-x-3 text-gray-900">Keywords: {artistData?.keyWords?.map(keyword => <span key={keyword} className="text-gray-800">{keyword}</span>)}</h2>
            <h2 className="text-lg font-semibold text-gray-900">State: <span className="text-gray-800">{artistData?.billingInfo?.states}</span></h2>
            
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
             {
              products?.length !== 0 ? <div className="grid grid-cols-2 mt-5 px-14 sm:grid-cols-2 gap-6 justify-center items-center md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {products?.map((product) => (
                <PopularProductsCard
                  key={product?.name}
                  product={product}
                  isRounded={true}
                ></PopularProductsCard>
              ))}
            </div> : <div className="my-16"> <h1 className="text-3xl text-center font-semibold">No Products Available</h1></div>
             }
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtistDetailsPage;
