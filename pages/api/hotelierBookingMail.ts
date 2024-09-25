import { mailTransporter, senderEmail } from "./utils/nodemailerService";

const handler = async (req: any, res: any) => {
  const receivedData = req.body;
  const {
    userBooking,
    checkInDate,
    checkOutDate,
    hotelStars,
    bookingMessage,
    roomsInfo,
  } = receivedData;

  try {
    let msg1 = `Your payment of ₹${Math.ceil(
      userBooking.amount_Paid,
    )} has been successfully received. Due amount: 0.`;
    let msg2 = `Amount Due: ₹${Math.ceil(
      userBooking.total_Price,
    )}, Payment request will be accepted at the time of hotel check-in.`;
    const response = await mailTransporter.sendMail({
      from: senderEmail,
      to: userBooking.hotel_Email_Id,
      subject: `Room Confirmation from Staybook - (Booking ID: ${userBooking.receipt_Id})`,
      text: `You have a new Booking for ${userBooking.hotel_Name}.`, // it'll only visible when the client cannot render the HTML
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="text/html; UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" title="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" title="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap"
            rel="stylesheet"  title="preconnect"
          />
          <title>Document</title>
          <style type="text/css">
            * {
              font-family: "Quicksand", sans-serif;
            }
          </style>
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
                  <table role="presentation" style="margin: 0">
                    <tr>
                      <td>
                        <a href="https://staybook.in" target="_blank">
                          <img
                            src="https://res.cloudinary.com/du2tgu54d/image/upload/v1697017137/logo_guukcs.png"
                            width="72px"
                            style="border-radius: 50%"
                          />
                        </a>
                      </td>
                    </tr>
                  </table>

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
                        title="hotel_Image"
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
                              <p style="margin: 0, padding: 2px 0">
                                ${userBooking.total_Guests_Count}
                                ${
                                  userBooking.total_Children_Count > 0
                                    ? `
                                    , <span style="font-weight: 700;
                                  color: #005250;">
                                      Children:
                                    </span> ${userBooking.total_Children_Count}`
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

            <!-- Footer -->

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
                        <p style="margin: 0; font-size: 12px; padding: 2px 0">
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
              style="padding: 16px"
            >
              <tr>
                <td align="center">
                  <a
                    href="https://staybook.in"
                    target="_blank"
                    class="display: block"
                  >
                    <img
                      alt="brand_logo"
                      src="https://res.cloudinary.com/du2tgu54d/image/upload/v1697017137/logo_guukcs.png"
                      width="42px"
                      style="border-radius: 50%"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <p style="margin: 2px 0 0 0; font-weight: 700; color: #e8a646">
                    Thank you
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </body>
      </html>
      `,
    });

    res.status(201).json({
      status: true,
      responseMessage:
        "Successfully sended the booking confirmation mail to the user.",
    });
  } catch (error) {
    res.status(422).json({
      status: false,
      responseMessage: "Something went wrong. Unable to send mail",
    });
  }
};

export default handler;
