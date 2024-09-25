export class ReviewInformation {
  review_id: string = "";
  review_posting_time: string = "";
  user_comment: string = "";
  user_image_url: string = "";
  user_name: string = "";
  user_rating: string = "";
  review_type: reviewTypeInfo = new reviewTypeInfo();
}

export class reviewTypeInfo {
  review_image_url: string = "";
  review_type_name: string = "";
}
