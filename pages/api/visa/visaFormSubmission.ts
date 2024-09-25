import { db } from "@/lib/firebase";
import { format } from "date-fns";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { mailTransporter, senderEmail } from "../utils/nodemailerService";

async function handler(req: any, res: any) {
  const names = req.body.name.split(" ");
  const fullName = req.body.name;
  const firstName = names[0];
  const middleName = names[1] || "";
  const lastName = names[2] || "";
  const docRef = doc(db, "VISA-USER-REQUEST-INFORMATION", req.body.userEmail); // Document reference for user data
  const subcollectionRef: any = collection(
    db,
    "VISA-USER-REQUEST-INFORMATION",
    req.body.userEmail,
    "VISA-REQUEST-INFORMATION",
  ); // Document reference for subcollection data

  function formatDate() {
    const date = new Date(); // Get current date and time

    // Format the date
    const formattedDate = format(date, "MMMM d, yyyy 'at' h:mm:ssa");

    // Get UTC offset manually
    const timezoneOffset = date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
    const offsetMinutes = Math.abs(timezoneOffset) % 60;
    const offsetSign = timezoneOffset > 0 ? "-" : "+";

    // Format the offset
    const offsetString = `${offsetSign}${("0" + offsetHours).slice(-2)}:${("0" + offsetMinutes).slice(-2)}`;

    // Combine with your specific UTC offset
    const formattedDateTime = `${formattedDate} UTC${offsetString}`;

    return formattedDateTime;
  }

  const userData = {
    visa_User_First_Name: req.body.name,
    visa_User_Last_Name: req.body.name,
    visa_User_Contact_Number: req.body.contactNumber,
    visa_User_Email_Id: req.body.userEmail,
  };

  const requestInfoData = {
    visa_Duration_Days: req.body.visaType,
    visa_Request_Status: true,
    visa_User_Contact_Number: req.body.contactNumber,
    visa_User_Email_Id: req.body.userEmail,
    visa_User_First_Name: firstName,
    visa_User_Last_Name: middleName,
    visa_User_Middle_Name: lastName,
    visa_User_Nationality: req.body.country,
    visa_User_Passport_Number: req.body.passportNo,
    visa_User_Query: "",
    visa_User_Visiting_Date: req.body.dateOfVisit,
    visa_Request_Creation_Time: formatDate(),
  };

  const sendEmail = async () => {
    try {
      const response = await mailTransporter.sendMail({
        from: senderEmail,
        to: senderEmail,
        subject: `Visa Query from Staybook - ${req.body.name}`,
        text: ``,
        html: `<!DOCTYPE html>
                <html>
                <head>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      line-height: 1.6;
                      color: #333;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      border: 1px solid #ddd;
                      border-radius: 5px;
                    }
                    .header {
                      text-align: center;
                      margin-bottom: 20px;
                    }
                    .header h2 {
                      margin: 0;
                    }
                    .content {
                      margin-bottom: 20px;
                    }
                    .content p {
                      margin: 5px 0;
                    }
                    .footer {
                      text-align: center;
                      font-size: 12px;
                      color: #aaa;
                    }
                  </style>
                </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>You have a new Visa Request</h2>
                </div>
                <div class="content">
                  <p><strong>Name:</strong> ${fullName}</p>
                  <p><strong>Email:</strong> ${requestInfoData.visa_User_Email_Id}</p>
                  <p><strong>Contact Number:</strong> ${requestInfoData.visa_User_Contact_Number}</p>
                  <p><strong>Nationality:</strong> ${requestInfoData.visa_User_Nationality}</p>
                  <p><strong>Passport Number:</strong> ${requestInfoData.visa_User_Passport_Number}</p>
                  <p><strong>Duration of Stay:</strong> ${requestInfoData.visa_Duration_Days}</p>
                  <p><strong>Visiting Date:</strong> ${requestInfoData.visa_User_Visiting_Date}</p>
                </div>
              </div>
            </body>
        </html>`,
      });
    } catch (error) {
      console.log("userBookingConfirmationalMail: ", error);
      return {
        status: false,
        responseMessage: "Something went wrong. Unable to send mail",
      };
    }
  };

  const sendUserConfirmationEmail = async () => {
    try {
      const response = await mailTransporter.sendMail({
        from: senderEmail,
        to: requestInfoData.visa_User_Email_Id,
        subject: `Staybook Visa Request - ${req.body.name}`,
        text: `We have received your Evisa Request.Our team will get back to you.`,
        html: `<!DOCTYPE html>
                <html>
                <head>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      line-height: 1.6;
                      color: #333;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      border: 1px solid #ddd;
                      border-radius: 5px;
                    }
                    .header {
                      text-align: center;
                      margin-bottom: 20px;
                    }
                    .header h2 {
                      margin: 0;
                    }
                    .content {
                      margin-bottom: 20px;
                    }
                    .content p {
                      margin: 5px 0;
                    }
                    .footer {
                      text-align: center;
                      font-size: 12px;
                      color: #aaa;
                    }
                  </style>
                </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Visa Request Details</h2>
                </div>
                <div class="content">
                  <p><strong>Name:</strong> ${fullName}</p>
                  <p><strong>Email:</strong> ${requestInfoData.visa_User_Email_Id}</p>
                  <p><strong>Contact Number:</strong> ${requestInfoData.visa_User_Contact_Number}</p>
                  <p><strong>Nationality:</strong> ${requestInfoData.visa_User_Nationality}</p>
                  <p><strong>Passport Number:</strong> ${requestInfoData.visa_User_Passport_Number}</p>
                  <p><strong>Duration of Stay:</strong> ${requestInfoData.visa_Duration_Days}</p>
                  <p><strong>Visiting Date:</strong> ${requestInfoData.visa_User_Visiting_Date}</p>
                </div>
                 <div class="footer">
                  <p>Thank you for your request. We will get back to you soon.</p>
                </div>
              </div>
            </body>
        </html>`,
      });
    } catch (error) {
      console.log("userBookingConfirmationalMail: ", error);
      return {
        status: false,
        responseMessage: "Something went wrong. Unable to send mail",
      };
    }
  };

  try {
    // Check if user document exists
    const userDoc = await getDoc(docRef);
    if (userDoc.exists()) {
      // User document exists, update subcollection
      const newDocRef: any = await addDoc(subcollectionRef, requestInfoData);
      await updateDoc(newDocRef, { visa_Request_Id: newDocRef.id });
    } else {
      // User document doesn't exist, create new documents
      await setDoc(docRef, userData);
      const newDocRef: any = await addDoc(subcollectionRef, requestInfoData);
      await updateDoc(newDocRef, { visa_Request_Id: newDocRef.id });
    }
    sendEmail();
    sendUserConfirmationEmail();
    return res
      .status(200)
      .json({ status: "OK", message: "Document(s) added successfully" });
  } catch (error) {
    console.error("Error adding document(s):", error);
    return res
      .status(500)
      .json({ status: "Error", message: "Failed to add document(s)" });
  }
}

export default handler;
