export class HotelImageDetails {
  image_Id: string = "";
  image_Title: string = "";
  image_Description: string = "";
  image_Description_List: string[] = [];
  image_Url: string = "";

  image_Meta_Description: string = "";
  image_Meta_Title: string = "";
  image_Type: string = "";

  constructor(imageUrl: string = "", image_Id: string = "") {
    this.image_Url = imageUrl;
    this.image_Id = image_Id;
  }
}
