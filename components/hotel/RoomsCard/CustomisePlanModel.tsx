import {
  AgeInfo,
  HotelRoomInformation,
} from "@/lib/classModels/hotels/hotelRoomInfo";
import { HotelRoomPlanInformation } from "@/lib/classModels/hotels/hotelRoomPlanInfo";
import {
  addRoom,
  selectRoomMapping,
  selectSearchedAdultsCount,
  selectSearchedChildrenCount,
  selectSearchedGuestsCount,
  selectTotalChildrenCount,
  selectTotalGuestsCount,
} from "@/lib/redux/bookingSlice";
// import { MinusIcon, PlusIcon, XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const XIcon = dynamic(() => import("@heroicons/react/solid/XIcon"));
const MinusIcon = dynamic(() => import("@heroicons/react/solid/MinusIcon"));
const PlusIcon = dynamic(() => import("@heroicons/react/solid/PlusIcon"));

type Props = {
  modelState: boolean;
  planDetails: HotelRoomPlanInformation;
  roomDetails: HotelRoomInformation;
  handleClose: () => void;
};

export default function CustomisePlanModel({
  modelState,
  planDetails,
  roomDetails,
  handleClose,
}: Props) {
  useEffect(() => {
    if (modelState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modelState]);

  const agePriceList = roomDetails.hotelRoom_Max_Age_List;
  const default_Adult_Price_Percentage =
    roomDetails.hotelRoom_Guest_Price_Percentage;
  const average_Adult_Price_Percentage =
    planDetails.roomPlan_Date_Price_List.reduce(
      (avgPercent, planInfo, index) => {
        if (index === planDetails.roomPlan_Date_Price_List.length - 1) {
          avgPercent += planInfo?.plan_Adult_Price_Percentage
            ? planInfo?.plan_Adult_Price_Percentage
            : default_Adult_Price_Percentage;
          avgPercent /= planDetails.roomPlan_Date_Price_List.length;
          return avgPercent;
        } else {
          avgPercent += planInfo?.plan_Adult_Price_Percentage
            ? planInfo?.plan_Adult_Price_Percentage
            : default_Adult_Price_Percentage;
          return avgPercent;
        }
      },
      0,
    );
  const default_Adult_Count = roomDetails.hotelRoom_Guest_Count;
  const min_Adult_Count = roomDetails.hotelRoom_Min_Guest_Occupancy;
  const max_Guest_Count = roomDetails.hotelRoom_Max_Guest_Occupancy;
  const min_Child_Count = 0;
  const max_Child_Count = roomDetails.hotelRoom_Max_Children_Occupancy;
  // const per_Adult_Price = roomDetails.hotelRoom_Guest_Price;
  const per_Adult_Price = planDetails.roomPlan_Date_Price_List.reduce(
    (avgVal, planInfo, index) => {
      if (index === planDetails.roomPlan_Date_Price_List.length - 1) {
        avgVal += Math.ceil(Number(planInfo.plan_Extra_Adult_Price.toFixed(2)));
        avgVal /= planDetails.roomPlan_Date_Price_List.length;
        avgVal = Math.ceil(avgVal);
        return avgVal;
      } else {
        avgVal += Math.ceil(Number(planInfo.plan_Extra_Adult_Price.toFixed(2)));
        return avgVal;
      }
    },
    0,
  );
  const per_Child_Price = roomDetails.hotelRoom_Children_Price;
  const room_Price = planDetails.roomPlan_Price_Group.plan_Base_Price;

  // get data from the redux
  const searchedGuests = useSelector(selectSearchedGuestsCount);
  const searchedAdults = useSelector(selectSearchedAdultsCount);
  const searchedChildren = useSelector(selectSearchedChildrenCount);
  const selectedGuests = useSelector(selectTotalGuestsCount);
  const selectedChildrens = useSelector(selectTotalChildrenCount);
  const roomMapping = useSelector(selectRoomMapping);

  const [numAdults, setNumAdults] = useState<number>(default_Adult_Count);
  const [numChildren, setNumChildren] = useState<number>(0);
  const [totalRoomCost, setTotalRoomCost] = useState<number>(room_Price);

  const [childInfo, setChildInfo] = useState<any[]>([]);

  const dispatch = useDispatch();

  // handle guest count with min-max_Guest_Count
  const handleAdultCount = (value: number) => {
    if (value === 1) {
      if (numChildren + numAdults >= max_Guest_Count) {
        alert(`Maximum guest occupancy for this room is: ${max_Guest_Count}!`);
        return;
      } else if (
        numAdults >= default_Adult_Count &&
        numAdults < max_Guest_Count
      ) {
        setNumAdults(numAdults + 1);
        setTotalRoomCost(totalRoomCost + per_Adult_Price);
      } else if (
        numAdults >= min_Adult_Count &&
        numAdults < default_Adult_Count
      ) {
        setNumAdults(numAdults + 1);
        setTotalRoomCost(
          totalRoomCost +
            Math.ceil(average_Adult_Price_Percentage * 0.01 * room_Price),
        );
      }
    } else {
      if (numAdults > default_Adult_Count && numAdults <= max_Guest_Count) {
        setNumAdults(numAdults - 1);
        setTotalRoomCost(totalRoomCost - per_Adult_Price);
      } else if (
        numAdults > min_Adult_Count &&
        numAdults <= default_Adult_Count
      ) {
        setNumAdults(numAdults - 1);
        setTotalRoomCost(
          totalRoomCost -
            Math.ceil(average_Adult_Price_Percentage * 0.01 * room_Price),
        );
      } else {
        alert(`Minim guest occupancy for this room is: ${min_Adult_Count}!`);
        return;
      }
    }
  };

  // handle children count with min-max_Child_Count
  const handleChildrenCount = (value: number) => {
    if (value === 1) {
      if (numChildren + numAdults >= max_Guest_Count) {
        alert(`Maximum guest occupancy for this room is: ${max_Guest_Count}!`);
        return;
      } else if (numChildren < max_Child_Count) {
        let newList = [
          ...childInfo,
          { idx: childInfo.length, age: 0, price: 0, status: false },
        ];
        setChildInfo(newList);
        setNumChildren(numChildren + 1);

        // if (numChildren >= min_Child_Count) {
        //   if (numAdults >= default_Adult_Count) {
        //     setTotalRoomCost(totalRoomCost + per_Child_Price);
        //   } else {
        //     setTotalRoomCost(
        //       totalRoomCost +
        //         Math.ceil(average_Adult_Price_Percentage * 0.01 * room_Price),
        //     );
        //   }
        // }
      }
    } else {
      if (numChildren > min_Child_Count) {
        let newList = [...childInfo];
        let lastVal = newList.pop();
        setChildInfo(newList);
        setNumChildren(numChildren - 1);

        if (numChildren > min_Child_Count) {
          setTotalRoomCost(totalRoomCost - lastVal.price);
          // if (numAdults < default_Adult_Count) {
          //   setTotalRoomCost(
          //     totalRoomCost - Math.ceil(average_Adult_Price_Percentage * 0.01 * room_Price),
          //   );
          // } else {
          //   setTotalRoomCost(totalRoomCost - per_Child_Price);
          // }
        }
      }
    }
  };

  const childPriceHandler = (event: any, index: number) => {
    let totalRoomCosting = totalRoomCost;
    if (numChildren >= min_Child_Count)
      totalRoomCosting -= childInfo[index].price;

    let newData = [...childInfo];
    let selectedAge = +event.target.value;
    let obj = agePriceList.find(
      (info: AgeInfo) => selectedAge <= +info.max_age,
    );
    newData[index].age = selectedAge;
    if (selectedAge <= 0) newData[index].status = false;
    else newData[index].status = true;
    if (obj) newData[index].price = obj.amount;

    if (numChildren >= min_Child_Count)
      totalRoomCosting += newData[index].price;
    setTotalRoomCost(totalRoomCosting);
    setChildInfo(newData);
  };

  const handleAddRoom = () => {
    if (
      roomMapping[roomDetails.hotelRoom_Id] &&
      roomMapping[roomDetails.hotelRoom_Id]["room_count"] >=
        roomDetails.hotelRoom_Count
    ) {
      alert(
        `Maximum number of '${roomDetails.hotelRoom_Type}' has been added!`,
      );
      handleClose();
      return;
    }

    const childStatus = childInfo.reduce(
      (initial, info) => info.status && initial,
      true,
    );

    if (!childStatus) {
      alert(`Please enter the child age to proceed.`);
      return;
    }

    dispatch(
      addRoom({
        roomInfo: roomDetails,
        planInfo: planDetails,
        adultCount: numAdults,
        childCount: numChildren,
        childAgeList: childInfo,
      }),
    );

    toast.success(
      <div>
        <p>
          {roomDetails.hotelRoom_Type} with {planDetails.roomPlan_Name} added
        </p>
        <p>{planDetails.roomPlan_Info}</p>
      </div>,
    );
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/75 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white">
        <div className="w-full border-b border-secondary p-4 pb-2">
          <div className="flex items-center justify-between">
            <h4 className="flex flex-wrap gap-1 text-lg font-bold text-secondary">
              <span>{roomDetails.hotelRoom_Type}</span>
              <span>({planDetails.roomPlan_Name})</span>
            </h4>
            <XIcon
              onClick={handleClose}
              className="h-6 w-6 cursor-pointer rounded-full bg-secondary fill-white p-1"
            />
          </div>
          <h5 className="line-clamp-1 text-sm font-medium">
            {planDetails.roomPlan_Info}
          </h5>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between px-4 pt-4">
              <p className="font-medium">
                Adults :{" "}
                <span className="font-bold tracking-wide">{numAdults}</span>
                <br />
                <span className="text-sm font-bold text-secondary">
                  min: {min_Adult_Count}
                </span>
                {/* ,&nbsp;
                <span className="text-sm font-bold text-secondary">
                  max: {max_Guest_Count}
                </span> */}
              </p>
              <button className="flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1">
                <MinusIcon
                  onClick={() => handleAdultCount(-1)}
                  className="h-4 w-6 cursor-pointer fill-white"
                />
                <div className="select-none border-0 text-white outline-none">
                  {numAdults}
                </div>
                <PlusIcon
                  onClick={() => handleAdultCount(1)}
                  className="h-4 w-6 cursor-pointer fill-white"
                />
              </button>
            </div>
            {searchedAdults > selectedGuests &&
              searchedAdults - selectedGuests > 1 && (
                <>
                  {searchedAdults > selectedGuests + numAdults && (
                    <p className="px-4 text-xs font-medium tracking-wide text-red-700">
                      you searched for {searchedAdults}{" "}
                      {searchedAdults > 1 ? "adults" : "adult"}, please add{" "}
                      {searchedAdults - selectedGuests} more{" "}
                      {searchedAdults - selectedGuests > 1 ? "adults" : "adult"}
                    </p>
                  )}
                </>
              )}
          </div>
          <div>
            <div className="flex items-center justify-between px-4">
              <p className="font-medium">
                Childrens :{" "}
                <span className="font-bold tracking-wide">{numChildren}</span>
                <br />
                <span className="text-sm font-bold text-secondary">
                  max: {max_Child_Count}
                </span>
              </p>
              <button className="flex items-center gap-2 rounded-full bg-secondary px-2.5 py-1">
                <MinusIcon
                  onClick={() => handleChildrenCount(-1)}
                  className="h-4 w-6 cursor-pointer fill-white"
                />
                <div className="select-none border-0 text-white outline-none">
                  {numChildren}
                </div>
                <PlusIcon
                  onClick={() => handleChildrenCount(1)}
                  className="h-4 w-6 cursor-pointer fill-white"
                />
              </button>
            </div>
            {searchedChildren > selectedChildrens && (
              <>
                {searchedChildren - selectedChildrens > numChildren && (
                  <p className="px-4 text-xs font-medium tracking-wide text-red-700">
                    you searched for {searchedChildren}{" "}
                    {searchedChildren > 1 ? "childrens" : "child"}, Please add{" "}
                    {searchedChildren - selectedChildrens} more{" "}
                    {searchedChildren - selectedChildrens > 1
                      ? "childrens"
                      : "child"}
                  </p>
                )}
              </>
            )}
          </div>
          <div className={`flex items-center px-4`}>
            {`Room max occupancy:`}&nbsp;{" "}
            <span className={`flex text-lg font-semibold`}>
              {max_Guest_Count}
            </span>
            &nbsp;
            <span
              className={`text-md flex font-medium`}
            >{`(adult + child)`}</span>
          </div>

          {/* Children Mapping */}
          {numChildren >= 0 && childInfo.length > 0 && (
            <div className={`flex w-full items-start space-x-4 px-4 align-top`}>
              {Array.from({ length: numChildren }, (_, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-start space-y-1"
                >
                  <div className="relative flex w-full justify-center space-x-[2px]">
                    <span className="text-sm font-semibold">{`Child ${index + 1}`}</span>
                    <p className="text-sm">Age</p>
                  </div>
                  <select
                    id="dropdown"
                    value={childInfo[index].age}
                    className="w-full rounded-full border border-gray-300 bg-white text-gray-700 py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-200 cursor-pointer"
                    onChange={(event) => {
                      childPriceHandler(event, index);
                    }}
                  >
                    <option value={0} className="text-gray-500">Select</option>
                    {Array.from(
                      { length: agePriceList[agePriceList.length - 1].max_age },
                      (_, age) => (
                        <option
                          key={age}
                          value={age + 1}
                          className="text-gray-700 text-lg font-semibold cursor-pointer"
                        >
                          {age + 1} {`${age > 0 ? "years" : "year"}`}
                        </option>
                      ),
                    )}
                  </select>
                  {childInfo[index].age === 0 && (
                    <div className="text-xs text-red-500">{`Select child ${index + 1} age`}</div>
                  )}
                  {/* {childInfo[index].age !== 0 && (
                    <div className="flex w-full font-semibold justify-center text-xs text-secondary">{`₹ ${childInfo[index].price}`}</div>
                  )} */}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between rounded-b-lg bg-gray-100 px-4 pb-4 pt-4">
            <p className="font-medium text-secondary">
              Room Cost:{" "}
              <span className="text-xl font-bold">
                &#8377;{Math.ceil(totalRoomCost)}
              </span>
            </p>
            <button
              onClick={handleAddRoom}
              className="rounded-full bg-primary p-1.5 px-4 font-medium text-black disabled:bg-gray-300"
            >
              Add Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
