
export class Location {
  location_id: string="";
  location_slug_name: string = "";
  name: string = "";
  type: string = "";
  total_stays: number = 0;
  heading: string = "";
  rating: number = 0;
  address: string = "";
  latitude: number = 0;
  longitude: number = 0;
  description: string = "";
  
  constructor(
    name: string,
    type: string,
    total_stays: number,
    heading: string,
    rating: number,
    address: string = "",
    latitude: number = 0,
    longitude: number = 0,
    description: string = ""
  ) {
    this.name = name;
    this.type = type;
    this.total_stays = total_stays;
    this.heading = heading;
    this.rating = rating;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.description = description;
  }
}
