export class HotelCityInformation {
  hotelCity_Authorization: boolean = true;
  hotelCity_Id: string = "";
  hotelCity_Slug_Name: string = "";
  hotelCity_City_Slug_Name: string = "";
  hotelCity_State_Code: string = "";
  hotelCity_State_TIN: string = "";

  hotelCity_Name: string = "";
  hotelCity_Info: string = "";
  hotelCity_Description: string = "";

  hotelCity_Image_Url: string = "";
  hotelCity_Image_Url_List: string[] = [];

  hotelCity_Meta_Title: string = "";
  hotelCity_Meta_Description: string = "";

  hotelCity_Hotel_Slug_List: any[] = [];
}

export class RegionInformation {
  hotelCityRegion_Authorization: boolean = true;
  hotelCityRegion_Id: string = "";
  hotelCity_Slug_Name: string = "";
  hotelCityRegion_Slug_Name: string = "";

  hotelCityRegion_Name: string = "";
  hotelCityRegion_Info: string = "";
  hotelCityRegion_Description: string = "";

  hotelCityRegion_Display_Image_Url: string = "";
  hotelCityRegion_Image_Url_List: string[] = [];

  hotelCityRegion_Meta_Title: string = "";
  hotelCityRegion_Meta_Description: string = "";

}
