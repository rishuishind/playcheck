import {
  configureStore,
  applyMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import bookingConfirmationReducer from "@/lib/redux/bookingConfirmationSlice";
import bookingReducer from "@/lib/redux/bookingSlice";
import userReducer from "@/lib/redux/userSlice";
import thunk from "redux-thunk";

import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storage from "./storage";

const reducer = combineReducers({
  booking: bookingReducer,
  user: userReducer,
  bookingConfirmation: bookingConfirmationReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["booking", "user", "bookingConfirmation"],
  whitelist: ["bookingConfirmation"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer: {
//     booking: bookingReducer,
//     user: userReducer,
//     isLoggedIn: isUserLoggedInReduxSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
// export let persistor = persistStore(store);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {booking: BookingState, user: UserState, isLoggedIn: LoginState}
export type AppDispatch = typeof store.dispatch;
