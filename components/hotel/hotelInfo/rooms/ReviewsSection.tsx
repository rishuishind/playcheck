import BottomOverlay from "@/components/widgets/Overlay/BottomOverlay";
import UserRatings from "../../Rating/UserRatings";

type Props = {
  hotelName: string;
  hotelCity: string;
  googleReviewsList: any[];
  googleRating: number;
  ratingsCount: number;
  ratingDistribution: {
    [key: string | number | symbol]: any;
  };
  setShowAllReviews: Function;
  showAllReviews: boolean;
};

export default function ReviewsSection({
  hotelName,
  hotelCity,
  googleReviewsList,
  googleRating,
  ratingsCount,
  ratingDistribution,
  setShowAllReviews,
  showAllReviews,
}: Props) {
  return (
    <>
      {!!googleReviewsList?.length && (
        <div id="reviews" className="navLink p-4 xl:px-0">
          <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
            Reviews / Ratings of {hotelName} in {hotelCity}
          </h2>
          <UserRatings
            googleRating={googleRating}
            googleReviewList={googleReviewsList}
            RetingsCount={ratingsCount}
            RatingDistribution={ratingDistribution}
            showAllReviews={showAllReviews}
          />

          <button
            onClick={() => setShowAllReviews(true)}
            className="text-sm font-medium tracking-wider"
          >
            Show all reviews
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
