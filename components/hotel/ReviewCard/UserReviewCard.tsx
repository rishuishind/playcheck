import React from "react";
import ReviewInputCard from "./ReviewInputCard";
import ReviewCard from "./ReviewCard";
import { HOTEL_REVIEWS_INFO_ID } from "@/lib/helper";

type Props = {
  hotelId: string;
  hotel_User_Reviews_List: any[];
};

export default function UserReviewCard(props: Props) {
  const [enableCard, setEnableCard] = React.useState<boolean>(false);
  const rateHotelHandler = () => {
    setEnableCard(!enableCard);
  };
  return (
    <>
      <div 
      id={HOTEL_REVIEWS_INFO_ID}
      className={`relative flex flex-col w-full my-4`}>
        <div className={`relative flex justify-between mb-2`}>
          <h2 className={`text-2xl font-serif font-semibold my-auto`}>
            Hotel Reviews
          </h2>
          <button
            onClick={rateHotelHandler}
            className={`text-lg font-medium px-3 py-2 shadow-md hover:shadow-lg`}
          >
            {!enableCard ? "Rate Hotel" : "Cancle Rating"}
          </button>
        </div>
        {enableCard && (
          <ReviewInputCard
            hotelId={props.hotelId}
            setEnableCard={setEnableCard}
            hotel_User_Reviews_List={props.hotel_User_Reviews_List}
          />
        )}
        {enableCard && (
          <h2
            className={`relative w-full font-serif text-2xl px-2 font-medium`}
          >
            Guest Experience Reviews
          </h2>
        )}
        {props.hotel_User_Reviews_List.length > 0 && (
          <div className="flex w-full overflow-x-auto mt-2 py-1 no-scrollbar">
            <div className="flex whitespace-nowrap space-x-4 w-full">
              {props.hotel_User_Reviews_List.map(
                (reviewInfo: any, index: number) => (
                  <ReviewCard
                    key={index}
                    reviewInfo={reviewInfo}
                  />
                )
              )}
            </div>
          </div>
        )}
        {props.hotel_User_Reviews_List.length === 0 && (
          <div className="relative flex w-full h-28 justify-center items-center align-middle my-4 text-center text-3xl font-thin">
            No reviews available
          </div>
        )}
      </div>
    </>
  );
}
