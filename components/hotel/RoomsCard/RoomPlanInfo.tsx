import { useDispatch, useSelector } from "react-redux";
import { addRoom, selectRoomPlanMapping } from "@/lib/redux/bookingSlice";
import { HotelRoomInformation } from "@/lib/classModels/hotels/hotelRoomInfo";
import { HotelRoomPlanInformation } from "@/lib/classModels/hotels/hotelRoomPlanInfo";
import Image from "next/image";
import { useState } from "react";
import CustomisePlanModel from "./CustomisePlanModel";
import { toast } from "sonner";

type Props = {
  planIndex: number;
  hotelSlugName: string;
  roomInfo: HotelRoomInformation;
  planInfo: HotelRoomPlanInformation;
};

export const RoomPlanInfo = (props: Props) => {
  const dispatch = useDispatch();
  const addPlanPriceHandler = async () => {
    dispatch(
      addRoom({
        roomInfo: props.roomInfo,
        planInfo: props.planInfo,
        adultCount: 0,
        childCount: 0,
        childAgeList: []
      }),
    );
    toast.success(
      <div>
        <p>
          {props.roomInfo.hotelRoom_Type} with {props.planInfo.roomPlan_Name}{" "}
          added
        </p>
        <p>{props.planInfo.roomPlan_Info}</p>
      </div>,
    );
  };

  const [customisePlan, setCustomisePlan] = useState<boolean>(false);
  const handleCustomisePlan = () => {
    setCustomisePlan((prev: any) => !prev);
  };

  // Check if data exists in selectRoomPlanMap
  const selectRoomPlanMap = useSelector(selectRoomPlanMapping);
  const roomPlanId = `${props.roomInfo.hotelRoom_Id}-${props.planInfo.roomPlan_Id}`;
  const availablePlanData = selectRoomPlanMap[roomPlanId];

  return (
    <>
      {customisePlan && (
        <CustomisePlanModel
          modelState={customisePlan}
          planDetails={props.planInfo}
          roomDetails={props.roomInfo}
          handleClose={handleCustomisePlan}
        />
      )}

      <div className="divide-y-2 overflow-hidden rounded-2xl border-2 text-black">
        <div className="flex justify-between bg-green-50 p-2.5">
          <div className="space-y-0.5">
            <h3 className="font-bold text-secondary">
              Plan Type : {props.planInfo.roomPlan_Name}
            </h3>
            <h4 className="truncate py-1 font-medium">
              Plan Info : {props.planInfo.roomPlan_Info}
            </h4>
          </div>
          <p className="font-bold text-secondary">
            &#8377;{" "}
            {Math.ceil(props.planInfo.roomPlan_Price_Group.plan_Base_Price)}
          </p>
          {/* <div className="flex w-full items-center justify-between text-center text-sm font-medium">
            <button
              onClick={handleCustomisePlan}
              className="text-primary underline underline-offset-4 hover:text-secondary"
            >
              Customise
            </button>
            <button
              onClick={addPlanPriceHandler}
              className="rounded-full border-0 bg-secondary p-0.5 px-4 text-white outline-none"
            >
              Select
            </button>
          </div> */}
        </div>

        <div className="flex w-full items-center justify-between p-2.5">
          <p>
            {availablePlanData ? (
              <>
                {availablePlanData.room_count}{" "}
                {availablePlanData.room_count > 1 ? "rooms" : "room"},{" "}
                {availablePlanData.guest_count}{" "}
                {availablePlanData.guest_count > 1 ? "adults" : "adult"}
                {availablePlanData.child_count > 0 && (
                  <>
                    , {availablePlanData.child_count}{" "}
                    {availablePlanData.child_count > 1 ? "children" : "child"}
                  </>
                )}
              </>
            ) : null}
          </p>
          <button
            onClick={handleCustomisePlan}
            className="rounded-full border-0 bg-secondary p-2 px-4 text-white focus:ring-0"
          >
            {availablePlanData
              ? `${availablePlanData.room_count} ${availablePlanData.room_count > 1 ? "rooms" : "room"} added`
              : "Add Room"}
          </button>
        </div>
      </div>
    </>
  );
};
