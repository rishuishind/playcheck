async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { hotelId, fromDate, toDate } = receivedData;

  //   curl --location 'https://cmapi.stayflexi.com/core/apiv1/cmservice/getroomrates/?pmsId=20021&hotelId=25095&roomTypeId=12353&ratePlanId=30298&fromDate=10-03-2023%2000:00:00&toDate=21-03-2023%2000:00:00' --header 'X-SF-API-KEY: mkfegijystay5u70djld9'

  // const apiUrl = `https://cmapi.stayflexi.com/core/apiv1/cmservice/getroomrates/?pmsId=20021&hotelId=${hotelId}&roomTypeId=12353&ratePlanId=30298&fromDate=${fromDate}%2000:00:00&toDate=${toDate}%2000:00:00`;
  const apiUrl = `https://cmapi.stayflexi.com/core/apiv1/cmservice/getroomrates/?pmsId=20021&hotelId=${hotelId}&roomTypeId=12353&ratePlanId=30298&fromDate=${fromDate}%2000:00:00&toDate=${toDate}%2000:00:00`;
  const apiKey = "mkfegijystay5u70djld9";

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-SF-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  res.status(201).json({
    pricePlan: data,
    error: null,
    message: `Price Plan fetched from ${fromDate} to ${toDate}.`,
  });
}

export default handler;
