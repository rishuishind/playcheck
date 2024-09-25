export function pdfHtmlContent(data: any) {
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

  // get the nights difference
  function getNumberOfNights() {
    let checkIn = getDateObj(data.checkin_Time);
    let checkOut = getDateObj(data.checkout_Time);
    let differenceInMilliseconds = checkOut.getTime() - checkIn.getTime();
    let differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
    return differenceInDays;
  }

  function formatTimestamp(input) {
    let date = new Date();
    if (typeof input === "string") {
      date = new Date(input);
      date.setUTCHours(date.getUTCHours() + 5); // Adjust for IST
      date.setUTCMinutes(date.getUTCMinutes() + 30); // Adjust for IST
    } else {
      const milliseconds = input.seconds * 1000 + input.nanoseconds / 1e6;
      date = new Date(milliseconds);
      // Convert to IST
      date.setUTCHours(date.getUTCHours() + 5); // Adjust for IST
      date.setUTCMinutes(date.getUTCMinutes() + 30);
    }
    const options: any = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
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

  const paymentMode = getPaymentMode(data.total_Price, data.amount_Paid);

  function handlingCharges(totalPrice: number) {
    return Math.max(50, Math.ceil(0.03 * Number(totalPrice)));
  }

  let htmlContent = `
  <!DOCTYPE html>
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
      .hotelDetails {
        display: flex;
        padding: 1rem;
        margin-top: 1rem;
        flex-direction: column;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.5rem;
        border: 2px solid #bfbfbf;
      }

      .hotelImage {
        aspect-ratio: 16 / 9;
        position: relative;
        width: 100%;
        max-width: 32rem;
      }
      .hotelText {
        max-width: 32rem;
        text-align: center;
      }
      .hotelName {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        font-family: Georgia, Cambria, "Times New Roman", Times, serif;
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
        color: #005250;
      }
      .hotelAddress {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        font-weight: 500;
        letter-spacing: 0.025em;
      }
      .hotelLinks {
        padding-block: 0.25rem;
        font-weight: 500;
        letter-spacing: 0.025em;
        text-decoration: none;
        color: black;
      }

      .bookingDetails,
      .roomsDetails,
      .paymentSummary,
      .roomData {
        display: flex;
        margin-top: 1rem;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.5rem;
        border: 2px solid #bfbfbf;
      }
      .heading {
        padding: 1rem;
        border-bottom: 2px solid #bfbfbf;
        width: 100%;
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
        color: #005250;
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
        font-weight: 500;
        letter-spacing: 0.025em;
      }

      .text-left {
        text-align: right;
      }

      .priceBreakUp,
      .paySummaryContainer,
      .roomDataContainer {
        width: 100%;
        padding: 16px;
      }

      .roomsMap {
        display: flex;
        padding: 1rem;
        flex-direction: column;
        width: 100%;
      }
    </style>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #ffffff;
      padding: 24px;
    "
  >
    <div class="hotelDetails">
      <div class="hotelImage">
        <img src="${
          data.hotel_Image_Url
        }" alt="hotel_main_iamge" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div class="hotelText">
        <p class="hotelName">${data.hotel_Name}</p>
        <p class="hotelAddress">${data.hotel_Landmark}</p>
        <a href="tel:+918373929299" class="hotelLinks">
          <p>+91 8373929299</p>
        </a>
        <a href="mailto:staybookbooking@gmail.com" class="hotelLinks">
          <p>staybookbooking@gmail.com</p>
        </a>
      </div>
    </div>

    <div class="bookingDetails">
      <h3 class="heading">Booking Details</h3>
      <div class="bookingContainer">
        <div class="leftSide">
          <div class="parent">
            <p class="title">Guest Name</p>
            <p class="data" style="text-transform: uppercase">
              ${data.user_Name}
            </p>
          </div>
          <div class="parent">
            <p class="title">Guest Phone</p>
            <p class="data" style="text-transform: uppercase">
              ${data.user_Phone_Number}
            </p>
          </div>
          <div class="parent">
            <p class="title">Total Guests</p>
            <p class="data">${data.total_Guests_Count}</p>
          </div>
          <div class="parent">
            <p class="title">Total Childrens</p>
            <p class="data">${data.total_Children_Count}</p>
          </div>
          <div class="parent">
            <p class="title">Total Rooms</p>
            <p class="data">${data.total_Rooms_Count}</p>
          </div>
        </div>

        <div class="rightSide">
          <div class="parent">
            <p class="title">Payment Mode</p>
            <p class="data">${paymentMode}</p>
          </div>
          <div class="parent">
            <p class="title">No of Nights</p>
            <p class="data">${getNumberOfNights()}</p>
          </div>
          <div class="parent">
            <p class="title">Booking Time</p>
            <p class="data">
              ${formatTimestamp(data.booking_Time)}
            </p>
          </div>
          <div class="parent">
            <p class="title">Checkin Time</p>
            <p class="data">
              ${formatTimestamp(data.checkin_Time)}
            </p>
          </div>
          <div class="parent">
            <p class="title">Checkout Time</p>
            <p class="data">
              ${formatTimestamp(data.checkout_Time)}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="roomsDetails">
      <h3 class="heading">Room Details</h3>
      <div class="roomsMap">
       ${data.roomsList
         .map(
           (roomInfo: any, index: number) => `
        <div key="${index}" class="roomData">
          <h3 class="heading">
            ${roomInfo.room_Count} x ${roomInfo.room_Name}
          </h3>

          <div class="roomDataContainer">
            <div class="parent">
              <p class="title">Room Info</p>
              <p class="data" style="text-transform: uppercase">
                ${roomInfo.room_Info}
              </p>
            </div>
            <div class="parent">
              <p class="title">Room Plan Info</p>
              <p class="data">${roomInfo.plan_Info} (${roomInfo.plan_Name})</p>
            </div>
            <div class="parent">
              <p class="title">Room Guests Info</p>
              <p class="data">
                ${roomInfo.num_Guests} ${
             roomInfo.num_Guests > 1 ? "Guests" : "Guest"
           }${
             roomInfo.num_Children > 0
               ? ` & ${roomInfo.num_Children} ${
                   roomInfo.num_Children > 1 ? "Children" : "Child"
                 }`
               : ""
           }
              </p>
            </div>
          </div>

          <h3
            class="heading"
            style="text-align: center; border: 0; text-decoration: underline"
          >
            Room Price Breakup
          </h3>
          <div class="priceBreakUp">
            <div class="parent">
              <p class="title">Room Base Price :</p>
              <p class="data text-left">₹ ${roomInfo.total_Room_Plan_Price}</p>
            </div>
            <div class="parent">
              <p class="title">Taxes & fees :</p>
              <p class="data text-left">₹ ${
                roomInfo.total_Plan_Tax +
                handlingCharges(roomInfo.total_Plan_Price)
              }</p>
            </div>
            <div class="parent" style="padding-bottom: 8px">
              <p class="title">Room Total Price (Including taxes) :</p>
              <p class="data text-left">
                ₹ ${
                  roomInfo.total_Plan_Price +
                  handlingCharges(roomInfo.total_Plan_Price)
                }
              </p>
            </div>
            <div
              class="parent"
              style="padding-top: 8px; border-top: 2px solid #bfbfbf"
            >
              <p class="title">Grand Room Total :</p>
              <p class="data text-left">
                ₹ ${
                  roomInfo.total_Plan_Price +
                  handlingCharges(roomInfo.total_Plan_Price)
                }
              </p>
            </div>
          </div>
        </div>
        `
         )
         .join("")}
      </div>
    </div>

    <div class="paymentSummary">
      <h3 class="heading">Payment summary</h3>
      <div class="paySummaryContainer">
        <div class="parent">
          <p class="title">Total Room Price</p>
          <p class="data text-left">₹ ${data.total_Room_Cost}</p>
        </div>
        <div class="parent">
          <p class="title">taxes & fees</p>
          <p class="data text-left">
            ₹ ${data.total_Tax + data.hotel_Handling_Charges}
          </p>
        </div>
        <div class="parent" style="padding-bottom: 8px">
          <p class="title">Total Room Price (Including taxes)</p>
          <p class="data text-left">
            ₹ ${data.total_Price + data.hotel_Handling_Charges}
          </p>
        </div>
        ${
          paymentMode === "Prepaid Booking" || paymentMode === "Partial Payment"
            ? `
        <div class="parent" style="padding-top: 8px">
          <strong style="letter-spacing: 0.025em; color: #005250">
            Total Price Paid
          </strong>
          <strong class="text-left">₹ ${data.amount_Paid}</strong>
        </div>
        `
            : ""
        }
        
        <div
          class="parent"
          style="padding-top: 8px; border-top: 2px solid #bfbfbf"
        >
          <strong>Price Left to Pay</strong>
          <strong class="text-left">
            ₹ ${
              data.total_Price + data.hotel_Handling_Charges - data.amount_Paid
            }
          </strong>
        </div>
      </div>
    </div>
  </body>
  </html>`;

  return htmlContent;
}
