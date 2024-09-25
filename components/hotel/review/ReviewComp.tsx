import UserReviews from "../Rating/UserReviews";

const Review = ({ hotelReview, reviews, page, handlePagination }) => {
  const totalPages = reviews?.totalPages || 1;
  const pageNumbersToShow = 5;
  const halfPageNumbersToShow = Math.floor(pageNumbersToShow / 2);

  const startPage = Math.max(
    1,
    Math.min(page - halfPageNumbersToShow, totalPages - pageNumbersToShow + 1),
  );
  const endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);

  return (
    <>
      <h2 className="mb-4 ml-4 mt-8 font-bold md:text-xl">
        {`Reviews at ${hotelReview?.hotel_Name}`}
      </h2>
      <div className="mt-4 rounded-lg border-2 p-2">
        <UserReviews
          googleRating={hotelReview?.hotel_Google_Rating}
          googleReviewList={reviews?.reviews}
          RatingsCount={hotelReview?.hotel_Ratings_Count}
          RatingDistribution={hotelReview?.hotel_Rating_Distribution}
          hotelName={hotelReview?.hotel_Name}
        />
      </div>
      <div className="mb-8 mt-8 flex justify-center">
        <button
          className="mx-1 rounded border border-gray-300 bg-white px-4 py-2 text-blue-500 hover:bg-gray-100"
          onClick={() => handlePagination(1)}
          disabled={page === 1}
        >
          First
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            className={`mx-1 rounded border px-4 py-2 ${
              page === startPage + index
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-300 bg-white text-blue-500 hover:bg-gray-100"
            }`}
            onClick={() => handlePagination(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
        <button
          className="mx-1 rounded border border-gray-300 bg-white px-4 py-2 text-blue-500 hover:bg-gray-100"
          onClick={() => handlePagination(totalPages)}
          disabled={page === totalPages}
        >
          Last
        </button>
      </div>
    </>
  );
};

export default Review;
