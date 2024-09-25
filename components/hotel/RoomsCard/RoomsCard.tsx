import { useEffect, useRef, useState } from "react";
import RoomInfo from "./RoomInfo";
import { ROOMS_INFO_ID } from "@/lib/helper";
import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
import { HotelAmenityInformation } from "@/lib/classModels/hotels/hotelAmenityInfo";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { RoomPlanCard } from "@/components/skeleton/HotelSkeletons";

const ChevronLeftIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronLeftIcon"),
);
const ChevronRightIcon = dynamic(
  () => import("@heroicons/react/solid/ChevronRightIcon"),
);

type Props = {
  openAlertModel: any;
  roomsList: HotelRoomInformation[];
  hotel_Amenities_List: HotelAmenityInformation[];
  hotelSlugName: string;
};

export default function RoomsCard(props: Props) {
  const router = useRouter();

  const [prevRoomTypeList, setPrevRoomTypeList] = useState(() => {
    return convertListToObject(props.roomsList);
  });

  const [isLoading, setIsLoading] = useState(false);

  const [roomTypeList, setRoomTypeList] = useState(() => {
    return convertListToObject(props.roomsList);
  });

  // initially set the activeRoom index to 0
  useEffect(() => {
    const availableRooms = props.roomsList.filter(roomTypeFilterHandler);
    if (availableRooms.length > 0) {
      setActiveRoom(0);
    }
  }, [props.roomsList]);

  useEffect(() => {
    // Add event listeners for route change start and complete
    const handleRouteChangeStart = () => {
      setIsLoading(true); // Show loading skeleton
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false); // Hide loading skeleton
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // Cleanup listeners on unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  // function to return if room type filter is applied
  function roomTypeFilterHandler(room: HotelRoomInformation): boolean {
    let cnt = 0;

    // Loop through the list of room types
    for (let i = 0; i < prevRoomTypeList.length; i++) {
      // Check if the room type is selected for filtering
      if (roomTypeList[i].checked) {
        cnt += 1;
        // Check if the room matches the selected room type or room info
        if (
          prevRoomTypeList[i].value.toLowerCase() ===
            room.hotelRoom_Type.toLowerCase() ||
          prevRoomTypeList[i].value.toLowerCase() ===
            room.hotelRoom_Info.toLowerCase()
        ) {
          return true; // Return true if the room matches any selected room type
        }
      }
    }
    // Return false if no room types are selected (no filters are applied)
    return cnt === 0;
  }

  // function to convert list into object
  function convertListToObject(roomsList: HotelRoomInformation[]) {
    return roomsList.map((room: HotelRoomInformation) => ({
      value: room.hotelRoom_Type,
      checked: false,
      text: room.hotelRoom_Type,
    }));
  }

  // state and function to adda ctive room index and to set the indes
  const [activeRoom, setActiveRoom] = useState<number>(0);
  const handleClick = (index: number) => {
    setActiveRoom(index);
  };

  // get the filtered room list
  const filteredRooms = props.roomsList.filter(roomTypeFilterHandler);

  // store filteredRooms of active index data into the variable
  const activeRoomData = filteredRooms[activeRoom];

  return (
    <>
      {isLoading ? (
        <RoomPlanCard />
      ) : (
        <div id={ROOMS_INFO_ID}>
          {/* Render RoomList Header */}
          <RoomList
            rooms={filteredRooms}
            activeRoom={activeRoom}
            handleClick={handleClick}
          />

          {/* Render RoomInfo component for the active room */}
          {activeRoomData ? (
            <RoomInfo
              key={activeRoomData.hotelRoom_Id}
              roomInfo={activeRoomData}
              hotelSlugName={props.hotelSlugName}
              hotel_Amenities_List={props.hotel_Amenities_List}
            />
          ) : (
            <div className="p-1 font-medium tracking-wide text-red-700 md:p-2">
              <p>All the rooms are sold out for the selected dates</p>
              <p>Please change the dates for booking</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

const RoomList = ({ rooms, activeRoom, handleClick }) => {
  const [showArrows, setShowArrows] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = slideContainerRef.current;
    if (container) {
      // Check if content width exceeds container width
      const isContentOverflowing =
        container.scrollWidth > container.clientWidth;

      // Check if container is scrollable in y-axis
      const isScrollableY = container.scrollHeight > container.clientHeight;

      // Update showArrows state based on conditions
      setShowArrows(isContentOverflowing && !isScrollableY);
    }
  }, [rooms]);

  const nextSlide = () => {
    if (slideContainerRef.current) {
      const cardWidth =
        slideContainerRef.current.querySelector(".snap-start")?.clientWidth ??
        0;

      const currentScroll = slideContainerRef.current.scrollLeft;

      slideContainerRef.current.scrollTo({
        left: currentScroll + cardWidth,
        behavior: "smooth",
      });
    }
  };

  const prevSlide = () => {
    if (slideContainerRef.current) {
      const cardWidth =
        slideContainerRef.current.querySelector(".snap-start")?.clientWidth ??
        0;
      const currentScroll = slideContainerRef.current.scrollLeft;
      slideContainerRef.current.scrollTo({
        left: currentScroll - cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex w-full bg-white">
      {showArrows && (
        <div className="">
          <ChevronLeftIcon
            onClick={prevSlide}
            className={`absolute -left-1 top-1/2 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 shadow-[0px_0px_7px_rgba(0,0,0,0.25)]`}
          />
          <ChevronRightIcon
            onClick={nextSlide}
            className="absolute -right-1 top-1/2 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 shadow-[0px_0px_7px_rgba(0,0,0,0.25)]"
          />
        </div>
      )}

      <div
        className="container-snap mb-4 flex w-full snap-x snap-mandatory overflow-x-scroll"
        ref={slideContainerRef}
      >
        {rooms.map((room: any, index: number) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor-pointer snap-start border-2 p-4 py-2.5 text-center shadow-inner ${
              activeRoom === index ? "border-[3px] border-primary" : ""
            } min-w-[64%] truncate md:min-w-[45%] lg:min-w-[32%]`}
          >
            <p className="text-sm-body-text-bold font-semibold tracking-wide xl:text-lg">
              {room.hotelRoom_Type}
            </p>
            <p>{room.hotelRoom_Info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
