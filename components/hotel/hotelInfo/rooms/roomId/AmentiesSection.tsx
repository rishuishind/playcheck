import Amenities from "@/components/hotel/Amenity/Amenities";

type Props = {
  amenitiesList: any[];
  setShowAllAmenities: Function;
  showAllAmenities: boolean;
};

export default function AmentiesSection({
  amenitiesList,
  setShowAllAmenities,
  showAllAmenities,
}: Props) {
  return (
    <>
      {amenitiesList.length > 0 && (
        <div id="amenities" className="navLink p-4 xl:px-0">
          <h2 className="mb-2 tracking-wider md:text-2xl md:font-bold md:leading-none">
            Room Amenities
          </h2>

          <Amenities amenityList={amenitiesList} seeAllAmenities={true} />

          {/* <div
            onClick={() => setShowAllAmenities((prev) => !prev)}
            className="mt-1 cursor-pointer text-right font-bold tracking-wide text-secondary sm:text-left"
          >
            {showAllAmenities ? "Show Less -" : "Show More +"}
          </div>

          {showAllAmenities && (
            <GridOverlay
              modelState={showAllAmenities}
              setModelState={setShowAllAmenities}
              dataList={props.roomDetails.hotelRoom_Amenities_List}
              keyValue={"amenities"}
              heading={"Room Amenities"}
            />
          )} */}
        </div>
      )}
    </>
  );
}
