import { useEffect, useState } from "react";
import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
import { HotelRoomPlanInformation } from "@/lib/classModels/hotels/hotelRoomPlanInfo";
import { PageRouterQueryParams } from "@/lib/classModels/queryParams/PageRouterQueryParams";
import { useRouter } from "next/router";
import { routerToRoomDetailPage } from "@/lib/handlers/pageHandler";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  addRoom,
  selectCheckInDate,
  selectCheckOutDate,
  selectSearchedAdultsCount,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectSearchedRoomsCount,
} from "@/lib/redux/bookingSlice";
import {
  convertChildArrayOfObjectsIntoArrayOfNumbers,
  convertChildArrayToString,
  convertChildStringToArray,
  convertChildUrlQueryIntoArrayOfObjects,
  getDateDifference,
} from "@/lib/helper";
// import { InformationCircleIcon } from "@heroicons/react/solid";
import PlanCard from "./PlanCard";
import { toast } from "sonner";
import Image from "next/image";
import { HotelAmenityInformation } from "@/lib/classModels/hotels/hotelAmenityInfo";
import RoomOverlay from "@/components/widgets/Overlay/RoomOverlay";
import dynamic from "next/dynamic";

const InformationCircleIcon = dynamic(
  () => import("@heroicons/react/solid/InformationCircleIcon"),
);

type Props = {
  roomInfo: HotelRoomInformation;
  hotelSlugName: string;
  hotel_Amenities_List: HotelAmenityInformation[];
};

export default function RoomInfo(props: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  // import data from redux store
  const checkInDate = useSelector(selectCheckInDate);
  const checkOutDate = useSelector(selectCheckOutDate);
  const searchedGuestCount = useSelector(selectSearchedGuestsCount);
  const searchedAdultCount = useSelector(selectSearchedAdultsCount);
  const searchedRoomsCount = useSelector(selectSearchedRoomsCount);
  const searchedChildrenCount = useSelector(selectSearchedChildrenCount);
  const [loadMainImage, setLoadMainImage] = useState<boolean>(true);
  // extract childAges from the router query
  const [child_age, setChild_age] = useState<any[]>(
    router.query?.child_age != ""
      ? convertChildUrlQueryIntoArrayOfObjects(router.query?.child_age as any[])
      : [],
  );

  useEffect(() => {
    setChild_age(
      convertChildUrlQueryIntoArrayOfObjects(router.query?.child_age as any[]),
    );
  }, [router.query]);

  // hotel booking function
  const handleGoToRoomIdPage = () => {
    let params = new PageRouterQueryParams(router);
    params.hotelSlugName = router.query.hotelInfo + "";
    params.roomId = props.roomInfo.hotelRoom_Id;
    params.checkin = checkInDate;
    params.checkout = checkOutDate;
    params.num_nights = getDateDifference(checkInDate, checkOutDate);
    params.num_rooms = searchedRoomsCount;
    params.num_adults = searchedAdultCount;
    params.num_children = searchedChildrenCount;
    params.num_guests = searchedGuestCount;
    params.child_age = convertChildArrayOfObjectsIntoArrayOfNumbers(child_age);

    routerToRoomDetailPage(params);
  };

  // Funtion to select a room
  const handlePlanSelect = (plan: any) => {
    dispatch(
      addRoom({
        roomInfo: props.roomInfo,
        planInfo: plan,
        adultCount: 0,
        childCount: 0,
        childAgeList: [],
      }),
    );

    toast.success(
      <div>
        <p>
          {props.roomInfo.hotelRoom_Type} with {plan.roomPlan_Name} added
        </p>
        <p>{plan.roomPlan_Info}</p>
      </div>,
    );
  };

  // sate and function for roomDetails Model
  const [roomDetails, setRoomDetails] = useState<boolean>(false);
  return (
    <>
      {roomDetails && (
        <RoomOverlay
          modelState={roomDetails}
          setModelState={setRoomDetails}
          roomInfo={props.roomInfo}
          hotelAmenitiesList={props.hotel_Amenities_List}
        />
      )}

      <div className="overflow-hidden rounded-xl ">
        <div className="flex gap-4">
          {/* room gallery */}
          <div
            onClick={() => setRoomDetails(true)}
            className="relative aspect-video w-full overflow-hidden rounded-xl md:order-1 lg:hidden lg:w-1/2"
          >
            {props.roomInfo.hotelRoom_Image_Url ? (
              <Image
                alt={"hotel_Main_Image"}
                src={props.roomInfo.hotelRoom_Image_Url}
                width={160}
                height={90}
                priority
                className="h-full w-full object-cover"
              />
            ) : (
              <Skeleton height="100%" />
            )}
            {/* <ImageGallery
              imagesList={props.roomInfo.hotelRoom_Images_Object_List}
              showMoreButton={true}
              roomsList={[]}
              isHotelPage={false}
              loadMainImage={loadMainImage}
              setLoadMainImage={setLoadMainImage}
            /> */}
          </div>

          {/* room information */}
          <div className="flex w-full flex-col justify-between space-y-1 md:order-2 lg:w-1/2">
            <div>
              <div
                onClick={() => setRoomDetails(true)}
                className="flex cursor-pointer items-center justify-between gap-x-1"
              >
                <h2 className="truncate whitespace-nowrap text-sm-body-text-bold font-bold xl:text-lg">
                  {props.roomInfo.hotelRoom_Type}
                </h2>
                <InformationCircleIcon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="items-center justify-between lg:flex">
                <div className="w-full">
                  <p>{props.roomInfo.hotelRoom_Info}</p>
                  <p>{props.roomInfo.hotelRoom_Guest_Count} guests / room</p>
                </div>
                <button
                  onClick={handleGoToRoomIdPage}
                  className="hidden whitespace-nowrap rounded border-2 px-2 py-1 font-medium hover:text-primary lg:block"
                >
                  View room
                </button>
              </div>
            </div>

            <div className="w-full text-right lg:hidden">
              <button
                onClick={handleGoToRoomIdPage}
                className="rounded border-2 px-2 py-1 font-medium hover:text-primary"
              >
                View room
              </button>
            </div>
          </div>
        </div>

        {/* map room plans */}
        <div className="mt-4 gap-4 lg:flex">
          <div
            onClick={() => setRoomDetails(true)}
            className="hidden aspect-video w-full overflow-hidden rounded-xl lg:block lg:w-1/2"
          >
            {/* <ImageGallery
              imagesList={props.roomInfo.hotelRoom_Images_Object_List}
              showMoreButton={false}
              roomsList={[]}
              isHotelPage={false}
              loadMainImage={loadMainImage}
              setLoadMainImage={setLoadMainImage}
            /> */}
            {props.roomInfo.hotelRoom_Image_Url ? (
              <Image
                alt={"hotel_Main_Image"}
                src={props.roomInfo.hotelRoom_Image_Url}
                width={1600}
                height={900}
                priority
                className="h-full w-full object-cover"
              />
            ) : (
              <Skeleton height="100%" />
            )}
          </div>
          <div className="flex w-full flex-col gap-3 lg:w-1/2">
            {props.roomInfo.hotelRoom_Plans_List.map(
              (plan: HotelRoomPlanInformation, index: number) => (
                <PlanCard
                  key={index}
                  planDetails={plan}
                  roomDetails={props.roomInfo}
                  handleSelect={handlePlanSelect}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
