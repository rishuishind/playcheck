import NearbyPlaces from "../../Place/NearbyPlaces";
import GridOverlay from "@/components/widgets/Overlay/GridOverlay";

type Props = {
  hotelName: string;
  hotelCity: string;
  nearbyPlacesList: any[];
  setShowAllPlaces: Function;
  showAllPlaces: boolean;
};

export default function NearbyPlacesSection({
  hotelName,
  hotelCity,
  nearbyPlacesList,
  setShowAllPlaces,
  showAllPlaces,
}: Props) {
  return (
    <>
      {nearbyPlacesList.length > 0 && (
        <div id="nearby-places" className="navLink p-4 xl:px-0">
          <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
            Best Places to Visit Nearby {hotelName} in {hotelCity}
          </h2>

          <NearbyPlaces placeList={nearbyPlacesList} showAllPlaces={false} />

          <div
            onClick={() => setShowAllPlaces((prev: any) => !prev)}
            className="mt-1 cursor-pointer text-right font-bold tracking-wide text-secondary sm:text-left"
          >
            {showAllPlaces ? "Show Less -" : "Show More +"}
          </div>

          {showAllPlaces && (
            <GridOverlay
              modelState={showAllPlaces}
              setModelState={setShowAllPlaces}
              dataList={nearbyPlacesList}
              keyValue={"places"}
              heading={"Places Nearby"}
            />
          )}
        </div>
      )}
    </>
  );
}
