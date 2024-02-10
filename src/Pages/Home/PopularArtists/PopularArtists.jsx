
import PopularArtistsCard from "./PopularArtistsCard";

import person1 from "../../../assets/person1.webp";
import person2 from "../../../assets/person2.jpg";
import person3 from "../../../assets/person3.webp";
import person4 from "../../../assets/person4.webp";
import person5 from "../../../assets/person5.jpg";
import person6 from "../../../assets/person6.jpg";
import person7 from "../../../assets/person7.jpg";
import person8 from "../../../assets/person8.jpg";

const PopularArtists = () => {
  const artists = [
    { img: person7, name: "George Arthur" },
    { img: person5, name: "Henry nickls" },
    { img: person3, name: "Noah-James" },
    { img: person8, name: "Alfie-Jay" },
    { img: person4, name: "Isaac-Lee" },
    { img: person7, name: "Jonathan trod" },
    { img: person6, name: "Tom James" },
    { img: person1, name: "Harry potter" },
    { img: person8, name: "George Arthur" },
    { img: person2, name: "Henry nickls" },
    { img: person5, name: "Noah-James" },
    { img: person4, name: "Alfie-Jay" },
  ];
  return (
    <div className="my-16">
      <h2 className="text-xl mb-4 md:text-3xl font-semibold">
        Popular Artists
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-5 justify-center items-center">
        {artists?.map((artist) => (
          <PopularArtistsCard key={artist} artist={artist}></PopularArtistsCard>
        ))}
      </div>
    </div>
  );
};

export default PopularArtists;
