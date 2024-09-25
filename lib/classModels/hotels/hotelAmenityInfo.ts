export class HotelAmenityInformation {
  amenity_Id: string = "";
  amenity_Name: string = "";
  amenity_Info: string = "";
  amenity_Image_Url: string = "";

  constructor(
    amenity_Id: string = "",
    amenity_Name: string = "",
    amenity_Info: string = "",
    amenity_Image_Url: string = ""
  ) {
    this.amenity_Id = amenity_Id;
    this.amenity_Name = amenity_Name;
    this.amenity_Info = amenity_Info;
    this.amenity_Image_Url = amenity_Image_Url;
  }
}
