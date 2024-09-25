export const addBookingToCache = async (bookingDetails: any) => {
  await removeBookingFromCache();
  const response = await fetch("/api/booking/cacheBookingInfo", {
    method: "POST",
    body: JSON.stringify({
      bookingDetails: bookingDetails,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
      "Access-Control-Allow-Headers":
        "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type",
    },
  });

  const data = await response.json();
  if (data.status) {
    return true;
  } else {
    return false;
  }
};

export const addBookedRoomsToCache = async (roomsList: any[]) => {
  const response = await fetch("/api/booking/cacheBookedRoomInfo", {
    method: "POST",
    body: JSON.stringify({
      roomsList: roomsList,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
      "Access-Control-Allow-Headers":
        "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type",
    },
  });

  const data = await response.json();
  return {
    status: data.status,
    bookedRoomIdList: data.bookedRoomIdList,
  };
};

export const removeBookingFromCache = async () => {
  const response = await fetch("/api/booking/deleteCacheBookingInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
      "Access-Control-Allow-Headers":
        "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type",
    },
  });

  const data = await response.json();
  if (data.status) {
    return true;
  } else {
    return false;
  }
};

export const fetchCookieDetails = async (
  cookieTokenName: string
): Promise<any> => {
  const response = await fetch("/api/userProfile/fetchCookieDetails", {
    method: "POST",
    body: JSON.stringify({
      cookieTokenName: cookieTokenName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.credentials;
};

export const fetchAirpayInstantPaymentNotificationAPI = async () => {
  const response = await fetch("/api/airpay/instantpaymentnotification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.bookingInfo;
}