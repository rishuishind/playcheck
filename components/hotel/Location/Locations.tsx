import Image from "next/image";

type Props = {
  hotelNearAirport: any;
  hotelNearBusStation: any;
  hotelNearRailwayStation: any;
};

export default function Locations(props: Props) {
  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <LocationCard
        imgUrl={`/icons/location/railway.svg`}
        name={props.hotelNearRailwayStation.name}
        distance={props.hotelNearRailwayStation.distance}
      />
      <LocationCard
        imgUrl={`/icons/location/bus.svg`}
        name={props.hotelNearBusStation.name}
        distance={props.hotelNearBusStation.distance}
      />
      <LocationCard
        imgUrl={`/icons/location/airport.svg`}
        name={props.hotelNearAirport.name}
        distance={props.hotelNearAirport.distance}
      />
    </div>
  );
}

const LocationCard = ({ imgUrl, name, distance }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-10 w-10">
        <Image
          src={imgUrl}
          alt="nearby_location_icon"
          width={40}
          height={40}
          className="h-full w-full"
        />
      </div>
      <div className="w-full py-2 text-center">
        <h3 className="text-center text-sm font-medium lg:text-base">
          {name} <span className="hidden">{distance} km</span>
        </h3>
        <p className="text-sm text-gray-600 lg:text-base">{distance} km</p>
      </div>
    </div>
  );
};
