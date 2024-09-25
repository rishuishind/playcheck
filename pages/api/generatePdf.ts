import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { format } from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const bookingDetails: BookingDetails = req.body;

  function getDateObj(input: any) {
    let date = new Date();
    if (typeof input === "string") {
      date = new Date(input);
      date.setUTCHours(date.getUTCHours() + 5);
      date.setUTCMinutes(date.getUTCMinutes() + 30);
    } else {
      const milliseconds = input.seconds * 1000 + input.nanoseconds / 1e6;
      date = new Date(milliseconds);
      date.setUTCHours(date.getUTCHours() + 5);
      date.setUTCMinutes(date.getUTCMinutes() + 30);
    }
    return date;
  }
  function getNumberOfNights() {
    let checkIn = getDateObj(bookingDetails.checkin_Time);
    let checkOut = getDateObj(bookingDetails.checkout_Time);
    let differenceInMilliseconds = checkOut.getTime() - checkIn.getTime();
    let differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
    return differenceInDays;
  }
  const getPaymentMode = (totalPrice: number, amountPaid: number) => {
    if (amountPaid === totalPrice) {
      return `Prepaid Booking`;
    } else if (amountPaid > 0) {
      return `Partial Payment`;
    } else {
      return `Pay@Hotel`;
    }
  };
  const paymentMode = getPaymentMode(
    bookingDetails.total_Price,
    bookingDetails.amount_Paid,
  );
  function handlingCharges(totalPrice: number) {
    return Math.max(50, Math.ceil(0.03 * Number(totalPrice)));
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Booking Pdf</title>
    <style media="all" type="text/css">
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .navbar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #005250;
        color: #ffffff;
        padding: 15px 0;
      }

      .navLogo {
        width: 60px;
        height: 60px;
      }

      .container {
        padding: 2.5rem;
      }
      .listDetails {
        padding: 1.5rem;
        margin: 1rem 0;
        border-radius: 1rem;
        border: 2px solid #e8a646;
      }
      .listDetails p {
        padding: 0.5rem 0;
        font-size: 1rem;
      }

      .hotelDetails {
        display: flex;
        padding: 1rem;
        gap: 1rem;
        justify-content: space-between;
        border-radius: 0.5rem;
        border: 2px solid #bfbfbf;
      }
      .hotelImage {
        aspect-ratio: 16 / 9;
        position: relative;
        width: 100%;
        max-width: 32rem;
        border: #005250 2px solid;
      }

      .hotelName {
        font-family: Georgia, Cambria, "Times New Roman", Times, serif;
        font-size: 1.1rem;
        font-weight: 600;
        padding-bottom: 1rem;
        color: #005250;
      }
      .hotelAddress {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        font-weight: 450;
        font-size: medium;
      }
      .hotelLinks {
        padding-block: 0.25rem;
        font-weight: 500;
        letter-spacing: 0.025em;
        text-decoration: none;
        color: black;
        padding-top: 1rem;
      }
      .hotelImfo {
        display: flex;
        flex-direction: column;
        align-items: start;
      }
      .confirmationText {
        font-weight: 300;
        color: #005250;
        margin-bottom: 1rem;
      }

      .bookingDetails {
        display: flex;
        margin: 1rem 0 4rem 0;
        flex-direction: column;
        align-items: center;
        border-radius: 0.5rem;
        border: 2px solid #bfbfbf;
      }
      .heading {
        padding: 1rem;
        width: 100%;
        font-size: 1.5rem;
        line-height: 1.5rem;
        font-weight: 400;
        background-color: #005250;
        color: #ffffff;
        border-radius: 0.5rem 0.5rem 0 0;
        margin-bottom: 1.5rem;
      }

      .bookingContainer {
        display: flex;
        padding: 1rem;
        width: 100%;
      }
      .bookingContainer .leftSide,
      .bookingContainer .rightSide {
        width: 100%;
      }
      .parent {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .parent .title {
        padding-block: 0.25rem;
        width: 100%;
        font-weight: 700;
        letter-spacing: 0.025em;
        color: #005250;
      }
      .parent .data {
        padding-block: 0.25rem;
        width: 100%;
        padding-right: 1.5rem;
        font-weight: 300;
        font-size: small;
        line-height: 1rem;
      }
      .text-left {
        text-align: right;
      }
      .privacyPolicy {
        display: flex;
        margin: 1rem 0;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.5rem;
        border: 2px solid #bfbfbf;
      }
      .privacyPolicy ol li {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        margin: 0 2rem;
      }
    </style>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #ffffff">
    <nav class="navbar">
      <img
        src="https://staybook.in/_next/image?url=%2Fbrand_logo.svg&w=48&q=75"
        alt="logo"
        class="navLogo"
      />
      <p>Thank You Staying with us</p>
    </nav>
    <div class="container">
      <div class="listDetails">
        <p>
          &#8226; ${bookingDetails.hotel_Name} is expecting you on ${format(
            new Date(bookingDetails.booking_Time),
            "dd/MM/yyyy",
          )} onwards. For
          ${bookingDetails.total_Guests_Count} Guests is confirmed. You have
          reserved ${bookingDetails.total_Rooms_Count} Room for
          ${getNumberOfNights()} Night.
        </p>
        <p>
          &bull; You have paid the amount (₹${bookingDetails.amount_Paid}) in
          advance.
        </p>
        <p>
          &#8226; For early check-in and extra bed please contact the hotel
          directly
        </p>
      </div>
      <div class="hotelDetails">
        <div class="hotelImage">
          <img
            src="${bookingDetails.hotel_Image_Url}"
            alt="hotel_main_image"
            style="width: 100%; height: 100%; object-fit: cover"
          />
        </div>
        <div class="hotelImfo">
          <p>
            <strong class="confirmationText">confirmation Id : </strong>
            ${bookingDetails.receipt_Id}
          </p>
          <p class="hotelName">${bookingDetails.hotel_Name}</p>
          <div class="hotelAddress">
            <p class="hotelAddress">${bookingDetails.hotel_Landmark}</p>

            <p class="hotelAddress">Email: ${bookingDetails.hotel_Email_Id}</p>
          </div>
          <a
            href="${bookingDetails.hotel_Map_Url}"
            class="hotelLinks hotelAddress"
            >View map</a
          >
        </div>
      </div>

      <div class="bookingDetails">
        <h3 class="heading">Booking Details</h3>
        <div class="bookingContainer">
          <div class="leftSide">
            <div class="parent">
              <p class="title">Guest Name</p>
              <p class="data" style="text-transform: uppercase">
                ${bookingDetails.user_Name}
              </p>
            </div>
            <div class="parent">
              <p class="title">Guest Email</p>
              <p class="data">${bookingDetails.user_Email_Id}</p>
            </div>
            <div class="parent">
              <p class="title">Guest Phone</p>
              <p class="data">${bookingDetails.user_Phone_Number}</p>
            </div>
            <div class="parent">
              <p class="title">Total Guests</p>
              <p class="data">
                ${bookingDetails.total_Guests_Count} ${
                  bookingDetails.total_Children_Count === 0
                    ? ""
                    : `,
                ${bookingDetails.total_Children_Count} ${
                  bookingDetails.total_Children_Count === 1
                    ? "Child"
                    : "Children"
                }`
                }
              </p>
            </div>
            <div class="parent">
              <p class="title">Total Rooms</p>
              <p class="data">
                ${bookingDetails.total_Rooms_Count} ${
                  getNumberOfNights() === 1
                    ? `( ${getNumberOfNights()} Night)`
                    : `( ${getNumberOfNights()}
                Nights)`
                }
              </p>
            </div>
            <div class="parent">
              <p class="title">Payment Mode</p>
              <p class="data">${paymentMode}</p>
            </div>
            <div class="parent">
              <p class="title">Price Left to Pay</p>
              <p class="data">
                <strong>
                  ₹ ${
                    bookingDetails.total_Price +
                    bookingDetails.hotel_Handling_Charges -
                    bookingDetails.amount_Paid
                  }
                </strong>
              </p>
            </div>
          </div>
          <div class="rightSide">
            <div class="parent">
              <p class="title">Total room Price:</p>
              <p class="data">₹ ${bookingDetails.total_Room_Cost}</p>
            </div>
            <div class="parent">
              <p class="title">Check In</p>
              <p class="data">
                ${format(new Date(bookingDetails.checkin_Time), "dd/MM/yyyy")}
              </p>
            </div>
            <div class="parent">
              <p class="title">Check out</p>
              <p class="data">
                ${format(new Date(bookingDetails.checkout_Time), "dd/MM/yyyy")}
              </p>
            </div>
            <div class="parent">
              <p class="title">Taxes and fees:</p>
              <p class="data">
                ₹ ${
                  bookingDetails.total_Tax +
                  bookingDetails.hotel_Handling_Charges
                }
              </p>
            </div>
            <div class="parent">
              <p class="title">Total Price (Including taxes):</p>
              <p class="data">
                ₹ ${
                  bookingDetails.total_Price +
                  bookingDetails.hotel_Handling_Charges
                }
              </p>
            </div>
            <div class="parent">
              <p class="title">Total Price Paid:</p>
              <p class="data">₹ ${bookingDetails.amount_Paid}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- navbar -->
    <nav class="navbar">
      <img
        src="https://staybook.in/_next/image?url=%2Fbrand_logo.svg&w=48&q=75"
        alt="logo"
        class="navLogo"
      /><img />
      <p>Thank You Staying with us</p>
    </nav>

    <!-- privacy policy -->
    <div class="container">
      <div class="privacyPolicy">
        <h1 class="heading">booking Policies</h1>
        <ol>
          <li>
            Please Note: You can check in using any government-issued ID (except
            PAN card) and address proof of any local or outstation address. Do
            carry your original ID (Photocopy not accepted) for
            cross-verification. Couples are welcome.
          </li>
          <li>
            Early check-in or late check-out is subject to availability and may
            be chargeable by the hotel directly.
          </li>
          <li>
            If cancelled before 7 days: 85% refund, Between 7 days-72 hrs: 50%
            refund, Less than 72hrs, No-Shows or Early Checkout : No refund.
          </li>
          <li>
            It is mandatory for guests to present valid photo identification
            upon check in.
          </li>
          <li>
            We reserve the right to cancel or modify reservations where it
            appears that a customer has engaged in fraudulent or inappropriate
            activity or under other circumstances where it appears that the
            reservations contain or resulted from a mistake or error.
          </li>
          <li>
            To make modifications or cancellations please Reply to this email.
          </li>
          <li>
            Refund shall be initiated within 48 hours of receiving the request
            and the payment would be credited within 5-7 working days via the
            same mode as used while making the booking.
          </li>
        </ol>
      </div>
      <p style="padding-top: 20px">
        For more assistance, please visit the Staybook help center
        <a href="https://staybook.in/contactUs">click here</a>
      </p>
    </div>
  </body>
</html>`;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdf = await page.pdf({ format: "letter", printBackground: true });
    await browser.close();

    const currentTime = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    // Firebase Storage upload
    const storageRef = ref(
      storage,
      `booking_pdfs/${bookingDetails.user_First_Name}-${bookingDetails.user_Last_Name}-${currentTime}.pdf`,
    );
    const firebaseRes = await uploadBytes(storageRef, pdf, {
      contentType: "application/pdf",
    });
    const pdfUrl = await getDownloadURL(storageRef);

    res.status(200).json({ message: "success", pdfUrl });
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: error });
  }
}
