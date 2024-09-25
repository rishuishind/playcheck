import { Location } from "./location";

export class City {
  name: string = "";
  city_id: string="";
  locations: Location[] = [];
  city_slug_name: string = "";

  constructor(name: string, locations: Location[] = []) {
    this.name = name;
    this.locations = locations;
  }
}
