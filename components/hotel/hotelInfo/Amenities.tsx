import GridOverlay from "@/components/widgets/Overlay/GridOverlay";
import Amenities from "@/components/hotel/Amenity/Amenities";

type Props = {
  hotelName: string;
  hotelCity: string;
  amenitiesList: any[];
  showAllAmenities: boolean;
  setShowAllAmenities: Function;
};

export default function AmenitiesSection({
  hotelName,
  hotelCity,
  amenitiesList,
  showAllAmenities,
  setShowAllAmenities,
}: Props) {
  // slice few data to map
  const lessData = amenitiesList?.slice(0, Math.min(16, amenitiesList.length));

  return (
    <>
      {!!amenitiesList?.length && (
        <div id="amenities" className="navLink">
          <h2 className="mb-2 font-bold tracking-wider md:text-2xl md:leading-none">
            Amenities of {hotelName} in {hotelCity}
          </h2>

          <Amenities amenityList={lessData} seeAllAmenities={true} />

          <button
            type="button"
            onClick={() => setShowAllAmenities(true)}
            className="mt-2 bg-secondary p-2 px-4 font-medium tracking-wide text-white hover:bg-secondary hover:opacity-90"
          >
            Show All Amenities
          </button>

          {showAllAmenities && (
            <GridOverlay
              modelState={showAllAmenities}
              setModelState={setShowAllAmenities}
              dataList={amenitiesList}
              keyValue={"amenities"}
              heading={"Hotel Amenities"}
            />
          )}
        </div>
      )}
    </>
  );
}
