import Image from "next/image";
import { HotelRoomPlanInformation } from "@/lib/classModels/hotels/hotelRoomPlanInfo";
import React, { useState } from "react";
import CustomisePlanModel from "./CustomisePlanModel";
import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRoomMapping,
  selectRoomPlanMapping,
  selectRoomsList,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectTotalChildrenCount,
  selectTotalGuestsCount,
  removeSameRoomPlanType,
  selectHotelBookingInfo,
} from "@/lib/redux/bookingSlice";
import { RoomDetails } from "@/lib/classModels/bookings/roomDetails";
import { XIcon } from "@heroicons/react/solid";

type Props = {
  planDetails: HotelRoomPlanInformation;
  roomDetails: HotelRoomInformation;
  handleSelect: (plan: any) => void;
};

export default function PlanCard({
  planDetails,
  roomDetails,
  handleSelect,
}: Props) {
  const dispatch = useDispatch();
  const bookingInfo = useSelector(selectHotelBookingInfo);
  const [customisePlan, setCustomisePlan] = useState<boolean>(false);
  const [roomOptions, setRoomOptions] = useState<boolean>(false);

  // get data from the redux
  const searchedGuests = useSelector(selectSearchedGuestsCount);
  const searchedChildren = useSelector(selectSearchedChildrenCount);
  const selectedGuests = useSelector(selectTotalGuestsCount);
  const selectedChildrens = useSelector(selectTotalChildrenCount);
  const selectBookingCardRoomsList = useSelector(selectRoomsList);
  const roomPlanMapping = useSelector(selectRoomPlanMapping);
  const roomMapping = useSelector(selectRoomMapping);

  function handleOptionSelect() {
    if (
      roomMapping[roomDetails.hotelRoom_Id] &&
      roomMapping[roomDetails.hotelRoom_Id]["room_count"] >=
        roomDetails.hotelRoom_Count
    ) {
      alert(
        `Maximum number of '${roomDetails.hotelRoom_Type}' has been added!`,
      );
      return;
    }

    if (
      searchedChildren > selectedChildrens ||
      searchedGuests > selectedGuests
    ) {
      setCustomisePlan(!customisePlan);
    } else {
      handleSelect(planDetails);
    }
  }

  const removeRoomPlanTypeHandler = () => {
    const list: RoomDetails[] = selectBookingCardRoomsList.filter(
      (room: RoomDetails, index: number) =>
        room.plan_Id === planDetails.roomPlan_Id &&
        room.room_Id === roomDetails.hotelRoom_Id,
    );

    if (list.length === 0) {
      return;
    }

    dispatch(removeSameRoomPlanType({ roomPlanInfo: list[list.length - 1] }));
  };

  // Check if data exists in roomPlanMapping
  const roomPlanId = `${roomDetails.hotelRoom_Id}-${planDetails.roomPlan_Id}`;
  const availablePlanData = roomPlanMapping[roomPlanId];

  return (
    <>
      {customisePlan && (
        <CustomisePlanModel
          modelState={customisePlan}
          planDetails={planDetails}
          roomDetails={roomDetails}
          handleClose={() => setCustomisePlan(!customisePlan)}
        />
      )}

      {/* {roomOptions && (
        <RoomOptionsComponent
          roomList={selectBookingCardRoomsList}
          onClose={() => setRoomOptions(!roomOptions)}
        />
      )} */}

      <div className="relative rounded-xl border-2 p-2.5">
        <div className="w-full space-y-0.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm-body-text-bold font-semibold xl:text-lg xl:leading-5">
              {planDetails.roomPlan_Name}
            </h3>
            <p className="font-bold text-secondary text-lg">
              &#8377;{" "}
              {Math.ceil(planDetails.roomPlan_Price_Group.plan_Base_Price)}
            </p>
          </div>
          {/* <h4 className="line-clamp-1 font-medium">
            {planDetails.roomPlan_Info}
          </h4> */}
        </div>

        <div className="flex justify-between space-x-[5px] text-center font-medium">
          <div className="flex w-full flex-col items-start justify-between">
            <h4 className="line-clamp-1 font-medium">
              {planDetails.roomPlan_Info}
            </h4>
            <button
              onClick={() => setCustomisePlan(!customisePlan)}
              className="underline underline-offset-4 hover:text-secondary"
            >
              Add adult / child
            </button>
          </div>
          <div
            className={`mt-1.5 flex flex-col-reverse justify-between space-x-20`}
          >
            {!availablePlanData && (
              <button
                onClick={handleOptionSelect}
                className={`flex items-center justify-center space-x-[2px] rounded-full border-[1px] border-primary bg-primary/50 px-4 py-1.5 align-middle font-medium text-black transition-all hover:bg-primary hover:text-secondary`}
              >
                <span className="flex whitespace-nowrap text-sm font-semibold">
                  {"Add Room"}
                </span>
                <Image
                  alt="down"
                  src="/icons/drop-down.svg"
                  className="h-2 w-2"
                  height={10}
                  width={10}
                />
              </button>
            )}
            {roomPlanMapping[roomPlanId] !== undefined && (
              <div className="relative flex rounded-full bg-primary text-white">
                <button
                  onClick={removeRoomPlanTypeHandler}
                  className="flex w-7 items-center justify-center rounded-l-full px-5 py-[5px] align-middle text-2xl font-bold"
                >
                  -
                </button>
                <div className="my-auto flex flex-col items-center border-secondary px-1 align-middle text-sm font-semibold">
                  <span className="whitespace-nowrap">{`${availablePlanData?.room_count} ${availablePlanData?.room_count > 1 ? "rooms" : "room"}`}</span>
                  <div className="flex flex-col md:flex-row">
                    <span className="whitespace-nowrap">{`${availablePlanData?.guest_count} ${availablePlanData?.guest_count > 1 ? "adults" : "adult"}`}</span>
                    {availablePlanData?.child_count > 0 && (
                      <span className="whitespace-nowrap">{`, ${availablePlanData?.child_count} child`}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleOptionSelect}
                  className="flex w-7 items-center justify-center rounded-r-full px-5 py-[2px] align-middle text-2xl font-bold"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const RoomOptionsComponent = ({
  onClose,
  roomList,
}: {
  onClose: Function;
  roomList: RoomDetails[];
}) => {
  return (
    <div className="absolute right-0 z-10 mr-28 mt-10 w-[300px] space-y-2 rounded-md bg-gray-400 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-secondary">
            {/* add room image */}
          </div>
          <h3>{roomList[0].room_Name}</h3>
        </div>

        <button onClick={() => onClose()}>
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="w-full space-y-2 rounded-md bg-white p-2">
        {roomList.map((info, index) => (
          <div
            className={`room-option flex items-center justify-between gap-4 ${index === roomList.length - 1 ? "" : "border-b-2 pb-2"}`}
            key={info.plan_Info}
          >
            <div className="room-option-details flex w-full items-center justify-between text-xs">
              <div>
                <h4 className="font-semibold tracking-wide">
                  {info.plan_Name}
                </h4>
                <p>{info.num_Guests} Adults</p>
                {info.num_Children > 0 && <p>{info.num_Children} Child</p>}
              </div>
            </div>
            <div className="text-center">
              <button className="add-button rounded-full bg-primary p-1 text-sm">
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        <div className="text-right">
          <button
            onClick={() => onClose()}
            className="rounded-md bg-secondary p-1 px-4 text-sm text-light"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
