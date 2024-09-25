export const guestCountHandler = (
  type: number,
  guestCount: number,
  setGuestCount: any,
) => {
  if (type === 1) {
    if (guestCount < 16) setGuestCount(guestCount + 1);
  } else {
    if (guestCount > 1) setGuestCount(guestCount - 1);
  }
};

export const childrenCountHandler = (
  type: number,
  childCount: number,
  setChildCount: any,
) => {
  if (type === 1) {
    if (childCount < 8) setChildCount(childCount + 1);
  } else {
    if (childCount > 0) setChildCount(childCount - 1);
  }
};

export const roomCountHandler = (
  type: number,
  roomCount: number,
  setRoomCount: any,
) => {
  if (type === 1) {
    if (roomCount < 8) setRoomCount(roomCount + 1);
  } else {
    if (roomCount > 1) setRoomCount(roomCount - 1);
  }
};
