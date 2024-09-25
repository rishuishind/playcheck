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
    const response = await mailTransporter.sendMail({
      from: senderEmail,
      to: userBooking.user_Email_Id,
      subject: `Room Reservation from Staybook - ${userBooking.receipt_Id}`,
      text: `Your booking at ${userBooking.hotel_Name} has been confirmed.`, // it'll only visible when the client cannot render the HTML
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width" />
          <title>Email template</title>
        </head>

        <body>
          <div
            id="email"
            style="
              width: 640px;
              margin: auto;
              background: #005250;
              font-family: sans-serif;
            "
          >
            <!-- Header -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="16"
              style="padding: 16px"
            >
              <tr>
                <td align="center">
                  <img
                    alt="brand_logo"
                    src="https://res.cloudinary.com/du2tgu54d/image/upload/v1697017137/logo_guukcs.png"
                    width="100px"
                  />
                </td>
                <td style="color: white">
                  <p>Thank you for booking with us...</p>
                  <p style="font-size: 20px; font-weight: bold">
                    Your booking at Staybook - ${userBooking.hotel_Name} is
                    confirmed
                  </p>
                </td>
              </tr>
            </table>

            <!-- Simple details -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              style="padding: 16px"
            >
              <tr>
                <td bgcolor="#ffffff" style="padding: 16px; border-radius: 10px">
                  <p style="font-size: 16px">
                    &#9864;
                    <b>${userBooking.hotel_Name}</b> is expecting you on
                    ${checkInDate}, 12:00 PM onwards. for
                    ${userBooking.total_Guests_Count} guest(s) is confirmed. You
                    have reserved ${userBooking.total_Rooms_Count} room(s) for
                    ${userBooking.num_nights} night(s).
                  </p>

                  <p style="font-size: 16px">
                    &#9864; ${bookingMessage}
                  </p>
                </td>
              </tr>
            </table>

            <!-- hotel name and rating -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="16"
              style="padding: 0 16px"
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  width="100%"
                  style="padding: 16px; border-radius: 10px 10px 0 0"
                >
                  <h2 style="font-size: 20px; margin: 0">
                    Staybook - ${userBooking.hotel_Name}
                  </h2>
                  <p
                    style="
                      font-family: sans-serif;
                      font-size: 16px;
                      margin: 7px 0 0 0;
                    "
                  >
                    ${hotelStars}
                  </p>
                </td>
              </tr>
            </table>

            <!-- flex section with hotel details -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="16"
              style="padding: 0 16px"
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  width="60%"
                  style="
                    vertical-align: top;
                    padding: 16px;
                    border-radius: 0 0 0 10px;
                  "
                >
                  <p style="margin: 0">&#9864; ${userBooking.hotel_Landmark}</p>
                  <p>
                    &#9864;
                    <a
                      color="#000000"
                      style="text-decoration: none"
                      href="tel:+919910613040"
                      >9910613040</a
                    >
                  </p>
                  <p>
                    &#9864;
                    <a style="color: #000000" href="mailto:staybookbooking@gmail.com"
                      >booking@staybook.in</a
                    >
                  </p>

                  <br />
                  <strong>Please Note</strong>
                  <p style="font-size: 0.875rem">
                    &#9864; For early check-in and extra bed please contact
                    the hotel directly.
                  </p>
                </td>

                <td bgcolor="#ffffff" style="border-radius: 0 0 10px 0">
                  <a
                    target="_blank"
                    style="
                      display: grid;
                      place-items: center;
                      position: relative;
                      width: 100%;
                      height: 180px;
                      overflow: hidden;
                    "
                  >
                    <img
                      class="hotel_image"
                      style="position: absolute"
                      src="${userBooking.hotel_Image_Url}"
                      width="100%"
                    />
                  </a>
                  <a
                    href="${userBooking.hotel_Map_Url}"
                    target="_blank"
                    align="center"
                    style="
                      display: block;
                      background-color: #005250;
                      padding: 12px;
                      font-size: 18px;
                      color: #ffffff;
                      margin-top: 16px;
                      border-radius: 5px;
                    "
                  >
                    View on Map
                  </a>
                </td>
              </tr>
            </table>

            <!-- Booking heading -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="16"
              style="padding: 16px 16px 0 16px"
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  width="100%"
                  style="padding: 16px; border-radius: 10px 10px 0 0"
                >
                  <h2 style="font-size: 20px">Booking Details</h2>
                </td>
              </tr>
            </table>

            <!-- flex section about nights details -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="16"
              style="padding: 0 16px"
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  width="30%"
                  style="vertical-align: top; padding: 16px 0 0 16px"
                >
                  <strong>${userBooking.num_nights} Night(s) Stay</strong>
                </td>

                <td bgcolor="#ffffff" width="35%" style="padding: 16px">
                  <p style="font-size: 13px; margin: 0">Check-in</p>
                  <p style="font-weight: bold; margin: 5px 0 5px 0">
                    ${checkInDate}
                  </p>
                  <p style="font-size: 13px; margin: 0">after 12 PM</p>
                </td>

                <td bgcolor="#ffffff" width="35%" style="padding: 16px">
                  <p style="font-size: 13px; margin: 0">Check-out</p>
                  <p style="font-weight: bold; margin: 5px 0 5px 0">
                    ${checkOutDate}
                  </p>
                  <p style="font-size: 13px; margin: 0">before 11 AM</p>
                </td>
              </tr>
            </table>

            <!-- flex section about rooms details -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="16"
              style="padding: 0 16px"
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  width="30%"
                  style="vertical-align: top; padding: 16px 0 0 16px"
                >
                  <strong>${userBooking.total_Rooms_Count} Room(s)</strong>
                </td>

                <td bgcolor="#ffffff" width="70%" style="padding: 16px">
                  <p style="font-weight: bold; margin: 5px 0 5px 0">
                    ${roomsInfo}
                  </p>
                  <p style="font-size: 13px; margin: 0">
                    ${userBooking.total_Guests_Count} Adult(s),
                    ${userBooking.total_Children_Count} child(s)
                  </p>
                  <p style="font-size: 13px; margin: 0"></p>
                </td>
              </tr>
            </table>

            <!-- flex section about guest deatails -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="16"
              style="padding: 0 16px"
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  width="30%"
                  style="
                    vertical-align: top;
                    padding: 16px 0 0 16px;
                    border-radius: 0 0 0 10px;
                  "
                >
                  <strong>${userBooking.total_Guests_Count} Guest(s)</strong>
                </td>

                <td
                  bgcolor="#ffffff"
                  width="70%"
                  style="padding: 16px; border-radius: 0 0 10px 0"
                >
                  <p style="font-size: 13px; margin: 0">
                    ${userBooking.total_Rooms_Count} Room(s) (Primary Guest)
                  </p>
                  <p style="font-weight: bold; margin: 5px 0 5px 0">
                    ${userBooking.user_Name}
                  </p>
                  <p style="font-size: 13px; margin: 0">
                    ${userBooking.user_Email_Id} ,
                    ${userBooking.user_Phone_Number}
                  </p>
                </td>
              </tr>
            </table>

            <!-- Payment heading -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="16"
              style="padding: 16px 16px 0 16px"
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  width="100%"
                  style="padding: 16px; border-radius: 10px 10px 0 0"
                >
                  <h2 style="font-size: 20px">Payment Details</h2>
                </td>
              </tr>
            </table>

            <!-- flex section about payment details -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="16"
              style="padding: 0 16px"
            >
              <tr>
                <td
                  bgcolor="#ffffff"
                  width="30%"
                  style="
                    vertical-align: top;
                    padding: 16px;
                    border-radius: 0 0 0 10px;
                  "
                >
                  <strong
                    >Price Breakup <br />
                    (in INR)</strong
                  >
                </td>

                <td bgcolor="#ffffff" width="35%" style="padding: 16px">
                  <p style="font-weight: bold; margin: 0">Total room price</p>
                  <p style="font-weight: bold; margin: 24px 0 32px 0">Total tax</p>
                  <p style="font-weight: bold; margin: 0">Total Price</p>
                </td>

                <td
                  bgcolor="#ffffff"
                  width="35%"
                  align="right"
                  style="padding: 16px; border-radius: 0 0 10px 0"
                >
                  <p style="font-weight: bold; margin: 0">
                    &#8377; ${Math.ceil(userBooking.total_Room_Cost)}
                  </p>
                  <p style="font-weight: bold; margin: 24px 0 32px 0">
                    &#8377; ${Math.ceil(userBooking.total_Tax)}
                  </p>
                  <p style="font-weight: bold; margin: 0">
                    &#8377; ${Math.ceil(userBooking.total_Price)}
                  </p>
                </td>
              </tr>
            </table>

            <!-- Hotel policy -->
            <table role="presentation" border="0" width="100%" style="padding: 16px">
              <tr>
                <td
                  bgcolor="#ffffff"
                  align="left"
                  style="padding: 16px; border-radius: 10px"
                >
                  <h2 style="font-size: 28px; margin: 0 0 20px 0; font-family: Arial">
                    Hotel Policies
                  </h2>
                  <p style="font-size: 12px">
                    1. Please Note: You can check in using any government-issued ID
                    (except PAN card) and address proof of any local or outstation
                    address. Do carry your original ID (Photocopy not accepted) for
                    cross-verification. Couples are welcome.
                  </p>
                  <p style="font-size: 12px">
                    2. Early check-in or late check-out is subject to availability and
                    may be chargeable by the hotel directly.
                  </p>
                  <p style="font-size: 12px">
                    3. If cancelled before 7 days: 85% refund, Between 7 days-72 hrs:
                    50% refund, Less than 72hrs, No-Shows or Early Checkout : No
                    refund.
                  </p>
                  <p style="font-size: 12px">
                    4. It is mandatory for guests to present valid photo
                    identification upon check in.
                  </p>
                  <p style="font-size: 12px">
                    5. We reserve the right to cancel or modify reservations where it
                    appears that a customer has engaged in fraudulent or inappropriate
                    activity or under other circumstances where it appears that the
                    reservations contain or resulted from a mistake or error.
                  </p>
                  <p style="font-size: 12px">
                    6. To make modifications or cancellations please Reply to this
                    email.
                  </p>
                  <p style="font-size: 12px">
                    7. Refund shall be initiated within 48 hours of receiving the
                    request and the payment would be credited within 5-7 working days
                    via the same mode as used while making the booking.
                  </p>
                  <p style="font-size: 12px">
                    For more assistance, please visit the Staybook help center
                    <a href="https://staybook.in/contactUs">here</a>
                  </p>
                </td>
              </tr>
            </table>

            <!-- Footer -->
            <table
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="16"
              style="padding: 16px"
            >
              <tr>
                <td align="center" style="padding: 16px">
                  <a
                    href="https://staybook.in"
                    target="_blank"
                    class="display: block"
                  >
                    <img
                      alt="brand_logo"
                      src="https://res.cloudinary.com/du2tgu54d/image/upload/v1697017137/logo_guukcs.png"
                      width="64px"
                    />
                  </a>
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
