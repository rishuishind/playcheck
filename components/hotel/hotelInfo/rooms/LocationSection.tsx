import Locations from "../../Location/Locations";

type Props = {
  hotelName: string;
  hotelCity: string;
  hotelAddress: string;
  hotelNearAirport: any;
  hotelNearBusStation: any;
  hotelNearRailwayStation: any;
};

export default function LocationSection({
  hotelName,
  hotelCity,
  hotelAddress,
  hotelNearAirport,
  hotelNearBusStation,
  hotelNearRailwayStation,
}: Props) {
  return (
    <div id="location" className="navLink p-4 xl:px-0">
      <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
        Location of {hotelName} in {hotelCity}
      </h2>

      <div className="flex flex-col gap-4 lg:flex-row">
        <iframe
          title="Map display"
          className="aspect-video w-full rounded-xl lg:w-1/2"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAGvy5rBo-MPjD0vR2BkkRhtKAXmFHCLVY&q=${encodeURIComponent(hotelAddress)})}`}
          allowFullScreen
        />
        <div className="flex w-full flex-col justify-between gap-7 lg:w-1/2 lg:flex-row">
          <div className="w-full space-y-4 xl:space-y-7">
            <Locations
              hotelNearAirport={hotelNearAirport}
              hotelNearBusStation={hotelNearBusStation}
              hotelNearRailwayStation={hotelNearRailwayStation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
