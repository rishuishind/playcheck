import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RoomDetails } from "../classModels/bookings/roomDetails";
import { addDays, getDateDifference } from "../helper";
import { RootState } from "@/store";
import { HotelRoomPlanInformation } from "../classModels/hotels/hotelRoomPlanInfo";
import { HotelRoomInformation } from "../classModels/hotels/hotelRoomInfo";

export interface BookingState {
  roomsList: RoomDetails[];
  hotelSlugName: string;
  hotelId: string;
  hotelName: string;
  hotelAddress: string;
  hotelStarRating: number;
  checkin_Time: Date;
  checkout_Time: Date;
  num_nights: number;
  room_Map: any;
  room_Plan_Map: any;

  searched_Text: string;
  searched_Rooms_Count: number;
  searched_Guests_Count: number;
  searched_Adults_Count: number;
  searched_Children_Count: number;
  searched_Child_Age_List: any[];

  total_Rooms_Count: number;
  total_Guest_Occupancy: number;
  total_Guests_Count: number;
  total_Children_Count: number;

  total_Room_Cost: number;
  total_Tax: number;
  total_Price: number;

  total_Discount: number;
  paying_Amount: number;
  amount_Paid: number;

  bookingCardLoading: boolean;
}

const initialBookingState: BookingState = {
  roomsList: [],
  hotelSlugName: "",
  hotelId: "",
  hotelName: "",
  hotelAddress: "",
  hotelStarRating: 0,
  checkin_Time: new Date(),
  checkout_Time: addDays(new Date(), 1),
  num_nights: 1,
  room_Map: {},
  room_Plan_Map: {},

  searched_Text: "",
  searched_Rooms_Count: 1,
  searched_Guests_Count: 2,
  searched_Adults_Count: 2,
  searched_Children_Count: 0,
  searched_Child_Age_List: [],

  total_Rooms_Count: 0,
  total_Guest_Occupancy: 0,
  total_Guests_Count: 0,
  total_Children_Count: 0,

  total_Room_Cost: 0,
  total_Tax: 0,
  total_Price: 0,

  total_Discount: 0,
  paying_Amount: 0,
  amount_Paid: 0,

  bookingCardLoading: true,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState: initialBookingState,
  reducers: {
    updateHotelDetails: (
      state,
      action: PayloadAction<{
        hotelSlugName: string;
        hotelId: string;
        hotelName: string;
        hotelAddress: string;
        hotelStarRating: number;
      }>,
    ) => {
      state.hotelSlugName = action.payload.hotelSlugName;
      state.hotelId = action.payload.hotelId;
      state.hotelName = action.payload.hotelName;
      state.hotelAddress = action.payload.hotelAddress;
      state.hotelStarRating = action.payload.hotelStarRating;
    },
    updateSearchedText: (state, action: PayloadAction<string>) => {
      state.searched_Text = action.payload;
    },
    updateCheckInDate: (state, action: PayloadAction<Date>) => {
      state.checkin_Time = action.payload;
    },
    updateCheckOutDate: (state, action: PayloadAction<Date>) => {
      state.checkout_Time = action.payload;
    },
    updateBookingDateRange: (
      state,
      action: PayloadAction<{
        checkInDate: Date;
        checkOutDate: Date;
        searchedRoomCount: number;
        searchAdultCount: number;
        searchedChildrenCount: number;
        searchGuestCount: number;
        searchedChildAgeList: any[];
      }>,
    ) => {
      state.checkin_Time = action.payload.checkInDate;
      state.checkout_Time = action.payload.checkOutDate;
      state.searched_Rooms_Count = action.payload.searchedRoomCount;
      state.searched_Adults_Count = action.payload.searchAdultCount;
      state.searched_Children_Count = action.payload.searchedChildrenCount;
      state.searched_Guests_Count = action.payload.searchGuestCount;
      state.searched_Child_Age_List = action.payload.searchedChildAgeList;
    },
    resetBookingInfo: (state) => {
      state.roomsList = [];
      state.total_Rooms_Count = 0;
      state.total_Guest_Occupancy = 0;
      state.total_Guests_Count = 0;
      state.total_Children_Count = 0;
      state.searched_Child_Age_List = [];

      state.total_Room_Cost = 0;
      state.total_Tax = 0;
      state.total_Price = 0;
      state.room_Map = {};
      state.room_Plan_Map = {};
    },
    addMultipleRooms: (
      state,
      action: PayloadAction<{
        roomInfoList: HotelRoomInformation[];
        roomCount: number;
        guestCount: number;
        adultCount: number;
        childCount: number;
      }>,
    ) => {
      let roomInfoList = action.payload.roomInfoList;
      let roomCount = action.payload.roomCount;
      let guestCount = action.payload.guestCount;
      let adultCount = action.payload.adultCount;
      let childCount = action.payload.childCount;

      let guestToRoomMap = new Map<string, HotelRoomInformation[]>();
      let extraGuestToRoomMap = new Map<string, HotelRoomInformation[]>();

      for (let roomDetails of roomInfoList) {
        let guest_count = Number(roomDetails.hotelRoom_Guest_Count);
        let guest_min_count = Number(roomDetails.hotelRoom_Min_Guest_Occupancy);
        if (guest_min_count <= 0) guest_min_count = 1;
        let guest_max_count = Number(roomDetails.hotelRoom_Max_Guest_Occupancy);
        if (guest_max_count < guest_min_count) guest_max_count = guest_min_count;
        roomDetails.hotelRoom_Availability_Count = roomDetails.hotelRoom_Count;
        // if (roomDetails.hotelRoom_Count <= 0) {
        //   roomDetails.hotelRoom_Count = 1;
        //   roomDetails.hotelRoom_Availability_Count = 1;
        // }

        for (let gc = guest_min_count; gc <= guest_max_count; gc++) {
          if (gc === guest_count) {
            if (guestToRoomMap[`${gc}`] === undefined) guestToRoomMap[`${gc}`] = [];
            guestToRoomMap[`${gc}`].push(roomDetails);
            guestToRoomMap[`${gc}`].sort((r1: HotelRoomInformation, r2: HotelRoomInformation) => {
              if (!!r1.hotelRoom_Plans_List.length && !!r2.hotelRoom_Plans_List.length) {
                if (r1.hotelRoom_Plans_List[0] <= r2.hotelRoom_Plans_List[0]) return 1
                else return -1;
              }

              return 0;
            });
          } else {
            if (extraGuestToRoomMap[`${gc}`] === undefined) extraGuestToRoomMap[`${gc}`] = [];
            extraGuestToRoomMap[`${gc}`].push(roomDetails);
            extraGuestToRoomMap[`${gc}`].sort((r1: HotelRoomInformation, r2: HotelRoomInformation) => {
              if (!!r1.hotelRoom_Plans_List.length && !!r2.hotelRoom_Plans_List.length) {
                if (r1.hotelRoom_Plans_List[0] <= r2.hotelRoom_Plans_List[0]) return 1
                else return -1;
              }

              return 0;
            });
          }
        }
      }

      let idx = 0;
      while (roomCount > 0) {
        let aCnt = Math.ceil(adultCount / roomCount);
        let cCnt = Math.ceil(childCount / roomCount);
        let gCnt = aCnt + cCnt;

        let roomInfo = new HotelRoomInformation();
        if (!!guestToRoomMap[`${aCnt}`]?.length && guestToRoomMap[`${aCnt}`][0].hotelRoom_Availability_Count > 0) {
          guestToRoomMap[`${aCnt}`][0].hotelRoom_Availability_Count -= 1;
          roomInfo = guestToRoomMap[`${aCnt}`][0];
          if (!!guestToRoomMap[`${aCnt}`]?.length && guestToRoomMap[`${aCnt}`][0].hotelRoom_Availability_Count === 0) {
            guestToRoomMap[`${aCnt}`].splice(0, 1);
          }
        } else if (!!extraGuestToRoomMap[`${aCnt}`]?.length && extraGuestToRoomMap[`${aCnt}`][0].hotelRoom_Availability_Count > 0) {
          extraGuestToRoomMap[`${aCnt}`][0].hotelRoom_Availability_Count -= 1;
          roomInfo = extraGuestToRoomMap[`${aCnt}`][0];
          if (!!extraGuestToRoomMap[`${aCnt}`]?.length && extraGuestToRoomMap[`${aCnt}`][0].hotelRoom_Availability_Count === 0) {
            extraGuestToRoomMap[`${aCnt}`].shift(0, 1);
          }
        } else {
          break;
        }

        let planInfo: HotelRoomPlanInformation = roomInfo.hotelRoom_Plans_List[0];

        let room = new RoomDetails();
        room.room_Id = roomInfo.hotelRoom_Id;
        room.room_Name = roomInfo.hotelRoom_Type;
        room.room_Info = roomInfo.hotelRoom_Info;
        room.room_Guest_Occupancy = Math.abs(+roomInfo.hotelRoom_Guest_Count);
        room.room_Guest_Count = Math.abs(+roomInfo.hotelRoom_Guest_Count);
        room.room_Guest_Price_Percentage = +roomInfo.hotelRoom_Guest_Price_Percentage;
        room.room_Age_Pricing_List = roomInfo.hotelRoom_Max_Age_List;
        room.room_Guest_Price = Math.ceil(
          Number(roomInfo.hotelRoom_Guest_Price.toFixed(2)),
        );
        room.room_Min_Guest_Occupancy = Math.abs(
          roomInfo.hotelRoom_Min_Guest_Occupancy,
        );
        room.room_Max_Guest_Occupancy = Math.abs(
          roomInfo.hotelRoom_Max_Guest_Occupancy,
        );
        room.room_Children_Price = Math.ceil(
          Number((+roomInfo.hotelRoom_Children_Price).toFixed(2)),
        );
        room.room_Min_Children_Occupancy = Math.abs(
          +roomInfo.hotelRoom_Min_Children_Occupancy,
        );
        room.room_Max_Children_Occupancy = Math.abs(
          +roomInfo.hotelRoom_Max_Children_Occupancy,
        );
        room.plan_Id = planInfo.roomPlan_Id;
        room.plan_Name = planInfo.roomPlan_Name;
        room.plan_Info = planInfo.roomPlan_Info;
        room.plan_Start_Date = state.checkin_Time;
        room.plan_End_Date = state.checkout_Time;

        if (aCnt > room.room_Guest_Occupancy) {
          if (
            aCnt - room.room_Guest_Occupancy >
            room.room_Max_Guest_Occupancy - room.room_Guest_Occupancy
          ) {
            room.room_Guest_Extra_Count =
              room.room_Max_Guest_Occupancy - room.room_Guest_Occupancy;
          } else {
            room.room_Guest_Extra_Count = aCnt - room.room_Guest_Occupancy;
          }
        } else {
          room.room_Guest_Extra_Count = 0;
        }

        // if (cCnt > room.room_Max_Children_Occupancy) {
        //   room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
        // } else {
        //   room.room_Children_Occupancy = cCnt;
        // }

        if (aCnt < room.room_Guest_Occupancy && aCnt > 0) {
          room.room_Guest_Count = aCnt;
        }

        if (cCnt > room.room_Max_Children_Occupancy) {
          room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
        } else {
          room.room_Children_Occupancy = cCnt;
        }

        if (idx === 0) {
          if (aCnt < room.room_Guest_Occupancy) {
            const extraGuest = room.room_Guest_Occupancy - aCnt;

            if (cCnt > extraGuest) {
              if (cCnt - extraGuest > room.room_Max_Children_Occupancy) {
                room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
              } else {
                room.room_Children_Occupancy = cCnt - extraGuest;
              }
            } else {
              room.room_Children_Occupancy = 0;
              room.room_Children_As_Guest_Count = childCount;
            }
          } else {
            if (cCnt > room.room_Max_Children_Occupancy) {
              room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
            } else {
              room.room_Children_Occupancy = cCnt;
            }
          }

          room.calculatePlanPrice(
            planInfo.roomPlan_Date_Price_List,
            [],
            aCnt,
            cCnt,
          );

          if (cCnt > room.room_Max_Children_Occupancy) {
            room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
            room.num_Children = room.room_Max_Children_Occupancy;
          } else {
            room.room_Children_Occupancy = cCnt;
            room.num_Children = cCnt;
          }

          state.roomsList = [room];
          state.total_Room_Cost = +room.total_Room_Plan_Price;
          state.total_Tax = +room.total_Plan_Tax;
          state.total_Price = +room.total_Plan_Price;
          state.total_Rooms_Count = 1;
          state.total_Guest_Occupancy = Math.abs(
            +roomInfo.hotelRoom_Guest_Count,
          );
          state.total_Guests_Count = Math.abs(+room.num_Guests);
          state.total_Children_Count = Math.abs(+room.num_Children);
          // state.room_Plan_Map[`${room.room_Id}-${room.plan_Id}`] = 1;

          const roomKey = `${room.room_Id}`;
          const roomPlanKey = `${room.room_Id}-${room.plan_Id}`;
          state.room_Map[roomKey] = {
            room_count: 1,
            guest_count: Math.abs(+room.num_Guests),
            child_count: Math.abs(+room.num_Children),
          };
          state.room_Plan_Map[roomPlanKey] = {
            room_count: 1,
            guest_count: Math.abs(+room.num_Guests),
            child_count: Math.abs(+room.num_Children),
          };
        } else {
          let rpIdx = -1;
          let planExists = false;
          for (let i = 0; i < state.roomsList.length; i++) {
            let rp = state.roomsList[i];
            let { roomPlan, planMap } = rp.compareForMultipleRooms(room);
            planExists = planMap;
            if (roomPlan) {
              rpIdx = i;
              break;
            }
          }

          state.total_Guest_Occupancy += Math.abs(
            +roomInfo.hotelRoom_Guest_Count,
          );

          const roomPlanMapping = Object.assign({}, state.room_Plan_Map);
          const roomPlanKey = `${room.room_Id}-${room.plan_Id}`;
          const roomMapping = Object.assign({}, state.room_Map);
          const roomKey = `${room.room_Id}`;

          if (rpIdx === -1) {
            if (aCnt < room.room_Guest_Occupancy) {
              const extraGuest = room.room_Guest_Occupancy - aCnt;

              if (cCnt > extraGuest) {
                if (cCnt - extraGuest > room.room_Max_Children_Occupancy) {
                  room.room_Children_Occupancy =
                    room.room_Max_Children_Occupancy;
                } else {
                  room.room_Children_Occupancy = cCnt - extraGuest;
                }
              } else {
                room.room_Children_Occupancy = 0;
                room.room_Children_As_Guest_Count = childCount;
              }
            } else {
              if (cCnt > room.room_Max_Children_Occupancy) {
                room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
              } else {
                room.room_Children_Occupancy = cCnt;
              }
            }

            room.calculatePlanPrice(
              planInfo.roomPlan_Date_Price_List,
              [],
              aCnt,
              cCnt,
            );

            if (cCnt > room.room_Max_Children_Occupancy) {
              room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
              room.num_Children = room.room_Max_Children_Occupancy;
            } else {
              room.room_Children_Occupancy = cCnt;
              room.num_Children = cCnt;
            }

            state.roomsList.push(room);
            state.total_Room_Cost += +room.total_Room_Plan_Price;
            state.total_Tax += +room.total_Plan_Tax;
            state.total_Price += +room.total_Plan_Price;
            state.total_Rooms_Count += 1;
            state.total_Guests_Count += +room.num_Guests;
            state.total_Children_Count += +room.num_Children;

            if (roomMapping[roomKey]) {
              const roomObj = Object.assign({}, roomMapping[roomKey]);
              state.room_Map[roomKey] = {
                room_count: +roomObj[`room_count`] + 1,
                guest_count:
                  +roomObj[`guest_count`] + Math.abs(+room.num_Guests),
                child_count:
                  +roomObj[`child_count`] + Math.abs(+room.num_Children),
              };
            } else {
              state.room_Map[roomKey] = {
                room_count: 1,
                guest_count: Math.abs(+room.num_Guests),
                child_count: Math.abs(+room.num_Children),
              };
            }

            if (roomPlanMapping[roomPlanKey]) {
              const planObj = Object.assign({}, roomPlanMapping[roomPlanKey]);
              state.room_Plan_Map[roomPlanKey] = {
                room_count: +planObj[`room_count`] + 1,
                guest_count:
                  +planObj[`guest_count`] + Math.abs(+room.num_Guests),
                child_count:
                  +planObj[`child_count`] + Math.abs(+room.num_Children),
              };
            } else {
              state.room_Plan_Map[roomPlanKey] = {
                room_count: 1,
                guest_count: Math.abs(+room.num_Guests),
                child_count: Math.abs(+room.num_Children),
              };
            }
          } else {
            let rm = state.roomsList[rpIdx];
            state.total_Room_Cost -= +rm.total_Room_Plan_Price;
            state.total_Tax -= +rm.total_Plan_Tax;
            state.total_Price -= +rm.total_Plan_Price;
            state.total_Rooms_Count -= +rm.room_Count;
            state.total_Guests_Count -= +rm.num_Guests;
            state.total_Children_Count -= +rm.num_Children;
            rm.addSameRoomPlan();
            state.total_Room_Cost += +rm.total_Room_Plan_Price;
            state.total_Tax += +rm.total_Plan_Tax;
            state.total_Price += +rm.total_Plan_Price;
            state.total_Rooms_Count += +rm.room_Count;
            state.total_Guests_Count += +rm.num_Guests;
            state.total_Children_Count += +rm.num_Children;

            const roomObj = Object.assign({}, roomMapping[roomKey]);
            state.room_Map[roomKey] = {
              room_count: +roomObj[`room_count`] + 1,
              guest_count:
                +roomObj[`guest_count`] +
                Math.abs(+rm.room_Guest_Count) +
                Math.abs(+rm.room_Guest_Extra_Count),
              child_count: +roomObj[`child_count`] + Math.abs(+rm.num_Children),
            };

            const planObj = Object.assign({}, roomPlanMapping[roomPlanKey]);
            state.room_Plan_Map[roomPlanKey] = {
              room_count: +planObj[`room_count`] + 1,
              guest_count:
                +planObj[`guest_count`] +
                Math.abs(+rm.room_Guest_Count) +
                Math.abs(+rm.room_Guest_Extra_Count),
              child_count: +planObj[`child_count`] + Math.abs(+rm.num_Children),
            };
          }
        }

        adultCount -= aCnt;
        childCount -= cCnt;
        roomCount -= 1;
        idx += 1;
      }
    },
    addFirstRoom: (
      state,
      action: PayloadAction<{
        roomInfo: HotelRoomInformation;
        planInfo: HotelRoomPlanInformation;
        roomCount: number;
        guestCount: number;
        adultCount: number;
        childCount: number;
        childAgeList: any[];
      }>,
    ) => {
      const roomInfo = action.payload.roomInfo;
      const planInfo = action.payload.planInfo;
      const roomCount = action.payload.roomCount;
      const guestCount = action.payload.guestCount;
      const adultCount = action.payload.adultCount;
      const childCount = action.payload.childCount;
      const childAgeList = action.payload.childAgeList;

      let room = new RoomDetails();
      room.room_Id = roomInfo.hotelRoom_Id;
      room.room_Name = roomInfo.hotelRoom_Type;
      room.room_Info = roomInfo.hotelRoom_Info;
      room.room_Guest_Occupancy = Math.abs(+roomInfo.hotelRoom_Guest_Count);
      room.room_Guest_Count = Math.abs(+roomInfo.hotelRoom_Guest_Count);
      room.room_Guest_Price_Percentage = +roomInfo.hotelRoom_Guest_Price_Percentage;
      room.room_Age_Pricing_List = roomInfo.hotelRoom_Max_Age_List;
      room.room_Guest_Price = Math.ceil(
        Number(roomInfo.hotelRoom_Guest_Price.toFixed(2)),
      );
      room.room_Min_Guest_Occupancy = Math.abs(
        roomInfo.hotelRoom_Min_Guest_Occupancy,
      );
      room.room_Max_Guest_Occupancy = Math.abs(
        roomInfo.hotelRoom_Max_Guest_Occupancy,
      );
      room.room_Children_Price = Math.ceil(
        Number((+roomInfo.hotelRoom_Children_Price).toFixed(2)),
      );
      room.room_Min_Children_Occupancy = Math.abs(
        +roomInfo.hotelRoom_Min_Children_Occupancy,
      );
      room.room_Max_Children_Occupancy = Math.abs(
        +roomInfo.hotelRoom_Max_Children_Occupancy,
      );
      room.plan_Id = planInfo.roomPlan_Id;
      room.plan_Name = planInfo.roomPlan_Name;
      room.plan_Info = planInfo.roomPlan_Info;
      room.plan_Start_Date = state.checkin_Time;
      room.plan_End_Date = state.checkout_Time;

      if (adultCount > room.room_Guest_Occupancy) {
        if (
          adultCount - room.room_Guest_Occupancy >
          room.room_Max_Guest_Occupancy - room.room_Guest_Occupancy
        ) {
          room.room_Guest_Extra_Count =
            room.room_Max_Guest_Occupancy - room.room_Guest_Occupancy;
        } else {
          room.room_Guest_Extra_Count = adultCount - room.room_Guest_Occupancy;
        }
      } else {
        room.room_Guest_Extra_Count = 0;
      }

      if (adultCount < room.room_Guest_Occupancy && adultCount > 0) {
        room.room_Guest_Count = adultCount;
      }

      if (adultCount < room.room_Guest_Occupancy) {
        const extraGuest = room.room_Guest_Occupancy - adultCount;

        if (childCount > extraGuest) {
          if (childCount - extraGuest > room.room_Max_Children_Occupancy) {
            room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
          } else {
            room.room_Children_Occupancy = childCount - extraGuest;
          }
        } else {
          room.room_Children_Occupancy = 0;
          room.room_Children_As_Guest_Count = childCount;
        }
      } else {
        if (childCount > room.room_Max_Children_Occupancy) {
          room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
        } else {
          room.room_Children_Occupancy = childCount;
        }
      }

      room.calculatePlanPrice(
        planInfo.roomPlan_Date_Price_List,
        [],
        adultCount,
        childCount,
      );

      if (childCount > room.room_Max_Children_Occupancy) {
        room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
        room.num_Children = room.room_Max_Children_Occupancy;
      } else {
        room.room_Children_Occupancy = childCount;
        room.num_Children = childCount;
      }

      state.roomsList = [room];
      state.total_Room_Cost = +room.total_Room_Plan_Price;
      state.total_Tax = +room.total_Plan_Tax;
      state.total_Price = +room.total_Plan_Price;
      state.total_Rooms_Count = 1;
      state.total_Guest_Occupancy = Math.abs(+roomInfo.hotelRoom_Guest_Count);
      state.total_Guests_Count = Math.abs(+room.num_Guests);
      state.total_Children_Count = Math.abs(+room.num_Children);
      // state.room_Plan_Map[`${room.room_Id}-${room.plan_Id}`] = 1
      state.room_Map[`${room.room_Id}`] = {
        room_count: 1,
        guest_count: Math.abs(+room.num_Guests),
        child_count: Math.abs(+room.num_Children),
      };
      state.room_Plan_Map[`${room.room_Id}-${room.plan_Id}`] = {
        room_count: 1,
        guest_count: Math.abs(+room.num_Guests),
        child_count: Math.abs(+room.num_Children),
      };
    },
    addRoom: (
      state,
      action: PayloadAction<{
        roomInfo: HotelRoomInformation;
        planInfo: HotelRoomPlanInformation;
        adultCount: number;
        childCount: number;
        childAgeList: any[];
      }>,
    ) => {
      const roomInfo = action.payload.roomInfo;
      const planInfo = action.payload.planInfo;
      const adultCount = action.payload.adultCount;
      const childCount = action.payload.childCount;
      const childAgeList = action.payload.childAgeList;

      let room = new RoomDetails();
      room.room_Id = roomInfo.hotelRoom_Id;
      room.room_Name = roomInfo.hotelRoom_Type;
      room.room_Info = roomInfo.hotelRoom_Info;
      room.room_Guest_Occupancy = +roomInfo.hotelRoom_Guest_Count;
      room.room_Guest_Count = +roomInfo.hotelRoom_Guest_Count;
      room.room_Guest_Price_Percentage =
        +roomInfo.hotelRoom_Guest_Price_Percentage;
      room.room_Age_Pricing_List = roomInfo.hotelRoom_Max_Age_List;
      room.room_Children_Age_Price_Info = childAgeList;
      room.room_Child_Dynamic_Price = true;
      // room.room_Guest_Extra_Count = adultCount;
      room.room_Guest_Price = Math.ceil(
        Number((+roomInfo.hotelRoom_Guest_Price).toFixed(2)),
      );
      room.room_Min_Guest_Occupancy = Math.abs(
        +roomInfo.hotelRoom_Min_Guest_Occupancy,
      );
      room.room_Max_Guest_Occupancy = Math.abs(
        +roomInfo.hotelRoom_Max_Guest_Occupancy,
      );
      // room.room_Children_Occupancy = childCount;
      room.room_Children_Price = Math.ceil(
        Number((+roomInfo.hotelRoom_Children_Price).toFixed(2)),
      );
      room.room_Min_Children_Occupancy = Math.abs(
        +roomInfo.hotelRoom_Min_Children_Occupancy,
      );
      room.room_Max_Children_Occupancy = Math.abs(
        +roomInfo.hotelRoom_Max_Children_Occupancy,
      );
      room.plan_Id = planInfo.roomPlan_Id;
      room.plan_Name = planInfo.roomPlan_Name;
      room.plan_Info = planInfo.roomPlan_Info;
      room.plan_Start_Date = state.checkin_Time;
      room.plan_End_Date = state.checkout_Time;

      if (adultCount > room.room_Guest_Occupancy) {
        if (
          adultCount - room.room_Guest_Occupancy >
          room.room_Max_Guest_Occupancy - room.room_Guest_Occupancy
        ) {
          room.room_Guest_Extra_Count =
            room.room_Max_Guest_Occupancy - room.room_Guest_Occupancy;
        } else {
          room.room_Guest_Extra_Count = adultCount - room.room_Guest_Occupancy;
        }
      } else {
        room.room_Guest_Extra_Count = 0;
      }

      if (adultCount < room.room_Guest_Occupancy && adultCount > 0) {
        room.room_Guest_Count = adultCount;
      }

      if (childCount > room.room_Max_Children_Occupancy) {
        room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
      } else {
        room.room_Children_Occupancy = childCount;
      }

      // if (adultCount < room.room_Guest_Occupancy) {
      //   const extraGuest = room.room_Guest_Occupancy - adultCount;

      //   if (childCount > extraGuest) {
      //     if (childCount - extraGuest > room.room_Max_Children_Occupancy) {
      //       room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
      //     } else {
      //       room.room_Children_Occupancy = childCount - extraGuest;
      //     }
      //   }
      // } else {
      //   if (childCount > room.room_Max_Children_Occupancy) {
      //     room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
      //   } else {
      //     room.room_Children_Occupancy = childCount;
      //   }
      // }

      let rpIdx = -1;
      let planExists = false;
      for (let i = 0; i < state.roomsList.length; i++) {
        let rp = state.roomsList[i];
        let { roomPlan, planMap } = rp.compareRooms(room);
        planExists = planMap;
        if (roomPlan) {
          rpIdx = i;
          break;
        }
      }

      state.total_Guest_Occupancy += Math.abs(+roomInfo.hotelRoom_Guest_Count);

      const roomPlanMapping = Object.assign({}, state.room_Plan_Map);
      const roomPlanKey = `${room.room_Id}-${room.plan_Id}`;
      const roomMapping = Object.assign({}, state.room_Map);
      const roomKey = `${room.room_Id}`;

      if (rpIdx === -1) {
        if (adultCount < room.room_Guest_Occupancy) {
          const extraGuest = room.room_Guest_Occupancy - adultCount;

          if (childCount > extraGuest) {
            if (childCount - extraGuest > room.room_Max_Children_Occupancy) {
              room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
            } else {
              room.room_Children_Occupancy = childCount - extraGuest;
            }
          } else {
            room.room_Children_Occupancy = 0;
            room.room_Children_As_Guest_Count = childCount;
          }
        } else {
          if (childCount > room.room_Max_Children_Occupancy) {
            room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
          } else {
            room.room_Children_Occupancy = childCount;
          }
        }

        room.calculatePlanPrice(
          planInfo.roomPlan_Date_Price_List,
          childAgeList,
          adultCount,
          childCount,
        );

        if (childCount > room.room_Max_Children_Occupancy) {
          room.room_Children_Occupancy = room.room_Max_Children_Occupancy;
          room.num_Children = room.room_Max_Children_Occupancy;
        } else {
          room.room_Children_Occupancy = childCount;
          room.num_Children = childCount;
        }

        state.roomsList.push(room);
        state.total_Room_Cost += +room.total_Room_Plan_Price;
        state.total_Tax += +room.total_Plan_Tax;
        state.total_Price += +room.total_Plan_Price;
        state.total_Rooms_Count += 1;
        state.total_Guests_Count += +room.num_Guests;
        state.total_Children_Count += +room.num_Children;

        if (roomMapping[roomKey]) {
          const roomObj = Object.assign({}, roomMapping[roomKey]);
          state.room_Map[roomKey] = {
            room_count: +roomObj[`room_count`] + 1,
            guest_count: +roomObj[`guest_count`] + Math.abs(+room.num_Guests),
            child_count: +roomObj[`child_count`] + Math.abs(+room.num_Children),
          };
        } else {
          state.room_Map[roomKey] = {
            room_count: 1,
            guest_count: Math.abs(+room.num_Guests),
            child_count: Math.abs(+room.num_Children),
          };
        }

        if (roomPlanMapping[roomPlanKey]) {
          const planObj = Object.assign({}, roomPlanMapping[roomPlanKey]);
          state.room_Plan_Map[roomPlanKey] = {
            room_count: +planObj[`room_count`] + 1,
            guest_count: +planObj[`guest_count`] + Math.abs(+room.num_Guests),
            child_count: +planObj[`child_count`] + Math.abs(+room.num_Children),
          };
        } else {
          state.room_Plan_Map[roomPlanKey] = {
            room_count: 1,
            guest_count: Math.abs(+room.num_Guests),
            child_count: Math.abs(+room.num_Children),
          };
        }
      } else {
        let rm = state.roomsList[rpIdx];
        state.total_Room_Cost -= +rm.total_Room_Plan_Price;
        state.total_Tax -= +rm.total_Plan_Tax;
        state.total_Price -= +rm.total_Plan_Price;
        state.total_Rooms_Count -= +rm.room_Count;
        state.total_Guests_Count -= +rm.num_Guests;
        state.total_Children_Count -= +rm.num_Children;
        rm.addSameRoomPlan();
        state.total_Room_Cost += +rm.total_Room_Plan_Price;
        state.total_Tax += +rm.total_Plan_Tax;
        state.total_Price += +rm.total_Plan_Price;
        state.total_Rooms_Count += +rm.room_Count;
        state.total_Guests_Count += +rm.num_Guests;
        state.total_Children_Count += +rm.num_Children;

        const roomObj = Object.assign({}, roomMapping[roomKey]);
        state.room_Map[roomKey] = {
          room_count: +roomObj[`room_count`] + 1,
          guest_count:
            +roomObj[`guest_count`] +
            Math.abs(+rm.room_Guest_Count) +
            Math.abs(+rm.room_Guest_Extra_Count),
          child_count: +roomObj[`child_count`] + Math.abs(+rm.num_Children),
        };

        const planObj = Object.assign({}, roomPlanMapping[roomPlanKey]);
        state.room_Plan_Map[roomPlanKey] = {
          room_count: +planObj[`room_count`] + 1,
          guest_count:
            +planObj[`guest_count`] +
            Math.abs(+rm.room_Guest_Count) +
            Math.abs(+rm.room_Guest_Extra_Count),
          child_count: +planObj[`child_count`] + Math.abs(+rm.num_Children),
        };
      }
    },
    updateBookingCard: (
      state,
      action: PayloadAction<{
        bookingCardLoading: boolean;
      }>,
    ) => {
      const bookingCardLoading = action.payload.bookingCardLoading;
      state.bookingCardLoading = bookingCardLoading;
    },
    updateRoom: (
      state,
      action: PayloadAction<{
        planIndex: number;
        roomPlanInfo: RoomDetails;
      }>,
    ) => {
      const rpIdx = action.payload.planIndex;
      const roomPlanInfo = action.payload.roomPlanInfo;

      let rm = state.roomsList[rpIdx];
      state.total_Room_Cost -= +rm.total_Room_Plan_Price;
      state.total_Tax -= +rm.total_Plan_Tax;
      state.total_Price -= +rm.total_Plan_Price;
      state.total_Rooms_Count -= +rm.room_Count;
      state.total_Guests_Count -= +rm.num_Guests;
      state.total_Children_Count -= +rm.num_Children;
      state.total_Guest_Occupancy -=
        +rm.room_Count * Math.abs(+rm.room_Guest_Occupancy);

      state.total_Room_Cost += +roomPlanInfo.total_Room_Plan_Price;
      state.total_Tax += +roomPlanInfo.total_Plan_Tax;
      state.total_Price += +roomPlanInfo.total_Plan_Price;
      state.total_Rooms_Count += +roomPlanInfo.room_Count;
      state.total_Guests_Count += +roomPlanInfo.num_Guests;
      state.total_Children_Count += +roomPlanInfo.num_Children;
      state.total_Guest_Occupancy +=
        +roomPlanInfo.room_Count * Math.abs(+roomPlanInfo.room_Guest_Occupancy);

      const roomPlanKey = `${roomPlanInfo.room_Id}-${roomPlanInfo.plan_Id}`;
      const roomKey = `${roomPlanInfo.room_Id}`;

      state.room_Map[roomKey] = {
        room_count: +roomPlanInfo.room_Count,
        guest_count: +roomPlanInfo.num_Guests,
        child_count: +roomPlanInfo.num_Children,
      };
      state.room_Plan_Map[roomPlanKey] = {
        room_count: +roomPlanInfo.room_Count,
        guest_count: +roomPlanInfo.num_Guests,
        child_count: +roomPlanInfo.num_Children,
      };
    },
    removeSameRoomPlanType: (
      state,
      action: PayloadAction<{
        roomPlanInfo: RoomDetails;
      }>,
    ) => {
      const roomPlanInfo = action.payload.roomPlanInfo;

      const roomPlanKey = `${roomPlanInfo.room_Id}-${roomPlanInfo.plan_Id}`;
      const roomKey = `${roomPlanInfo.room_Id}`;

      let rpIdx = -1;
      let planExists = false;
      for (let i = 0; i < state.roomsList.length; i++) {
        let rp = state.roomsList[i];
        let { roomPlan, planMap } = rp.compareRooms(roomPlanInfo);
        planExists = planMap;
        if (roomPlan) {
          rpIdx = i;
          break;
        }
      }

      if (rpIdx !== -1) {
        state.total_Room_Cost -= (+roomPlanInfo.plan_Room_Price + +roomPlanInfo.plan_Adult_Price + +roomPlanInfo.plan_Child_Price);
        state.total_Tax -= +roomPlanInfo.plan_Tax;
        state.total_Price -= +roomPlanInfo.plan_Price;
        state.total_Rooms_Count -= 1;
        state.total_Guests_Count -= (+roomPlanInfo.room_Guest_Count + +roomPlanInfo.room_Guest_Extra_Count);
        state.total_Children_Count -= +roomPlanInfo.room_Children_Occupancy;

        if (roomPlanInfo.room_Count === 1) {
          state.roomsList.splice(rpIdx, 1);
        }
        else {
          state.roomsList[rpIdx].removeSameRoomPlan();
        }

        const roomMapping = Object.assign({}, state.room_Map);
        const roomPlanMapping = Object.assign({}, state.room_Plan_Map);

        if (roomMapping[roomKey]) {
          const roomObj = Object.assign({}, roomMapping[roomKey]);

          let roomCount = +roomObj[`room_count`] - 1;
          let guestCount = +roomObj[`guest_count`] - +roomPlanInfo.room_Guest_Count - +roomPlanInfo.room_Guest_Extra_Count;
          let childCount = +roomObj[`child_count`] - +roomPlanInfo.room_Children_Occupancy;

          if (roomCount === 0) {
            delete state.room_Map[roomKey];
          } else {
            state.room_Map[roomKey] = {
              room_count: roomCount,
              guest_count: guestCount,
              child_count: childCount,
            };
          }
        }

        if (roomPlanMapping[roomPlanKey]) {
          const planObj = Object.assign({}, roomPlanMapping[roomPlanKey]);

          let roomCount = +planObj[`room_count`] - 1;
          let guestCount = +planObj[`guest_count`] - +roomPlanInfo.room_Guest_Count - +roomPlanInfo.room_Guest_Extra_Count;
          let childCount = +planObj[`child_count`] - +roomPlanInfo.room_Children_Occupancy;

          if (roomCount == 0) {
            delete state.room_Plan_Map[roomPlanKey];
          } else {
            state.room_Plan_Map[roomPlanKey] = {
              room_count: roomCount,
              guest_count: guestCount,
              child_count: childCount,
            };
          }
        }
      }
    },
    removeRoom: (
      state,
      action: PayloadAction<{
        planIndex: number;
        roomPlanInfo: RoomDetails;
      }>,
    ) => {
      const pIdx = action.payload.planIndex;
      const roomPlanInfo = action.payload.roomPlanInfo;

      let rp = state.roomsList[pIdx];
      state.total_Room_Cost -= rp.total_Room_Plan_Price;
      state.total_Tax -= rp.total_Plan_Tax;
      state.total_Price -= rp.total_Plan_Price;
      state.total_Rooms_Count -= rp.room_Count;
      state.total_Guests_Count -= rp.num_Guests;
      state.total_Children_Count -= rp.num_Children;
      state.roomsList.splice(pIdx, 1);
      state.total_Guest_Occupancy -= +rp.room_Count * Math.abs(+rp.room_Guest_Occupancy);

      const roomMapping = Object.assign({}, state.room_Map);
      const roomKey = `${roomPlanInfo.room_Id}`;
      const roomPlanMapping = Object.assign({}, state.room_Plan_Map);
      const roomPlanKey = `${roomPlanInfo.room_Id}-${roomPlanInfo.plan_Id}`;

      if (roomMapping[roomKey]) {
        const roomObj = Object.assign({}, roomMapping[roomKey]);

        let roomCount = +roomObj[`room_count`] - +rp.room_Count;
        let guestCount = +roomObj[`guest_count`] - +rp.num_Guests;
        let childCount = +roomObj[`child_count`] - +rp.num_Children;

        if (roomCount == 0) {
          delete state.room_Map[roomKey];
        } else {
          state.room_Map[roomKey] = {
            room_count: roomCount,
            guest_count: guestCount,
            child_count: childCount,
          };
        }
      }

      if (roomPlanMapping[roomPlanKey]) {
        const planObj = Object.assign({}, roomPlanMapping[roomPlanKey]);

        let roomCount = +planObj[`room_count`] - +rp.room_Count;
        let guestCount = +planObj[`guest_count`] - +rp.num_Guests;
        let childCount = +planObj[`child_count`] - +rp.num_Children;

        if (roomCount == 0) {
          delete state.room_Plan_Map[`${rp.room_Id}-${rp.plan_Id}`];
        } else {
          state.room_Plan_Map[roomPlanKey] = {
            room_count: roomCount,
            guest_count: guestCount,
            child_count: childCount,
          };
        }
      }

      if (state.total_Room_Cost === 0) {
        state.room_Map = {};
        state.room_Plan_Map = {};
      }
    },
    generateBookingDetails: (state) => {},
  },
});

