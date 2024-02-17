import { Avatar, Tab, Tabs } from "@nextui-org/react";
import useUser from "../../Hooks/useUser";


const ArtistDetailsPage = () => {
    const [userData] = useUser();
    return (
        <div className=" mx-8 my-8">
            <div className="grid grid-cols-12 justify-center gap-6 border border-gray-300 p-5 rounded-lg ">
            <div className=" col-span-5 flex flex-col justify-center items-center gap-2">
          <Avatar src={userData?.userPhoto} className="w-44 h-44 text-large" />
          <h2 className="text-2xl font-semibold">
            {userData?.userName || "Unknown"}
          </h2>
        </div>
        <div className="col-span-7 p-6">
        <iframe width="100%" height="320" src="https://www.youtube.com/embed/-g76j7K5bGQ?si=2QpDqo0uOQTO5EKL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
                <span>Bio</span>
              </div>
            }
          >
            <p className="mb-3">
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
            <p>
              Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at
              posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem
              vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet
              nisi porttitor vel. Etiam tincidunt metus vel dui interdum
              sollicitudin. Mauris sem ante, vestibulum nec orci vitae, aliquam
              mollis lacus. Sed et condimentum arcu, id molestie tellus. Nulla
              facilisi. Nam scelerisque vitae justo a convallis.
            </p>
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
            <p className="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              doloremque quos laborum dolorem odit corporis maiores at nostrum,
              consectetur facere vero ipsum quo quas cumque inventore, qui totam
              numquam eius? Cum amet voluptatem quaerat quam quis ducimus sequi,
              blanditiis ad officiis, enim eius voluptas fugiat eveniet
              doloremque, quia deleniti ullam rerum sapiente! Blanditiis
              repellat porro, optio cum deleniti quo mollitia consequatur rem
              ad? Quisquam nisi consectetur voluptate corporis, porro ipsum.
            </p>
            <p>
              Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at
              posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem
              vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet
              nisi porttitor vel. Etiam tincidunt metus vel dui interdum
              sollicitudin. Mauris sem ante, vestibulum nec orci vitae, aliquam
              mollis lacus. Sed et condimentum arcu, id molestie tellus. Nulla
              facilisi. Nam scelerisque vitae justo a convallis.
            </p>
          </Tab>
        </Tabs>
            </div>
        </div>
    );
};

export default ArtistDetailsPage;