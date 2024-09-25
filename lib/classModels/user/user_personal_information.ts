export class UserPersonalInformation {
  User_Access_Token: string;
  User_Alternate_Mobile_Number: string;
  User_Auth_Type: string;
  User_Coins: string;
  User_Display_Name: string;
  User_Email_Id: string;
  User_First_Name: string;
  User_Gender: string;
  User_Id: string;
  User_Image_Url: string;
  User_Last_Name: string;
  User_Middle_Name: string;
  User_Mobile_Number: string;
  User_Permanent_Address: string;
  User_Staybook_Coins: number;
  User_Full_Address: string;

  constructor(
    User_Access_Token: string = "",
    User_Alternate_Mobile_Number: string = "",
    User_Auth_Type: string = "",
    User_Coins: string = "",
    User_Display_Name: string = "",
    User_Email_Id: string = "",
    User_First_Name: string = "",
    User_Gender: string = "",
    User_Id: string = "",
    User_Image_Url: string = "",
    User_Last_Name: string = "",
    User_Middle_Name: string = "",
    User_Mobile_Number: string = "",
    User_Permanent_Address: string = "",
    User_Full_Address: string = "",
    User_Staybook_Coins: number = 0
  ) {
    this.User_Access_Token = User_Access_Token;
    this.User_Alternate_Mobile_Number = User_Alternate_Mobile_Number;
    this.User_Auth_Type = User_Auth_Type;
    this.User_Coins = User_Coins;
    this.User_Display_Name = User_Display_Name;
    this.User_Email_Id = User_Email_Id;
    this.User_First_Name = User_First_Name;
    this.User_Gender = User_Gender;
    this.User_Id = User_Id;
    this.User_Image_Url = User_Image_Url;
    this.User_Last_Name = User_Last_Name;
    this.User_Middle_Name = User_Middle_Name;
    this.User_Mobile_Number = User_Mobile_Number;
    this.User_Permanent_Address = User_Permanent_Address;
    this.User_Full_Address = User_Full_Address;
    this.User_Staybook_Coins = User_Staybook_Coins;
  }
}
