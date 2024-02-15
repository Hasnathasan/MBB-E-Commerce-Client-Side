import "keen-slider/keen-slider.min.css";
import "./Details.css";
import 'react-tabs/style/react-tabs.css';
import { useKeenSlider } from "keen-slider/react";
import product1 from "../../assets/products1.png";
import product2 from "../../assets/products2.png";
import product3 from "../../assets/products3.png";
import product4 from "../../assets/products4.png";
import product5 from "../../assets/products5.png";
import product6 from "../../assets/products6.png";
import product7 from "../../assets/products7.jpg";
import product8 from "../../assets/products8.png";
import product9 from "../../assets/products9.png";
import product10 from "../../assets/products10.png";
import { Button, Chip } from "@nextui-org/react";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const Details = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  const products = [
    {
      name: "The Starry Night",
      price: 50.0,
      rating: 4.2,
      img: product1,
    },
    {
      name: "Girl with a Pearl Earring",
      price: 42.0,
      rating: 4.9,
      img: product2,
    },
    {
      name: "Las Meninas",
      price: 120.0,
      rating: 2.5,
      img: product3,
    },
    {
      name: "The Garden of Earthly Delights",
      price: 70.0,
      rating: 3.5,
      img: product4,
    },
    {
      name: "The Kiss",
      price: 20.0,
      rating: 4.2,
      img: product5,
    },
    {
      name: "Water lilies",
      price: 20.0,
      rating: 4.2,
      img: product6,
    },
    {
      name: "Las Meninas",
      price: 70.0,
      rating: 3.5,
      img: product7,
    },
    {
      name: "The Arnolfini Portrait",
      price: 120.0,
      rating: 2.5,
      img: product8,
    },
    {
      name: "The Scream",
      price: 42.0,
      rating: 4.9,
      img: product9,
    },
    {
      name: "Guernica",
      price: 50.0,
      rating: 4.2,
      img: product10,
    },
    {
      name: "Las Meninas",
      price: 120.0,
      rating: 2.5,
      img: product3,
    },
    {
      name: "Green Apple",
      price: 42.0,
      rating: 4.9,
      img: product7,
    },
    {
      name: "Water lilies",
      price: 20.0,
      rating: 4.2,
      img: product6,
    },
    {
      name: "The Garden of Earthly Delights",
      price: 70.0,
      rating: 3.5,
      img: product4,
    },
    {
      name: "Girl with a Pearl Earring",
      price: 42.0,
      rating: 4.9,
      img: product2,
    },
  ];
  return (
    <div className="mx-8 py-14">
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1 flex justify-center flex-col items-center">
          <div ref={sliderRef} className="keen-slider w-full mb-2">
            {products?.map((product, index) => (
              <div
                key={index}
                className={`keen-slider__slide w-full h-[380px]`}
              >
                <img className="w-full h-full" src={product?.img} alt="" />
              </div>
            ))}
          </div>

          <div ref={thumbnailRef} className="keen-slider thumbnail">
            {products?.map((product, index) => (
              <div key={index} className={`keen-slider__slide w-20 h-20`}>
                <img
                  src={product?.img}
                  className="cursor-pointer w-full h-full"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <h2 className="text-3xl font-semibold">The Arnolfini Portrait</h2>
            <Chip color="success" variant="flat" radius="sm">
              In Stock
            </Chip>
          </div>
          <div className="flex items-center gap-3">
            <Rating
              className="text-orange-600"
              emptySymbol={<FaRegStar></FaRegStar>}
              fullSymbol={<FaStar></FaStar>}
              fractions={2}
              initialRating={4}
              readonly
            />
            <h5 className="text-sm text-gray-700">4 review</h5>
            <span className="text-sm text-gray-500">|</span>
            <h5 className="text-sm text-gray-700">
              <span className="font-semibold text-gray-800">SKU:</span> 541254
            </h5>
          </div>
          <div className="flex items-center gap-3">
            <h5 className="text-lg text-gray-400 font-medium line-through">
              $48.00
            </h5>
            <h5 className="text-xl mr-2 font-medium text-green-800">$35.25</h5>
            <Chip color="danger" size="sm" variant="flat">
              65% off
            </Chip>
          </div>
          <div className="py-3 border-t border-b border-gray-300">
            <p className="text-sm text-gray-700">
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel
              consequat nec, ultrices et ipsum. Nulla varius magna a consequat
              pulvinar.{" "}
            </p>
          </div>
          <div className="py-5 gap-3 border-b flex items-center border-gray-300">
            <div className="flex border p-2 w-min border-gray-300 rounded-full justify-center items-center gap-3">
              <div>
                <Button size="sm" radius="full" variant="flat" isIconOnly>
                  <FiMinus></FiMinus>
                </Button>
              </div>
              <div className="text-base">5</div>
              <div>
                <Button size="sm" radius="full" variant="flat" isIconOnly>
                  <FiPlus></FiPlus>
                </Button>
              </div>
            </div>
            <button
              type="submit"
              className=" text-white flex-1 bg-[#00B207] flex items-center justify-center gap-2 hover:bg-[#00b206f6] focus:outline-none font-medium rounded-3xl px-7 py-3 text-center "
            >
              Add To Cart{" "}
              <HiOutlineShoppingBag className="w-6 h-6"></HiOutlineShoppingBag>
            </button>
            <Button
              isIconOnly
              color="success"
              radius="full"
              size="lg"
              variant="flat"
              aria-label="Like"
            >
              <GoHeart className="w-6 h-6"></GoHeart>
            </Button>
          </div>
          <div>
            <h5 className="text-sm mb-2 text-gray-700">
              <span className="font-medium text-gray-900">Category:</span>{" "}
              Picture
            </h5>
            <h5 className="text-sm text-gray-700">
              <span className="font-medium text-gray-900">Tags:</span>{" "}
              <span className="hover:underline cursor-pointer hover:text-gray-900">
                Picture
              </span>{" "}
              <span className="hover:underline cursor-pointer hover:text-gray-900">
                Nothing
              </span>{" "}
              <span className="hover:underline cursor-pointer hover:text-gray-900">
                Arts
              </span>{" "}
              <span className="hover:underline cursor-pointer hover:text-gray-900">
                New Designs
              </span>{" "}
            </h5>
          </div>
        </div>
      </div>
      <div>
      <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
      </div>
    </div>
  );
};

export default Details;
