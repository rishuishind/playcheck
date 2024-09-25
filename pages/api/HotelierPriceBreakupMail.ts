import { format } from "date-fns";
import { mailTransporter, senderEmail } from "./utils/nodemailerService";

const HotelierPriceBreakupMail = async (req: any, res: any) => {
  const {
    userBooking,
    checkInDate,
    checkOutDate,
    hotelStars,
    bookingMessage,
    roomsInfo,
  } = req.body;

  // function printDatesBetween(startDate, endDate) {
  // const start = parseDate(startDate);
  // const end = parseDate(endDate);
  // const current = new Date(start);
  // while (checkInDate <= checkOutDate) {
  //   console.log(checkInDate);
  //   checkInDate.setDate(checkInDate.getDate() + 1);
  // }

  // function parseDate(dateString) {
  //   const parts = dateString.split("/");
  //   return new Date(parts[2], parts[1] - 1, parts[0]);
  // }

  // function formatDate(date) {
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const year = date.getFullYear();
  //   return ${day}/${month}/${year};
  // }

  try {
    let roomsLoop = "";
    let grandTotal = 0;
    let grandTotalTag = `Grand Total of (${userBooking.roomsList.length}) ${
      userBooking.roomsList.length > 1 ? "Rooms" : "Room"
    }`;
    let grandStaybookCommision = 0;
    let grandGSTOnCommision = 0;
    let grandTCS = 0;
    let grandTDS = 0;
    let grandTotalStaybookCommision = 0;

    for (let room = 0; room <= userBooking.roomsList.length - 1; room++) {
      let roomTotal = 0;
      let totalDatePlanCount = userBooking.roomsList[room].priceBreakUp.length;
      let roomTotalTag = `Room Grand Total for (${totalDatePlanCount}) ${
        totalDatePlanCount > 1 ? "Days" : "Day"
      }`;
      let roomTotalStaybookCommission = 0;
      let roomTotalGSTOnCommision = 0;
      let roomTotalTCS = 0;
      let roomTotalTDS = 0;
      let roomTotalStaybookCommision = 0;

      let roomDatePrices = "";
      for (
        let plan = 0;
        plan <= userBooking.roomsList[room].priceBreakUp.length - 1;
        plan++
      ) {
        roomTotal += userBooking.roomsList[room].priceBreakUp[plan].basePrice;
        grandTotal += userBooking.roomsList[room].priceBreakUp[plan].basePrice;

        roomTotalStaybookCommission += Math.round(
          0.15 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
        );
        grandStaybookCommision += Math.round(
          0.15 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
        );

        roomTotalGSTOnCommision += Math.round(
          0.18 *
            Math.round(
              0.15 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
            ),
        );
        grandGSTOnCommision += Math.round(
          0.18 *
            Math.round(
              0.15 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
            ),
        );

        roomTotalTCS += Math.round(
          0.01 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
        );
        grandTCS += Math.round(
          0.01 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
        );

        roomTotalTDS += Math.round(
          0.01 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
        );
        grandTDS += Math.round(
          0.01 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
        );

        roomTotalStaybookCommision += Math.round(
          0.15 * userBooking.roomsList[room].priceBreakUp[plan].basePrice +
            0.18 *
              Math.round(
                0.15 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
              ) +
            0.01 * userBooking.roomsList[room].priceBreakUp[plan].basePrice +
            0.01 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
        );
        grandTotalStaybookCommision += Math.round(
          0.15 * userBooking.roomsList[room].priceBreakUp[plan].basePrice +
            0.18 *
              Math.round(
                0.15 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
              ) +
            0.01 * userBooking.roomsList[room].priceBreakUp[plan].basePrice +
            0.01 * userBooking.roomsList[room].priceBreakUp[plan].basePrice,
        );

        let basePrice =
          userBooking.roomsList[room].priceBreakUp[plan].basePrice;
        let staybookCommision = Math.round(0.15 * basePrice);
        let GSTOnCommision = Math.round(0.18 * staybookCommision);
        let TCS = Math.round(0.01 * basePrice);
        let TDS = Math.round(0.01 * basePrice);
        let totalStaybookCommision = Math.round(
          staybookCommision + GSTOnCommision + TCS + TDS,
        );
        roomDatePrices += `
      <tr>
        <td>
          <table
            role="presentation"
            width="100%"
            style="
              border-collapse: collapse;
              border-top: 2px solid gray;
              border-bottom: 1px solid gray;
            "
          >
            <tr>
              <td
                width="20%"
                style="border-right: 2px solid gray; padding: 4px"
              >
                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    padding: 10px 0;
                    text-align: center;
                  "
                >
                  ${format(
                    new Date(
                      userBooking.roomsList[room].priceBreakUp[plan].date,
                    ),
                    "MMM dd, yyy",
                  )}
                </p>
              </td>
              <td
                width="14%"
                style="border-right: 2px solid gray; padding: 4px"
              >
                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    padding: 10px 0;
                    text-align: center;
                  "
                >
                  ${userBooking.roomsList[room].priceBreakUp[plan].basePrice}
                </p>
              </td>
              <td width="14%" style="border-left: 2px solid gray; padding: 4px">
                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    padding: 10px 0;
                    text-align: center;
                  "
                >
                 ${staybookCommision}
                </p>
              </td>
              <td width="14%" style="border-left: 2px solid gray; padding: 4px">
                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    padding: 10px 0;
                    text-align: center;
                  "
                >
                  ${GSTOnCommision}
                </p>
              </td>
              <td width="12%" style="border-left: 2px solid gray; padding: 4px">
                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    padding: 10px 0;
                    text-align: center;
                  "
                >
                  ${TCS}
                </p>
              </td>
              <td width="12%" style="border-left: 2px solid gray; padding: 4px">
                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    padding: 10px 0;
                    text-align: center;
                  "
                >
                  ${TDS}
                </p>
              </td>
              <td width="14%" style="border-left: 2px solid gray; padding: 4px">
                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    padding: 10px 0;
                    text-align: center;
                  "
                >
                  ${totalStaybookCommision}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
      }

      roomsLoop += `
        <!-- Room Name -->
        <tr>
          <td>
            <p style="margin: 0; font-size: 12px; padding: 8px 16px">${userBooking.roomsList[room].room_Name}, (${userBooking.roomsList[room].room_Info})</p>
          </td>
        </tr>

        <!-- Room Details about each date prices -->
        ${roomDatePrices}

        <!-- room subtotal -->
        <tr>
          <td>
            <table
                role="presentation"
                width="100%"
                style="
                border-collapse: collapse;
                border-top: 2px solid gray;
                border-bottom: 2px solid gray;
                font-weight: 700;

                "
            >
                <tr>
                <td
                    width="20%"
                    style="border-right: 2px solid gray; padding: 4px"
                >
                    <p
                    style="
                        margin: 0;
                        font-size: 12px;
                        padding: 10px 0;
                        text-align: center;
                    "
                    >
                    ${roomTotalTag}
                    </p>
                </td>
                <td
                    width="14%"
                    style="border-right: 2px solid gray; padding: 4px"
                >
                    <p
                    style="
                        margin: 0;
                        font-size: 12px;
                        padding: 10px 0;
                        text-align: center;
                    "
                    >
                    ${roomTotal}
                    </p>
                </td>
                <td width="14%" style="border-left: 2px solid gray; padding: 4px">
                    <p
                    style="
                        margin: 0;
                        font-size: 12px;
                        padding: 10px 0;
                        text-align: center;
                    "
                    >
                    ${roomTotalStaybookCommission}
                    </p>
                </td>
                <td width="14%" style="border-left: 2px solid gray; padding: 4px">
                    <p
                    style="
                        margin: 0;
                        font-size: 12px;
                        padding: 10px 0;
                        text-align: center;
                    "
                    >
                    ${roomTotalGSTOnCommision}
                    </p>
                </td>
                <td width="12%" style="border-left: 2px solid gray; padding: 4px">
                    <p
                    style="
                        margin: 0;
                        font-size: 12px;
                        padding: 10px 0;
                        text-align: center;
                    "
                    >
                    ${roomTotalTCS}
                    </p>
                </td>
                <td width="12%" style="border-left: 2px solid gray; padding: 4px">
                    <p
                    style="
                        margin: 0;
                        font-size: 12px;
                        padding: 10px 0;
                        text-align: center;
                    "
                    >
                    ${roomTotalTDS}
                    </p>
                </td>
                <td width="14%" style="border-left: 2px solid gray; padding: 4px">
                    <p
                    style="
                        margin: 0;
                        font-size: 12px;
                        padding: 10px 0;
                        text-align: center;
                    "
                    >
                   ${roomTotalStaybookCommision}
                    </p>
                </td>
                </tr>
            </table>
          </td>
        </tr>
    `;
    }

    // HTML content with nested loops
    let htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HOtelier mail body</title>
      </head>
      <body>
        <div
          id="email"
          style="
            box-sizing: border-box;
            width: 640px;
            margin: auto;
            background: #005250;
            font-family: sans-serif;
            padding: 32px 32px 10px 32px;
          "
        >
        <!-- Inner white box -->
        <table
          role="presentation"
          border="0"
          width="100%"
          height="580px"
          bgcolor="#ffffff"
          cellspacing="0"
          cellpadding="0"
          style="border-radius: 100% 100% 0 0; padding: 16px"
        >
        <tr>
          <td align="center" valign="top">
            <table role="presentation" style="margin:0"><tr><td><a href="https://staybook.in" target="_blank"><img src="https://res.cloudinary.com/du2tgu54d/image/upload/v1697017137/logo_guukcs.png" width="72px" style="border-radius:50%"></a></td></tr></table>

            <table role="presentation" style="margin: 0">
              <tr>
                <td align="center">
                  <p style="margin: 0; font-weight: 500; font-size: 12px">
                    Hello Team
                  </p>
                  <p
                    style="
                      font-weight: 0;
                      font-size: 18px;
                      margin: 4px 0;
                      padding: 0 40px;
                    "
                  >
                    You have a new booking from
                    <span style="font-weight: 700; color: #005250"
                      >STAYBOOK</span
                    ><br />
                    @${userBooking.hotel_Name}
                  </p>
                </td>
              </tr>
            </table>

            <table role="presentation" style="margin: 0">
              <tr>
                <td align="center">
                  <img
                    src="${userBooking.hotel_Image_Url}"
                    alt="hotel_Image"
                    style="
                      width: 400px;
                      height: 200px;
                      border-radius: 5px;
                      object-fit: cover;
                    "
                  />
                </td>
              </tr>
            </table>

            <table role="presentation" style="margin: 0">
              <tr>
                <td align="center">
                  <p
                    style="
                      color: #005250;
                      letter-spacing: 1px;
                      margin: 0;
                      font-size: 18px;
                      font-weight: 700;
                      text-decoration: underline;
                    "
                  >
                    Hotel Booking Details
                  </p>
                </td>
              </tr>
            </table>

            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              style="padding: 16px 0; font-size: 12px"
            >
              <tr>
                <td align="center" width="50%">
                  <table role="presentation" width="100%">
                    <tr>
                      <td width="40%">
                        <p
                          style="
                            margin: 0;
                            font-weight: 700;
                            color: #005250;
                            padding: 2px 0;
                          "
                        >
                          Booking Id :
                        </p>
                      </td>
                      <td width="60%">
                        <p style="margin: 0; padding: 2px 0">
                          ${userBooking.receipt_Id}
                        </p>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" width="100%">
                    <tr>
                      <td width="40%">
                        <p
                          style="
                            margin: 0;
                            font-weight: 700;
                            color: #005250;
                            padding: 2px 0;
                          "
                        >
                          Customer Name :
                        </p>
                      </td>
                      <td width="60%">
                        <p style="margin: 0; padding: 2px 0">
                          ${userBooking.user_Name}
                        </p>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" width="100%">
                    <tr>
                      <td width="40%">
                        <p
                          style="
                            margin: 0;
                            font-weight: 700;
                            color: #005250;
                            padding: 2px 0;
                          "
                        >
                          Customer Email :
                        </p>
                      </td>
                      <td width="60%">
                        <p style="margin: 0; padding: 2px 0">
                          ${userBooking.user_Email_Id}
                        </p>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" width="100%">
                    <tr>
                      <td width="40%">
                        <p
                          style="
                            margin: 0;
                            font-weight: 700;
                            color: #005250;
                            padding: 2px 0;
                          "
                        >
                          Customer Ph No. :
                        </p>
                      </td>
                      <td width="60%">
                        <p style="margin: 0; padding: 2px 0">
                          ${userBooking.user_Phone_Number}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>

                <td
                  align="center"
                  width="50%"
                  style="border-left: 1px solid #e8a646"
                >
                  <table role="presentation" width="100%">
                    <tr>
                      <td width="40%" style="padding-left: 16px">
                        <p
                          style="
                            margin: 0;
                            font-weight: 700;
                            color: #005250;
                            padding: 2px 0;
                          "
                        >
                          Check-In :
                        </p>
                      </td>
                      <td width="60%">
                        <p style="margin: 0; padding: 2px 0">${checkInDate}</p>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" width="100%">
                    <tr>
                      <td width="40%" style="padding-left: 16px">
                        <p
                          style="
                            margin: 0;
                            font-weight: 700;
                            color: #005250;
                            padding: 2px 0;
                          "
                        >
                          Check-Out :
                        </p>
                      </td>
                      <td width="60%">
                        <p style="margin: 0; padding: 2px 0">${checkOutDate}</p>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" width="100%">
                    <tr>
                      <td width="40%" style="padding-left: 16px">
                        <p
                          style="
                            margin: 0;
                            font-weight: 700;
                            color: #005250;
                            padding: 2px 0;
                          "
                        >
                          No. of Rooms :
                        </p>
                      </td>
                      <td width="60%">
                        <p style="margin: 0; padding: 2px 0">
                          ${userBooking.total_Rooms_Count}
                        </p>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" width="100%">
                    <tr>
                      <td width="40%" style="padding-left: 16px">
                        <p
                          style="
                            margin: 0;
                            font-weight: 700;
                            color: #005250;
                            padding: 2px 0;
                          "
                        >
                          No. of Guests :
                        </p>
                      </td>
                      <td width="60%">
                        <p style="margin: 0; padding: 2px 0">
                          ${userBooking.total_Guests_Count} ${
                            userBooking.total_Children_Count > 0
                              ? ` ,
                          <span style="font-weight: 700; color: #005250">
                            Children:
                          </span>
                          ${userBooking.total_Children_Count}`
                              : ``
                          }
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <table
        role="presentation"
        border="0"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        bgcolor="#ffffff"
        style="
          padding: 0 16px 16px 16px;
          margin-top: -18px;
          border-radius: 0 0 10px 10px;
        "
      >
        <tr>
          <td align="left">
            <table role="presentation">
              <tr>
                <td>
                  <p
                    style="
                      margin: 0;
                      font-size: 12px;
                      padding: 10px 0;
                      text-align: center;
                    "
                  >
                    <span style="font-weight: 700; color: #005250"
                      >Room Details :
                    </span>
                    ${roomsInfo}
                  </p>
                </td>
              </tr>
            </table>
            <table role="presentation">
              <tr>
                <td width="40%">
                  <p
                    style="
                      margin: 0;
                      font-size: 18px;
                      font-weight: 700;
                      color: #005250;
                      padding: 2px 0;
                    "
                  >
                    <span>Total Booking Amount : </span>
                    ${Math.ceil(userBooking.total_Price)}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      

            <table
            role="presentation"
            border="0"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            bgcolor="#ffffff"
            style="margin-top: 16px; border-radius: 10px; border: 2px solid gray"
            >
            <!-- table heading heading -->
            <tr>
                <td
                align="center"
                style="border-bottom: 2px solid gray; padding: 16px 0"
                >
                <table role="presentation" width="100%">
                    <tr>
                    <td>
                        <p
                        style="
                            margin: 0;
                            font-size: 16px;
                            padding: 2px 0;
                            text-align: center;
                            font-weight: 700;
                        "
                        >
                        PAYMENT BREAK-UP
                        </p>
                        <p
                        style="
                            margin: 0;
                            font-size: 12px;
                            padding: 2px 0;
                            text-align: center;
                        "
                        >
                        (Currency = INR)
                        </p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <tr>
          <td>
            <table
              role="presentation"
              width="100%"
              style="border-collapse: collapse; border-bottom: 2px solid gray"
            >
              <tr>
                <td
                  width="20%"
                  style="border-right: 2px solid gray; padding: 4px"
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 12px;
                      padding: 10px 0;
                      text-align: center;
                    "
                  ></p>
                </td>
                <td
                  width="14%"
                  style="border-right: 2px solid gray; padding: 4px"
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 12px;
                      padding: 10px 0;
                      text-align: center;
                    "
                  >
                    Room Base Charge
                  </p>
                </td>
                <td
                  width="14%"
                  style="border-left: 2px solid gray; padding: 4px"
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 12px;
                      padding: 10px 0;
                      text-align: center;
                    "
                  >
                    Staybook Cimmission (15%)
                  </p>
                </td>
                <td
                  width="14%"
                  style="border-left: 2px solid gray; padding: 4px"
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 12px;
                      padding: 10px 0;
                      text-align: center;
                    "
                  >
                    GST on Commission (18%)
                  </p>
                </td>
                <td
                  width="12%"
                  style="border-left: 2px solid gray; padding: 4px"
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 12px;
                      padding: 10px 0;
                      text-align: center;
                    "
                  >
                    TCS (1%)
                  </p>
                </td>
                <td
                  width="12%"
                  style="border-left: 2px solid gray; padding: 4px"
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 12px;
                      padding: 10px 0;
                      text-align: center;
                    "
                  >
                    TDS (1%)
                  </p>
                </td>
                <td
                  width="14%"
                  style="border-left: 2px solid gray; padding: 4px"
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 12px;
                      padding: 10px 0;
                      text-align: center;
                    "
                  >
                    Total Payable Commission
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

            <!-- Rooms Loop -->
            ${roomsLoop}

            <!-- grand total -->
            <tr>
                <td>
                <table
                    role="presentation"
                    width="100%"
                    style="
                    border-collapse: collapse;
                    border-top: 2px solid gray;
                    margin-top: 16px;
                    font-weight: 700;
                    "
                >
                    <tr>
                    <td
                        width="20%"
                        style="border-right: 2px solid gray; padding: 4px"
                    >
                        <p
                        style="
                            margin: 0;
                            font-size: 12px;
                            padding: 10px 0;
                            text-align: center;
                        "
                        >
                        ${grandTotalTag}
                        </p>
                    </td>
                    <td
                        width="14%"
                        style="border-right: 2px solid gray; padding: 4px"
                    >
                        <p
                        style="
                            margin: 0;
                            font-size: 12px;
                            padding: 10px 0;
                            text-align: center;
                        "
                        >
                        ${grandTotal}
                        </p>
                    </td>
                    <td width="14%" style="border-left: 2px solid gray; padding: 4px">
                        <p
                        style="
                            margin: 0;
                            font-size: 12px;
                            padding: 10px 0;
                            text-align: center;
                        "
                        >
                        ${grandStaybookCommision}
                        </p>
                    </td>
                    <td width="14%" style="border-left: 2px solid gray; padding: 4px">
                        <p
                        style="
                            margin: 0;
                            font-size: 12px;
                            padding: 10px 0;
                            text-align: center;
                        "
                        >
                        ${grandGSTOnCommision}
                        </p>
                    </td>
                    <td width="12%" style="border-left: 2px solid gray; padding: 4px">
                        <p
                        style="
                            margin: 0;
                            font-size: 12px;
                            padding: 10px 0;
                            text-align: center;
                        "
                        >
                        ${grandTCS}
                        </p>
                    </td>
                    <td width="12%" style="border-left: 2px solid gray; padding: 4px">
                        <p
                        style="
                            margin: 0;
                            font-size: 12px;
                            padding: 10px 0;
                            text-align: center;
                        "
                        >
                        ${grandTDS}
                        </p>
                    </td>
                    <td width="14%" style="border-left: 2px solid gray; padding: 4px">
                        <p
                        style="
                            margin: 0;
                            font-size: 12px;
                            padding: 10px 0;
                            text-align: center;
                        "
                        >
                        ${grandTotalStaybookCommision}
                        </p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>

            <!-- summary -->
      <table
        role="presentation"
        border="0"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        bgcolor="#ffffff"
        style="margin-top: 16px; border-radius: 10px;"
      >
        <!-- table heading heading -->
        <tr>
          <td
            align="center"
            style="border-bottom: 2px solid gray; padding: 16px 0"
          >
            <table role="presentation" width="100%">
              <tr>
                <td>
                  <p
                    style="
                      margin: 0;
                      font-size: 16px;
                      padding: 2px 0;
                      text-align: center;
                      font-weight: 700;
                    "
                  >
                    PAYMENT SUMMARY
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- table row heading -->
        <tr>
          <td>
            <table role="presentation" width="100%">
              <tr>
                <td width="80%" style="padding-left: 16px">
                  <p
                    style="
                      margin: 0;
                      font-weight: 700;
                      color: #005250;
                      padding: 2px 0;
                    "
                  >
                    (A) Gross Hotel Chargers
                  </p>
                </td>
                <td width="20%">
                  <p style="margin: 0; padding: 2px 0">${grandTotal}</p>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%">
              <tr>
                <td width="80%" style="padding-left: 16px">
                  <p
                    style="
                      margin: 0;
                      font-weight: 700;
                      color: #005250;
                      padding: 2px 0;
                    "
                  >
                    Staybook Commission @15%
                  </p>
                </td>
                <td width="20%">
                  <p style="margin: 0; padding: 2px 0">${grandStaybookCommision}</p>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%">
              <tr>
                <td width="80%" style="padding-left: 16px">
                  <p
                    style="
                      margin: 0;
                      font-weight: 700;
                      color: #005250;
                      padding: 2px 0;
                    "
                  >
                    GST on Commission @18%
                  </p>
                </td>
                <td width="20%">
                  <p style="margin: 0; padding: 2px 0">${grandGSTOnCommision}</p>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%">
              <tr>
                <td width="80%" style="padding-left: 16px">
                  <p
                    style="
                      margin: 0;
                      font-weight: 700;
                      color: #005250;
                      padding: 2px 0;
                    "
                  >
                    (B) Total Staybook Commission
                  </p>
                </td>
                <td width="20%">
                  <p style="margin: 0; padding: 2px 0">${
                    grandStaybookCommision + grandGSTOnCommision
                  }</p>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%">
              <tr>
                <td width="80%" style="padding-left: 16px">
                  <p
                    style="
                      margin: 0;
                      font-weight: 700;
                      color: #005250;
                      padding: 2px 0;
                    "
                  >
                    TCS @1%
                  </p>
                </td>
                <td width="20%">
                  <p style="margin: 0; padding: 2px 0">${grandTCS}</p>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%">
              <tr>
                <td width="80%" style="padding-left: 16px">
                  <p
                    style="
                      margin: 0;
                      font-weight: 700;
                      color: #005250;
                      padding: 2px 0;
                    "
                  >
                    TDS @1%
                  </p>
                </td>
                <td width="20%">
                  <p style="margin: 0; padding: 2px 0">${grandTDS}</p>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%">
              <tr>
                <td width="80%" style="padding-left: 16px">
                  <p
                    style="
                      margin: 0;
                      font-weight: 700;
                      color: #005250;
                      padding: 2px 0;
                      font-size: 16px;
                    "
                  >
                    Total Staybook Commission
                  </p>
                </td>
                <td width="20%">
                  <p style="margin: 0; padding: 2px 0; font-size: 16px">${grandTotalStaybookCommision}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

            <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" style="padding:16px"><tr><td align="center"><a href="https://staybook.in" target="_blank" class="display: block"><img alt="brand_logo" src="https://res.cloudinary.com/du2tgu54d/image/upload/v1697017137/logo_guukcs.png" width="42px" style="border-radius:50%"></a></td></tr><tr><td align="center"><p style="margin:2px 0 0 0;font-weight:700;color:#e8a646">Thank you</p></td></tr></table>
          </div>
        </body>
      </html>
    `;

    const response = await mailTransporter.sendMail({
      from: senderEmail,
      to: userBooking.hotel_Email_Id,
      subject: `Room Confirmation from Staybook - (Booking ID: ${userBooking.receipt_Id})`,
      text: `You have a new Booking for ${userBooking.hotel_Name}.`,
      html: htmlContent,
    });

    res.status(201).json({
      name: "Nodemailer Success",
      messaeg: "Booking mail sent",
    });
  } catch (error) {
    res.status(400).json({
      name: "Nodemailer Error",
      messaeg: "Unable to send mail",
    });
  }
};

export default HotelierPriceBreakupMail;
