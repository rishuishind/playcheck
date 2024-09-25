import { encryptCCAvenue } from "@/lib/helper/ccAvenueHelper";

async function handler(request: any, response: any) {
  const bookingData = request.body;
  const { bookingDetails } = bookingData;

  var body = "";
  var workingKey = process.env.NEXT_PUBLIC_CCAVENUE_WORKING_KEY; //Put in the 32-Bit key shared by CCAvenues.
  var accessCode = process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE; //Put in the Access Code shared by CCAvenues.
  var encRequest = "";
  var formbody = "";

  let url = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction`;
  const res = await fetch(`${url}`, {
    method: "POST",
    // body: JSON.stringify({
    //   hotelId: hotelId,
    //   startDate: startDate,
    //   endDate: endDate,
    //   days: days,
    // }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log(res);
  response.status(201).json({ status: res });

  //   request.on("data", function (data: any) {
  //     body += data;
  //     encRequest = encryptCCAvenue(body, workingKey);
  //     formbody =
  //       '<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' +
  //       encRequest +
  //       '"><input type="hidden" name="access_code" id="access_code" value="' +
  //       accessCode +
  //       '"><script language="javascript">document.redirect.submit();</script></form>';
  //   });

  //   request.on("end", function () {
  //     response.writeHeader(200, { "Content-Type": "text/html" });
  //     response.write(formbody);
  //     response.end();
  //   });

  //   response.status(201).json({ status: true });
  return;
}

export default handler;