// Action creators are generated for each case render function
export const {
  updateHotelDetails,
  updateSearchedText,
  updateCheckInDate,
  updateCheckOutDate,
  updateBookingDateRange,
  addFirstRoom,
  addMultipleRooms,
  resetBookingInfo,
  addRoom,
  updateRoom,
  removeRoom,
  removeSameRoomPlanType,
  generateBookingDetails,
  updateBookingCard,
} = bookingSlice.actions;

// Selectors
export const selectHotelBookingInfo = (state: RootState) => state.booking;
export const selectHotelSlugName = (state: RootState) =>
  state.booking.hotelSlugName;
export const selectHotelId = (state: RootState) => state.booking.hotelId;
export const selectHotelName = (state: RootState) => state.booking.hotelName;
export const selectHotelAddress = (state: RootState) =>
  state.booking.hotelAddress;
export const selectHotelStarRating = (state: RootState) =>
  state.booking.hotelStarRating;

export const selectRoomsList = (state: RootState) => state.booking.roomsList;
export const selectCheckInDate = (state: RootState) =>
  state.booking.checkin_Time;
export const selectCheckOutDate = (state: RootState) =>
  state.booking.checkout_Time;
export const selectNumberOfNights = (state: RootState) =>
  getDateDifference(state.booking.checkin_Time, state.booking.checkout_Time);
