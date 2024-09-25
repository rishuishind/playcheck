import { City } from "./city";

export class State {
  name: string = "";
  state_id: string = "";
  state_slug_name: string = "";
  code: number = 0;
  cities: City[] = [];
  capital: string = "";

  constructor(
    name: string = "",
    code: number = 0,
    cities: City[] = [],
    capital: string = ""
  ) {
    this.name = name;
    this.code = code;
    this.cities = cities;
    this.capital = capital;
  }
}