import * as qs from 'querystring';
import { decryptCCAvenue } from "@/lib/helper/ccAvenueHelper";

async function handler(request: any, response: any) {
  var ccavEncResponse = "";
  var ccavResponse = "";
  var workingKey = process.env.NEXT_PUBLIC_WORKING_KEY; //Put in the 32-Bit key shared by CCAvenues.

  request.on("data", function (data: any) {
    ccavEncResponse += data;
    var ccavPOST = qs.parse(ccavEncResponse);
    var encryption = ccavPOST.encResp;
    ccavResponse = decryptCCAvenue(encryption, workingKey);
  });

  request.on("end", function () {
    var pData = "";
    var htmlcode = "";
    pData = "<table border=1 cellspacing=2 cellpadding=2><tr><td>";
    pData = pData + ccavResponse.replace(/=/gi, "</td><td>");
    pData = pData.replace(/&/gi, "</td></tr><tr><td>");
    pData = pData + "</td></tr></table>";
    htmlcode =
      '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' +
      pData +
      "</center><br></body></html>";
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(htmlcode);
    response.end();
  });

  return;
}

export default handler;
