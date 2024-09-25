import { RootState } from "@/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface userState {
  user_DisplayName: string;
  user_Email_Id: string;
  user_Phone_Number: string;
  user_Image_Url: string;

  user_id: string;
  // user_Staybook_Coins: number;

  // user_Auth_Type: string;
  // user_Adress: string;
  //  user_Gender: string;

  // user_first_name: string;
  // user_last_name: string;
  // user_middle_name: string;
}

// Use localStorage to persist user Info even after the page refresh

const initialUserState: userState =
  typeof window !== "undefined" && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user") as string)
    : {
        user_DisplayName: "",
        user_Email_Id: "",
        user_Phone_Number: "",
        user_Image_Url: "",
        user_id: "",
        // user_Auth_Type: "",
        // user_Adress: "",
        // user_Gender: "",
        // user_first_name: "",
        // user_last_name: "",
        // user_middle_name: "",
        // user_Staybook_Coins: 0,
      };

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateLoggedInUserDetails: (
      state,
      action: PayloadAction<{
        userDisplayName: string;
        userEmailId: string;
        userPhoneNumber: string;
        userImageUrl: string;

        userId: string;
        // userAuthType: string;
        //  userAdress: string;
        // userGender: string;
        //  userStayBookCoins: number;

        //  userFirstName: string;
        // userLastName: string;
        // userMiddleName: string;
      }>,
    ) => {
      state.user_DisplayName = action.payload.userDisplayName;
      state.user_Email_Id = action.payload.userEmailId;
      state.user_Phone_Number = action.payload.userPhoneNumber;
      state.user_Image_Url = action.payload.userImageUrl;

      state.user_id = action.payload.userId;
      //  state.user_Auth_Type = action.payload.userAuthType;
      // state.user_Adress = action.payload.userAdress;
      // state.user_Gender = action.payload.userGender;
      //state.user_Staybook_Coins = action.payload.userStayBookCoins;

      //state.user_first_name = action.payload.userFirstName;
      //state.user_last_name = action.payload.userLastName;
      //state.user_middle_name = action.payload.userMiddleName;

      // Store the user details in localStorage
      window.localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case render function
export const { updateLoggedInUserDetails } = userSlice.actions;

// Selectors
export const selectUserDisplayName = (state: RootState) =>
  state.user.user_DisplayName;
export const selectUserEmailId = (state: RootState) => state.user.user_Email_Id;
export const selectUserPhoneNumber = (state: RootState) =>
  state.user.user_Phone_Number;

export const selectUserImageUrl = (state: RootState) =>
  state.user.user_Image_Url;

export const selectUserId = (state: RootState) => state.user.user_id;

// export const selectUserStaybookCoins = (state: RootState) =>
//   state.user.user_Staybook_Coins;

// export const selectUserAuthType = (state: RootState) =>
//   state.user.user_Auth_Type;
// export const selectUserAddress = (state: RootState) => state.user.user_Adress;
// export const selectUserGender = (state: RootState) => state.user.user_Gender;

// export const selectFirstName = (state: RootState) => state.user.user_first_name;
// export const selectLastName = (state: RootState) => state.user.user_last_name;
// export const selectMiddleName = (state: RootState) =>
//   state.user.user_middle_name;

export default userSlice.reducer;
