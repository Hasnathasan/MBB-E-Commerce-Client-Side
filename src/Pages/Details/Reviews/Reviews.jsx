import Rating from "react-rating";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { BsShieldCheck } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Providers/AuthProvider";
import useUser from "../../../Hooks/useUser";

const Reviews = ({ product, refetch }) => {
  const [userData, isUserDataLoading] = useUser();
  const [isProductAvailable, setIsProductAvailable] = useState(false);
  const [ratingByUser, setRatingByUser] = useState(1);
  console.log(product);
  const { reviews, rating } = product;

  useEffect(() => {
    axios
      .get(
        `https://mbb-e-commerce-server.vercel.app/isPurchased/?email=${userData?.email}&&productId=${product?._id}`
      )
      .then((res) => {
        console.log(res);
        setIsProductAvailable(res.data.available);
      })
      .catch((err) => console.log(err));
  }, [product?._id, userData?.email]);

  const handleReviewPost = (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    const reviewByUser = {
      review,
      reviewBy: userData?.userName,
      userEmail: userData?.email,
      rating: ratingByUser,
      createdAt: new Date(),
    };
    console.log(reviewByUser);
    axios
      .patch(
        `https://mbb-e-commerce-server.vercel.app/reviews/${product?._id}`,
        reviewByUser
      )
      .then((result) => {
        console.log(result.data);
        setRatingByUser(1);
        e.target.reset();
        refetch();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="flex flex-col-reverse px-5 gap-10 md:flex-row gap-y-4 justify-between items-start mt-5">
        <form onSubmit={handleReviewPost} className="space-y-2">
          <h4 className="text-gray-700 text-lg">Rate this product</h4>
          <Rating
            onChange={(value) => setRatingByUser(value)}
            initialRating={ratingByUser}
            className="text-orange-400"
            emptySymbol={
              <IoStarOutline className="w-6 h-6 opacity-75"></IoStarOutline>
            }
            fullSymbol={<IoStarSharp className="w-6 h-6"></IoStarSharp>}
            fractions={2}
          />
          <textarea
            type="text"
            name="review"
            id="review"
            className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
            placeholder="Write your review about the product"
            disabled={!isProductAvailable}
            rows={4}
            cols={50}
          />
          <button
            disabled={!isProductAvailable}
            className="py-2 px-6 block border border-[#2093ff] duration-200 text-[#2093ff] text-[15px] rounded-l-sm"
          >
            Post Your review
          </button>
        </form>
        <div className="flex items-end mb-10 md:mb-0 gap-8">
          <div className=" space-y-1">
            <h2 className="text-5xl text-gray-800">{rating}</h2>
            <Rating
              className="text-orange-400"
              emptySymbol={<IoStarOutline></IoStarOutline>}
              fullSymbol={<IoStarSharp></IoStarSharp>}
              fractions={2}
              initialRating={rating}
              readonly
            />
            <p className=" text-gray-600">{reviews.length} Reviews</p>
          </div>
          <div>{/* <img src={ratingChart} alt="" /> */}</div>
        </div>
      </div>
      <hr className="my-7" />
      <div>
        {reviews?.map((review, index) => (
          <div key={index} className="mb-7">
            <div className="flex gap-5 items-center">
              <div className=" rounded-full w-14 h-14 bg-cyan-600 flex uppercase justify-center items-center text-xl">
                {review.reviewBy[0]}
              </div>
              <div>
                <h4 className="text-gray-500 text-[15px]">
                  By{" "}
                  <span className="text-gray-800 text-base">
                    {review.reviewBy}
                  </span>
                  , {review.createdAt.slice(0, 10)}
                </h4>
                <div className="flex gap-2 items-end">
                  <Rating
                    className="text-orange-400"
                    emptySymbol={<IoStarOutline></IoStarOutline>}
                    fullSymbol={<IoStarSharp></IoStarSharp>}
                    fractions={2}
                    initialRating={review.rating}
                    readonly
                  />
                  <p className="text-green-500 flex items-center gap-1">
                    <BsShieldCheck></BsShieldCheck> Verified Purchase
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 my-4 text-[15px]">{review.review}</p>
            <hr className="my-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
