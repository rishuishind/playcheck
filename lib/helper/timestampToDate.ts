export const timestampToDate = (timestamp: string): Date => {
  const jsonFormatDate = JSON.parse(timestamp);
  const milliseconds: number =
    jsonFormatDate.seconds * 1000 +
    Math.floor(jsonFormatDate.nanoseconds / 1000000);
  const date = new Date(milliseconds);
  return date;
};

export function convertToIST(date) {
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  // Add 5 hours and 30 minutes to convert UTC to IST
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(utcDate.getTime() + istOffset);

  return istDate;
}

export function convertFromAnyTimeZoneToIST(): Date {
  const current_Time = new Date();

  // Convert the local time to UTC
  const utc_Time = new Date(
    current_Time.getTime() + current_Time.getTimezoneOffset() * 60000,
  );

  // Convert UTC to IST by adding 5 hours and 30 minutes (19800000 milliseconds)
  const ist_Offset = 5.5 * 60 * 60000;
  const booking_TimeIST = new Date(utc_Time.getTime() + ist_Offset);
  return booking_TimeIST;
}
export function getCurrentDateInIndia(): Date {
  const now = new Date();

  // Convert the current UTC time to the IST time zone offset
  const indiaTime = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  // Create a new Date object with the IST time
  const indiaDate = new Date(indiaTime);

  return indiaDate;
}

export function formatDateToCustomString(dateString) {
  // Extract year, month, and day from the string
  const [year, month, day] = dateString.split("T")[0].split("-");

  // Define an array of month names to convert month number to short month name
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the date as 'Sep 15, 2024'
  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}

export function formatDateStringToCustomString(dateString: string) {
  const dateParts = dateString.split(" ");
  const dayOfWeek = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  const year = dateParts[3];
  const formattedDate = `${month} ${day}, ${year} (${dayOfWeek})`;
  return formattedDate;
}

export function convertTimestampToDate(timestamp) {
  // Split the timestamp to get the date part
  const datePart = timestamp.split("T")[0]; // "2024-12-15"

  // Split the date into year, month, and day
  const [year, month, day] = datePart.split("-");

  // Return the formatted date as "DD-MM-YYYY"
  return `${day}-${month}-${year}`;
}
