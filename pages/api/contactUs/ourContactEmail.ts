import {mailTransporter, senderEmail} from '../utils/nodemailerService';

const handler = async (req: any, res: any) => {
  const mailData = req.body;
  try {
    const response = await mailTransporter.sendMail({
      from: senderEmail,
      to: senderEmail,
      subject: "Query from a Client",
      text: "Client has requested for support",
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>HTML Email Template</title>
        </head>
        <body
          style="
          margin: 0;
          padding: 0;
          font-family: sans-serif;
          background-color: #ffffff;
          "
        >
          <center
            style="
              margin: 0;
              padding: 0;
              width: 100%;
              table-layout: fixed;
              padding-bottom: 60px;
            "
          >
            <table
              width="100%"
              style="
              margin: 0 auto;
              padding: 16px;
              border-spacing: 0;
              width: 100%;
              max-width: 600px;
              color: #333;
              "
            >
              <tr>
                <td height="7" style="background-color: #005250"></td>
              </tr>

              <tr>
                <td style="padding: 18px 0; margin: 0">
                  <p>Dear Staybook,</p>
                  <p>you have a query from <span style="font-weight: bold">${mailData.userName}, ${mailData.mobileNumber}, ${mailData.email}</span></p>
                  <p>query reagarding hotel <span style="font-weight: bold">${mailData.hotelName}</span></p>
                  <p>client message <span style="font-weight: bold">${mailData.message}</span></p>
                </td>
              </tr>
            </table>
            </center>
        </body>
        </html>`,
    });

    res.status(200).json({
      name: "Nodemailer Success",
      Message: "Mail Sent Successfully",
    });
  } catch (error) {
    res.status(404).json({
      name: "Nodemailer error",
      Message: "Mail Not Sent",
    });
  }
};

export default handler;
