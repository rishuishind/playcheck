import RoomRatingProgress from "../progress/CircularProgress";
import ReviewCard from "./ReviewCard";

type Props = {
  googleRating: number;
  googleReviewList: any[];
  RetingsCount: number;
  RatingDistribution: {
    [key: string | number | symbol]: any;
  };
  showAllReviews: boolean;
};

interface ExtractedReview {
  review_id: string;
  Rooms: number;
  Service: number;
  Location: number;
}

export default function UserRatings({
  googleRating,
  googleReviewList,
  RetingsCount,
  RatingDistribution,
  showAllReviews,
}: Props) {
  const fewReviews = googleReviewList.slice(
    0,
    Math.min(googleReviewList.length, 7),
  );

  // Function to extract specific data using regex
  function extractKeyValue(reviewList: any[]) {
    // variable to store the data
    const details: ExtractedReview[] = [];

    // run a loop
    reviewList.forEach((review) => {
      const comment = review.user_comment;
      const roomsMatch = comment.match(/Rooms:\s*(\d+(\.\d+)?)/);
      const serviceMatch = comment.match(/Service:\s*(\d+(\.\d+)?)/);
      const locationMatch = comment.match(/Location:\s*(\d+(\.\d+)?)/);

      if (roomsMatch && serviceMatch && locationMatch) {
        const rooms = parseFloat(roomsMatch[1]);
        const service = parseFloat(serviceMatch[1]);
        const location = parseFloat(locationMatch[1]);

        if (!isNaN(rooms) && !isNaN(service) && !isNaN(location)) {
          const reviewDetail: ExtractedReview = {
            review_id: review.review_id,
            Rooms: rooms,
            Service: service,
            Location: location,
          };
          details.push(reviewDetail);
        }
      }
    });

    return details;
  }

  const filteredReview = extractKeyValue(googleReviewList);

  const getStarBackgroundColor = (stars: number) => {
    switch (stars) {
      case 1:
        return "bg-yellow-100"; // 1 star - red
      case 2:
        return "bg-yellow-200"; // 2 stars - orange
      case 3:
        return "bg-yellow-300"; // 3 stars - yellow
      case 4:
        return "bg-yellow-400"; // 4 stars - green
      case 5:
        return "bg-yellow-500"; // 5 stars - blue
      default:
        return "bg-yellow-500"; // default gray
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="flex w-full items-center gap-4">
          <div className="flex aspect-square w-fit flex-col justify-center rounded-lg bg-primary p-4 text-center text-white">
            <p className="pb-0.5 text-3xl font-bold tracking-wider">
              {(+googleRating).toFixed(1)}/5
            </p>
            <p className="text-sm font-medium tracking-wide lg:text-base">
              {RetingsCount} Ratings
            </p>
          </div>
          <div className="w-full space-y-1">
            {Object.entries(RatingDistribution)
              .sort(
                ([ratingA], [ratingB]) => parseInt(ratingB) - parseInt(ratingA),
              )
              .map(([stars, count]) => {
                const starRating = parseInt(stars);
                return (
                  <div key={stars} className="flex items-center">
                    <p className="w-8 text-center font-medium">{starRating}</p>
                    <div className="flex-start flex h-1 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`flex h-full items-center justify-center overflow-hidden break-all rounded-full ${getStarBackgroundColor(starRating)}`}
                        style={{
                          width: `${(count / RetingsCount) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="w-16 whitespace-nowrap pl-2 font-medium">
                      {count}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full pb-4">
          <RoomRatingProgress reviews={filteredReview} />
        </div>
      </div>

      <div className="container-snap mt-3 flex w-full gap-3 overflow-x-scroll">
        {showAllReviews ? (
          <>
            {googleReviewList.length > 0 &&
              googleReviewList.map((review: any, index: number) => (
                <ReviewCard
                  key={index}
                  user_image_url={review.user_image_url}
                  user_name={review.user_name}
                  review_type_name={review.review_type.review_type_name}
                  user_comment={review.user_comment}
                  user_rating={review.user_rating}
                  review_posting_time={review.review_posting_time}
                />
              ))}
          </>
        ) : (
          <>
            {fewReviews.map((review: any, index: number) => (
              <ReviewCard
                key={index}
                user_image_url={review.user_image_url}
                user_name={review.user_name}
                review_type_name={review.review_type.review_type_name}
                user_comment={review.user_comment}
                user_rating={review.user_rating}
                review_posting_time={review.review_posting_time}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
