import { addDays } from "@/lib/helper";

export class FetchHotelDetailsQueryParams {
  hotelSlugName: string = "";
  roomId: string = "";
  planId: string = "";
  numGuests: number = 2;
  childAgeList: any[] = [];
  checkInDate: Date = new Date();
  checkOutDate: Date = addDays(new Date(), 1);

  fetchHotelAmenityList: boolean = false;
  amenityListSize: number = 5;
  fetchHotelFAQList: boolean = false;
  faqListSize: number = 100;
  fetchHotelImageList: boolean = false;
  fetchHotelReviewsList: boolean = false;
  fetchHotelNearbyPlacesList: boolean = false;
  fetchHotelNearbyHotelsList: boolean = false;
  fetchHotelRoomsList: boolean = false;
  fetchAllHotelRoomsList: boolean = false;
}
