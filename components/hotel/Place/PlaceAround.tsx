const PlaceAround = ({ hotelPlaceAround, hotelName }) => {
  return (
    <>
      <h2 className="mb-4 ml-4 mt-8 font-bold md:text-xl">
        {`Nearby Places at ${hotelName}`}
      </h2>
      <div className="mb-8 mt-4 grid grid-cols-1 gap-4 rounded-lg border-2 sm:grid-cols-2 md:grid-cols-3">
        {hotelPlaceAround.map(({ place_Name }) => (
          <div key={place_Name} className="flex items-center gap-4 p-4">
            <svg
              className="h-5 w-5 fill-current text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 0c4.418 0 8 3.582 8 8s-8 12-8 12-8-7.582-8-12 3.582-8 8-8zm0 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
            <h2 className="font-medium">{place_Name}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlaceAround;
