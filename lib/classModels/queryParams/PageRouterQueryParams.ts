import { addDays, getDateDifference } from "@/lib/helper";

export class PageRouterQueryParams {
  router: any;
  new_tab: boolean = false;
  push: boolean = true;

  hotelSlugName: string = "";
  hotelName: string = "";

  roomId: string = "";
  roomName: string = "";

  planId: string = "";
  planName: string = "";
  isWebpage: boolean = true;
  checkin: Date = new Date();
  checkout: Date = addDays(new Date(), 1);
  num_nights: number = getDateDifference(this.checkin, this.checkin);
  num_guests: number = 2;
  num_adults: number = 2;
  num_rooms: number = 1;
  num_children: number = 0;
  searchText: string = "";
  value: any = "";
  hotelSlugFromSearch: string = "";
  child_age: any[] = [];

  constructor(
    router: any,
    push: boolean = true,
    hotelSlugName: string = "",
    isWebpage: boolean = true,
    checkin: Date = new Date(),
    checkout: Date = addDays(new Date(), 1),
    num_nights: number = 1,
    num_guests: number = 2,
    hotelSlugFromSearch: string = "",
  ) {
    this.router = router;
    this.push = push;
    this.hotelSlugName = hotelSlugName;
    this.checkin = checkin;
    this.checkout = checkout;
    this.num_nights = num_nights;
    this.num_guests = num_guests;
    this.isWebpage = isWebpage;
    this.hotelSlugFromSearch = hotelSlugFromSearch;
  }
}
