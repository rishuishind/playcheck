import { RoomDetails } from "@/lib/classModels/bookings/roomDetails";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { removeRoom } from "@/lib/redux/bookingSlice";

type Props = {
  planInfo: RoomDetails;
  planIndex: number;
};

export default function BookingPriceCard(props: Props) {
  const dispatch = useDispatch();

  const removeHotelPlan = () => {
    dispatch(
      removeRoom({ planIndex: props.planIndex, roomPlanInfo: props.planInfo }),
    );
  };

  return (
    <div className="flex justify-between p-2 border-2 rounded-lg">
      <div className="max-w-[90%] space-y-0.5">
        <p className="line-clamp-1 font-bold">{props.planInfo.room_Name}</p>
        <p className="truncate text-secondary">{props.planInfo.plan_Info}</p>
        <div className="flex items-center gap-1 text-md-body-text">
          <p>
            {props.planInfo.room_Count}{" "}
            {props.planInfo.room_Count > 1 ? "Rooms" : "Room"}
          </p>
          <p>
            {", "}
            {props.planInfo.num_Guests}{" "}
            {props.planInfo.num_Guests > 1 ? "Adults" : "Adult"}
          </p>
          {props.planInfo.num_Children > 0 && (
            <p>
              {"& "}
              {props.planInfo.num_Children}{" "}
              {props.planInfo.num_Children > 1 ? "Childrens" : "Child"}
            </p>
          )}
        </div>
      </div>
      <div className="grid place-items-center">
        <XIcon
          onClick={removeHotelPlan}
          className="h-6 w-6 cursor-pointer rounded-full bg-primary p-1"
        />
      </div>
    </div>
  );
}
