import GridOverlay from "@/components/widgets/Overlay/GridOverlay";
import NearbyPlaces from "@/components/hotel/Place/NearbyPlaces";

type Props = {
  hotelName: string;
  hotelCity: string;
  nearbyPlacesList: any[];
  showAllPlaces: boolean;
  setShowAllPlaces: Function;
};

export default function NearbyPlacesSection({
  hotelName,
  hotelCity,
  nearbyPlacesList,
  showAllPlaces,
  setShowAllPlaces,
}: Props) {
  // slice few data to show
  const lessData = nearbyPlacesList?.slice(
    0,
    Math.min(16, nearbyPlacesList.length),
  );

  return (
    <>
      {!!nearbyPlacesList?.length && (
        <div id="nearby-places" className="navLink xl:px-0">
          <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
            Best Places to Visit Nearby {hotelName} in {hotelCity}
          </h2>

          <NearbyPlaces placeList={lessData} showAllPlaces={false} />

          <button
            type="button"
            onClick={() => setShowAllPlaces(true)}
            className="mt-2 bg-secondary p-2 px-4 font-medium tracking-wide text-white hover:bg-secondary hover:opacity-90"
          >
            Show all Nearby Places
          </button>

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
