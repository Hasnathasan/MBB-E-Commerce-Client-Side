import "keen-slider/keen-slider.min.css";
import "./Details.css";
import { useKeenSlider } from "keen-slider/react";
import { Button, Chip, Tab, Tabs } from "@nextui-org/react";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import PopularProductsCard from "../Home/PopularProducts/PopularProductsCard";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import useUser from "../../Hooks/useUser";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";
import Reviews from "./Reviews/Reviews";
import useSingleProduct from "../../Hooks/useSingleProduct";
import Loader from "../../Components/Loader/Loader";

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
  const { id } = useParams();
  const location = useLocation();

  const { user, setIsProductAdded, setOpenCart } = useContext(AuthContext);
  const [userData, isUserDataLoading] = useUser();
  const [product, isProductLoading, refetch] = useSingleProduct({ id });
  const [relatedProducts, setRelatedProducts] = useState();
  const [quantity, setQuantity] = useState(1);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: product?.gallery_photos + 1 || 5,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );
  console.log(user);
  useEffect(() => {
    setQuantity(1);
    axios
      .post(
        `https://mbb-e-commerce-server.vercel.app/relatedProducts`,
        product?.product_categories
      )
      .then((res) => {
        console.log(res.data);
        setRelatedProducts(res.data);
      })
      .catch((error) => console.log(error.message));
  }, [id, product?.product_categories]);
  if (!product || !relatedProducts || isUserDataLoading || isProductLoading) {
    return <Loader></Loader>
  }
  console.log(relatedProducts);
  const {
    _id,
    product_name,
    available_quantity,
    featured_photo,
    gallery_photos,
    product_tags,
    product_categories,
    description,
    rating,
    reviews,
    price,
    profit_distribution,
    addedBy,
    prison_of_artist,
  } = product;
  
  const { regular_price, sale_price } = price;
  const success = () => toast.success("Product Successfully added to cart");

  const handleAddToCart = () => {
    const cartProduct = {
      addedBy: userData?.email,
      quantity: quantity,
      total: price?.sale_price
        ? price?.sale_price * quantity
        : price?.regular_price * quantity,
      artist_details: { artist: addedBy, prison_of_artist },
      product_id: _id,
      product_name,
      price,
      profit_distribution,
      featured_photo,
      product_available_quantity: parseInt(available_quantity),
    };
    let previousCart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = previousCart?.filter(
      (product) => product.product_id !== cartProduct.product_id
    );
    setIsProductAdded((prevCount) => prevCount + 1);
    newCart.push(cartProduct);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setOpenCart(true);
    success();
  };
  const handleWishList = () => {
    const wishItem = { addedBy: user?.email, product };
    axios
      .post(`https://mbb-e-commerce-server.vercel.app/wish-list`, wishItem)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success("Product added to wishlist");
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(localStorage.getItem("cart"));
  return (
    <div className={`md:mx-8 py-14`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-2">
        <div className="col-span-1 flex w-full flex-col items-center">
          <div ref={sliderRef} className="keen-slider w-[380px] mb-2">
            {[featured_photo, ...gallery_photos]?.map((img, index) => (
              <div
                key={index}
                className={`keen-slider__slide w-full h-[350px]`}
              >
                <img className="  mx-auto h-full" src={img} alt="" />
              </div>
            ))}
          </div>

          <div ref={thumbnailRef} className="keen-slider !w-[90%] thumbnail">
            {[featured_photo, ...gallery_photos]?.map((img, index) => (
              <div key={index} className={`keen-slider__slide flex justify-center items-center border border-dashed border-gray-600  h-20`}>
                <img
                  src={img}
                  className="cursor-pointer h-full"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 mx-5 md:mx-0">
          <div className="flex items-start gap-2">
            <h2 className="md:text-3xl text-2xl font-semibold">
              {product_name}
            </h2>
            {available_quantity > 0 ? (
              <Chip color="success" variant="flat" radius="sm">
                In Stock
              </Chip>
            ) : (
              <Chip color="danger" variant="flat" radius="sm">
                Out Of Stock
              </Chip>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Rating
              className="text-orange-600"
              emptySymbol={<FaRegStar></FaRegStar>}
              fullSymbol={<FaStar></FaStar>}
              fractions={2}
              initialRating={rating}
              readonly
            />
            <h5 className="text-sm text-gray-700">{reviews.length} review</h5>
          </div>
          <div className="flex items-center gap-3">
            <h5 className="text-lg text-gray-400 font-medium line-through">
              ${price?.regular_price}
            </h5>
            <h5 className="text-xl mr-2 font-medium text-green-800">
              ${price?.sale_price}
            </h5>
            {regular_price > sale_price ? (
              <Chip color="danger" size="sm" variant="flat">
                {(((regular_price - sale_price) * 100) / regular_price).toFixed(
                  2
                )}{" "}
                % off
              </Chip>
            ) : (
              <></>
            )}
          </div>
          <div className="py-3 border-t border-b border-gray-300">
            <p className="text-sm text-gray-700">{description}</p>
          </div>
          <div className="py-5 gap-3 border-b flex items-center border-gray-300">
            <div className="flex border p-2 w-min border-gray-300 rounded-full justify-center items-center gap-3">
              <div>
                <Button
                  onClick={() =>
                    setQuantity(quantity <= 0 ? quantity : quantity - 1)
                  }
                  size="sm"
                  radius="full"
                  variant="flat"
                  isIconOnly
                >
                  <FiMinus></FiMinus>
                </Button>
              </div>
              <div className="text-base">{quantity}</div>
              <div>
                <Button
                  onClick={() =>
                    setQuantity(
                      quantity >= available_quantity
                        ? available_quantity
                        : quantity + 1
                    )
                  }
                  size="sm"
                  radius="full"
                  variant="flat"
                  isIconOnly
                >
                  <FiPlus></FiPlus>
                </Button>
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              type="submit"
              size="lg"
              color="success"
              radius="full"
              className={`text-white flex-1 mb-2 px-12 bg-green-500`}
              isDisabled={available_quantity === 0}
            >
              Add to Cart
              <HiOutlineShoppingBag className="w-6 h-6"></HiOutlineShoppingBag>
            </Button>
            <Button
            onClick={handleWishList}
            className={`${!user ? "cursor-not-allowed": " cursor-not-allowed"}`}
              isIconOnly
              color="success"
              radius="full"
              size="lg"
              variant="flat"
              aria-label="Like"
              isDisabled={!user}
            >
              <GoHeart className="w-6 h-6"></GoHeart>
            </Button>
          </div>
          <div>
            <h5 className="text-sm mb-2 text-gray-700">
              <span className="font-medium text-gray-900">Category:</span>{" "}
              {product_categories?.map((category) => (
                <span
                  className="font-medium text-gray-800 capitalize"
                  key={category}
                >
                  {category}
                </span>
              ))}
            </h5>
            <h5 className="text-sm mb-2 text-gray-700">
              <span className="font-medium text-gray-900">Tags:</span>{" "}
              {product_tags?.map((category) => (
                <span
                  className="hover:underline mx-1 cursor-pointer hover:text-gray-900"
                  key={category}
                >
                  {category}
                </span>
              ))}
            </h5>
          </div>
        </div>
      </div>
      <div className="mt-8">
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
            tabContent: "group-data-[selected=true]:text-[#000000]",
          }}
        >
          <Tab
            key="photos"
            title={
              <div className="flex px-6 items-center">
                {/* <GalleryIcon/> */}
                <span>Description</span>
              </div>
            }
          >
            <p className="px-3">{description}</p>
          </Tab>
          <Tab
            key="videos"
            title={
              <div className="flex px-6 items-center">
                <span>Rating and Review's</span>
              </div>
            }
          >
            <Reviews refetch={refetch} product={product}></Reviews>
          </Tab>
        </Tabs>
      </div>
      <div className="mt-14">
        <h2 className="text-3xl font-semibold mb-5 text-center">
          Related Products
        </h2>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 px-2 md:px-14 sm:grid-cols-2 ${
            location.pathname.includes("/adminDashboard")
              ? "xl:grid-cols-3 2xl:grid-cols-4"
              : "xl:grid-cols-4 2xl:grid-cols-5"
          } gap-6 justify-center items-center md:grid-cols-3`}
        >
          {relatedProducts?.map((product) => (
            <PopularProductsCard
              key={product?.name}
              product={product}
              isRounded={true}
            ></PopularProductsCard>
          ))}
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Details;