export const selectRoomMapping = (state: RootState) => state.booking.room_Map;
export const selectRoomPlanMapping = (state: RootState) =>
  state.booking.room_Plan_Map;

export const selectSearchedText = (state: RootState) =>
  state.booking.searched_Text;
export const selectSearchedRoomsCount = (state: RootState) =>
  state.booking.searched_Rooms_Count;
export const selectSearchedGuestsCount = (state: RootState) =>
  state.booking.searched_Guests_Count;
export const selectSearchedAdultsCount = (state: RootState) =>
  state.booking.searched_Adults_Count;
export const selectSearchedChildrenCount = (state: RootState) =>
  state.booking.searched_Children_Count;
export const selectSearchedChildAgeList = (state: RootState) =>
  state.booking.searched_Child_Age_List;

export const selectTotalRoomsCount = (state: RootState) =>
  state.booking.total_Rooms_Count;
export const selectTotalGuestsCount = (state: RootState) =>
  state.booking.total_Guests_Count;
// export const selectTotalAdultsCount = (state: RootState) => state.booking.total_Ad
export const selectTotalGuestsOccupancy = (state: RootState) =>
  state.booking.total_Guest_Occupancy;
export const selectTotalChildrenCount = (state: RootState) =>
  state.booking.total_Children_Count;

export const selectTotalRoomCost = (state: RootState) =>
  state.booking.total_Room_Cost;
export const selectTotalTax = (state: RootState) => state.booking.total_Tax;
export const selectTotalPrice = (state: RootState) => state.booking.total_Price;
export const selectTotalDiscount = (state: RootState) =>
  state.booking.total_Discount;
export const selectTotalPayingAmount = (state: RootState) =>
  state.booking.paying_Amount;

export const selectBookingCardLoading = (state: RootState) =>
  state.booking.bookingCardLoading;

export default bookingSlice.reducer;
