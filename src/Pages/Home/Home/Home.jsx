import banner from "../../../assets/Bannar.png";
import Bannar from "../Bannar/Bannar";
import PopularArtists from "../PopularArtists/PopularArtists";
import PopularCategories from "../PopularCategories/PopularCategories";
import PopularProducts from "../PopularProducts/PopularProducts";

const Home = () => {
  return (
    <div className=" mx-3 md:mx-10 min-h-[1600px]">
      {/* <div className="w-full mx-auto mt-4 lg:h-[580px] mb-10">
        <img className="w-full h-full" src={banner} alt="" />
      </div> */}
      <Bannar></Bannar>
      <PopularArtists></PopularArtists>
      <PopularCategories></PopularCategories>
      <PopularProducts></PopularProducts>
    </div>
  );
};

export default Home;
