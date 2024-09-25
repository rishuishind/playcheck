import BottomOverlay from "@/components/widgets/Overlay/BottomOverlay";
import UserRatings from "../Rating/UserRatings";

type Props = {
  hotelName: string;
  hotelCity: string;
  googleReviewsList: any[];
  googleRating: number;
  googleRatingCount: number;
  googleRatingDistribution: {
    [key: string | number | symbol]: any;
  };
  showAllReviews: boolean;
  setShowAllReviews: any;
};

export default function ReviewsSection({
  hotelCity,
  hotelName,
  googleReviewsList,
  googleRating,
  googleRatingCount,
  googleRatingDistribution,
  showAllReviews,
  setShowAllReviews,
}: Props) {
  return (
    <>
      {!!googleReviewsList?.length && (
        <div id="reviews" className="navLink">
          <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
            Reviews / Ratings of {hotelName} in {hotelCity}
          </h2>

          <div className="">
            <UserRatings
              googleRating={googleRating}
              googleReviewList={googleReviewsList}
              RetingsCount={googleRatingCount}
              RatingDistribution={googleRatingDistribution}
              showAllReviews={showAllReviews}
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAllReviews(true)}
            className="mt-2 bg-secondary p-2 px-4 font-medium tracking-wide text-white hover:bg-secondary hover:opacity-90"
          >
            Show all Reviews
          </button>

          {showAllReviews && (
            <BottomOverlay
              modelState={showAllReviews}
              reviewList={googleReviewsList}
              setModelState={setShowAllReviews}
              heading={"Hotel Reviews"}
            />
          )}
        </div>
      )}
    </>
  );
}
