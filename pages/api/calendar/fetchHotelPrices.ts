import { hotelPriceRangeMatrix } from "@/lib/handlers/calendarHandler";

async function handler(req: any, res: any) {
  const priceList = hotelPriceRangeMatrix();
  const receivedData = req.body;
  const {
    firebase_Hotel_Id,
    hotelOwnerUniqueId,
    hotelUniqueId,
    fromDate,
    toDate,
    num_guests,
  } = receivedData;

  // const hotelOwnerUniqueId = "WKIwkkplX4U6ECb2dqpltKlh4WD2";
  // const hotelUniqueId = "f9EVYs1fi61PbFlI5JeR";
  const startDate = new Date(Date.parse(fromDate));
  const endDate = new Date(Date.parse(toDate));

  var yearVal = startDate.getFullYear();
  var monthVal = startDate.getMonth();
  var dateVal = startDate.getDate() + 1;
}

export default handler;
