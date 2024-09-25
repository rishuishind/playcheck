import {
  getHotelAmenitiesList,
  getHotelImageObjectList,
  getHotelNearByPlacesList,
  showMessage,
} from "@/lib/firebase/hotelHandler";
import { getHotelRoomDetailsList } from "@/lib/firebase/hotelRoomHandler";

self.onmessage = async (event) => {
  const { data } = event;
  const val = showMessage("Show message");

  try {
    const [imagesList, roomsList, amenitiesList, nearbyPlaces] =
      await Promise.all([
        getHotelImageObjectList(data, 10),
        getHotelRoomDetailsList(data, true, 10),
        getHotelAmenitiesList(data),
        getHotelNearByPlacesList(data),
      ]);

    self.postMessage({
      imagesList,
      roomsList,
      amenitiesList,
      nearbyPlaces,
    });
  } catch (error) {
    self.postMessage({
      imagesList: [],
      roomsList: [],
      amenitiesList: [],
      nearbyPlaces: [],
    });
  }
};
