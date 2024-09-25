import { hotel_detail_information_algolia_index } from "@/lib/services/algolia";
import { NextApiRequest, NextApiResponse } from "next";

// get request for searching hotels with algolia
// query params { q:string }
export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { q },
    method,
  }: any = request;
  if (method != "GET") {
    return response
      .status(500)
      .json({ error: "only get http method is allowed for this endpoint" });
  }
  try {
    if (!q)
      return response
        .status(400)
        .json({ error: "cannot fetch results with empty query" });
    const requestOptions = {
      hitsPerPage: 5,
    };

    hotel_detail_information_algolia_index
      .search(q, requestOptions)
      .then((data) => {
        return response.status(200).json({ hits: data.hits });
      });
  } catch (error) {
    return response.status(500).json({ error: "something went wrong" });
  }
};
