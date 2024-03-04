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
const ArtistDetailsPage = () => {
  const {email} = useParams();
  const [artistData, isArtistDataLoading] = useArtist({email});
  if(isArtistDataLoading){
    return <h1>Loading</h1>
  }
  console.log(artistData);
  return (
    <div className=" mx-8 my-8">
      <div className="grid grid-cols-12 justify-center gap-6 border border-gray-300 p-5 rounded-lg ">
        <div className=" col-span-5 flex flex-col justify-center items-center gap-2">
          <Avatar src={artistData?.userPhoto} className="w-44 h-44 text-large" />
          <h2 className="text-2xl font-semibold">
            {artistData?.userName || "Unknown"}
            Harry Potter
          </h2>
        </div>
        <div className="col-span-7 flex justify-center items-center">
        <video controls>
        <source src={"https://www.youtube.com/watch?v=Y8Q9nX8I1dk"}  />
        Your browser does not support the video tag.
      </video>
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
              Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at
              posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem
              vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet
              nisi porttitor vel. Etiam tincidunt metus vel dui interdum
              sollicitudin. Mauris sem ante, vestibulum nec orci vitae, aliquam
              mollis lacus. Sed et condimentum arcu, id molestie tellus. Nulla
              facilisi. Nam scelerisque vitae justo a convallis. Morbi urna
              ipsum, placerat quis commodo quis, egestas elementum leo. Donec
              convallis mollis enim. Aliquam id mi quam. Phasellus nec fringilla
              elit. Nulla mauris tellus, feugiat quis pharetra sed, gravida ac
              dui. Sed iaculis, metus faucibus elementum tincidunt, turpis mi
              viverra velit, pellentesque tristique neque mi eget nulla. Proin
              luctus elementum neque et pharetra.
            </p>
            <h2 className="text-lg font-semibold text-gray-900">Art Description:</h2>
            <p className="mb-6">
              Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at
              posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem
              vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet
              nisi porttitor vel. Etiam tincidunt metus vel dui interdum
              sollicitudin. Mauris sem ante.
            </p>

            <h2 className="text-lg font-semibold mb-5 text-gray-900">Correctional System: <span className="text-gray-800">Unknown</span></h2>
            <h2 className="text-lg font-semibold mb-5 text-gray-900">Keywords: <span className="text-gray-800">Artist, Rhythm, Shape</span></h2>
            <h2 className="text-lg font-semibold text-gray-900">State: <span className="text-gray-800">New York</span></h2>
            
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
             {/* <div className="grid grid-cols-2 mt-5 px-14 sm:grid-cols-2 gap-6 justify-center items-center md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products?.map((product) => (
            <PopularProductsCard
              key={product?.name}
              product={product}
              isRounded={true}
            ></PopularProductsCard>
          ))}
        </div> */}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtistDetailsPage;
