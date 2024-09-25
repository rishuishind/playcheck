import algoliasearch from "algoliasearch/lite";
import { HOTEL_CITY_COLLECTION_NAME, HOTEL_CITY_REGION_COLLECTION_NAME } from "../helper";

let application_id: string = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";
let search_key: string = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || "";

let algoliaClient = algoliasearch(application_id, search_key);

export let hotel_detail_information_algolia_index = algoliaClient.initIndex(
  "HOTEL-DETAILS-INFORMATION-V2"
);

export let hotel_city_information_algolia_index = algoliaClient.initIndex(
  HOTEL_CITY_COLLECTION_NAME
);

export let hotel_region_information_algoria_index = algoliaClient.initIndex(
  HOTEL_CITY_REGION_COLLECTION_NAME,
);
