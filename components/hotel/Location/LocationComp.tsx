import Image from "next/image";

const LocationCard = ({ imgUrl, name, distance }) => {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 p-4">
      <div className="relative h-10 w-10 flex-shrink-0">
        {
          <Image
            src={imgUrl}
            alt="nearby_location_icon"
            width={40}
            height={40}
            className="h-full w-full"
          />
        }
      </div>
      <div className="flex flex-col">
        {
          <>
            <h3 className="text-sm font-medium lg:text-base">{name}</h3>
            <p className="text-sm text-gray-600 lg:text-base">{distance}</p>
          </>
        }
      </div>
    </div>
  );
};

const LocationCamp = ({ hotelData, hotelName }) => {
  return (
    <>
      <h2 className="mb-4 ml-4 mt-8 font-bold md:text-xl">
        {`Location at ${hotelName}`}
      </h2>
      <div className="mb-8 mt-4 rounded-lg border-2 p-4">
        <div className="mb-7 flex w-fit gap-4 rounded-lg border border-gray-300 p-2">
          <svg
            className="h-5 w-5 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 0c4.418 0 8 3.582 8 8s-8 12-8 12-8-7.582-8-12 3.582-8 8-8zm0 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
          </svg>
          {
            <p className="tracking-wider md:leading-none">
              {hotelData?.hotel_Address}
            </p>
          }
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-4 xl:space-y-7">
            <LocationCard
              imgUrl={`/icons/location/railway.svg`}
              name={hotelData?.hotel_Near_Railway_Station?.name}
              distance={`Railway Station (${hotelData?.hotel_Near_Railway_Station?.distance}KM)`}
            />
            <LocationCard
              imgUrl={`/icons/location/bus.svg`}
              name={hotelData?.hotel_Near_Bus_Station?.name}
              distance={`Bus Stand (${hotelData?.hotel_Near_Bus_Station?.distance}KM)`}
            />
            <LocationCard
              imgUrl={`/icons/location/airport.svg`}
              name={hotelData?.hotel_Near_Airport?.name}
              distance={`Airport (${hotelData?.hotel_Near_Airport?.distance}KM)`}
            />
          </div>

          <div className="w-full">
            {
              <iframe
                title="Map display"
                className="aspect-video w-full rounded-xl"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAGvy5rBo-MPjD0vR2BkkRhtKAXmFHCLVY&q=${encodeURIComponent(
                  hotelData?.hotel_Address,
                )}`}
                allowFullScreen
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationCamp;
