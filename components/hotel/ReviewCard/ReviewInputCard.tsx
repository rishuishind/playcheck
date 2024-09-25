import React from "react";
// import { StarIcon } from "@heroicons/react/solid";
import dynamic from "next/dynamic";

const StarIcon = dynamic(() => import("@heroicons/react/solid/StarIcon"));

type Props = {
  hotelId: string;
  setEnableCard: Function;
  hotel_User_Reviews_List: any[];
};

export default function ReviewInputCard(props: Props) {
  const [reviewStar, setReviewStar] = React.useState<number>(0);
  const [reviewTitle, setReviewTitle] = React.useState<string>("");
  const [reviewDescription, setReviewDescription] = React.useState<string>("");
  const [msg, setMsg] = React.useState<string>("");
  const nameMap = {
    0: "",
    1: "Very Bad",
    2: "Bad",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };
  const handleRatingChange = (newRating: number) => {
    setReviewStar(newRating);
  };

  const submitReviewHandler = () => {
    // if (reviewStar === 0) {
    //   setMsg("Please rate the hotel");
    // } else if (reviewTitle.length < 3) {
    //   setMsg("Please name your title")
    // } else if (reviewDescription.length < 10) {
    //   setMsg("Please describe your experience");
    // } else {
    //   const obj = {
    //     review_Id: "",
    //     review_TimeStamp: new Date(),
    //     review_Rating: reviewStar,
    //     review_Title: reviewTitle,
    //     review_Description: reviewDescription,
    //   };
    //   props.hotel_User_Reviews_List.push(obj);
    //   insertUserReviewForHotel(props.hotelId, obj);
    //   props.setEnableCard(false);
    // }
  };

  return (
    <>
      <div
        className={`relative flex flex-col w-full my-4 space-y-3 px-2 py-5 bg-gray-50 rounded-sm`}
      >
        <div className={`relative flex flex-col`}>
          <h2 className={`relative w-fit font-serif text-xl mb-2 font-medium`}>
            Rate your Experience
          </h2>
          <div className={`relative flex flex-x-3`}>
            <StarRating rating={reviewStar} onChange={handleRatingChange} setMsg={setMsg} />
            {reviewStar > 0 && (
              <p className={`text-red-600 my-auto text-xl ml-4 font-medium`}>
                {nameMap[reviewStar]}
              </p>
            )}
          </div>
        </div>
        <div className="w-full border-[1px]"></div>
        <div className={`relative flex flex-col`}>
          <div className={`relative flex flex-col`}>
            <label
              htmlFor="title"
              className={`relative w-fit font-serif text-xl mb-2 font-medium`}
            >
              Title
            </label>
            <input
              placeholder="Enter your title"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              maxLength={30}
              type="text"
              id="title"
              value={reviewTitle}
              onClick={() => {
                setMsg("");
              }}
              onChange={(event) => {
                setReviewTitle(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-full border-[1px]"></div>
        <div className={`relative flex flex-col`}>
          <label
            htmlFor="content"
            className={`relative w-fit font-serif text-xl mb-2 font-medium`}
          >
            Describe your Experience
          </label>
          <textarea
            id="content"
            placeholder="Enter your experience"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows={5}
            value={reviewDescription}
            onClick={() => {
              setMsg("");
            }}
            onChange={(event) => {
              setReviewDescription(event.target.value);
            }}
          />
        </div>
        <div className={`relative flex flex-row-reverse mt-5 justify-between`}>
          <button
            onClick={submitReviewHandler}
            className={`px-5 py-2 bg-[#cf8f24] rounded-md text-white font-semibold`}
          >
            Submit Review
          </button>
          <p className={`my-auto text-red-500 font-semibold text-lg underline`}>{msg}</p>
        </div>
      </div>
    </>
  );
}

const StarRating = ({ rating, onChange, setMsg }) => {
  const maxRating = 5;

  const handleClick = (selectedRating: number) => {
    if (onChange) {
      onChange(selectedRating);
    }
  };

  return (
    <div className="flex items-center"  onClick={() => {setMsg("")}}>
      {Array.from({ length: maxRating }, (_, index) => (
        <StarIcon
          key={index}
          className={`h-10 w-10 cursor-pointer ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleClick(index + 1)}
        />
      ))}
    </div>
  );
};
