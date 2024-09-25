import { mailTransporter, senderEmail } from "./utils/nodemailerService";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const data = req.body;
    const userToken = req.cookies["user-access-token"];

    const response = await mailTransporter.sendMail({
      from: senderEmail,
      to: ["mk.mohit2440@gmail.com", "staybookhost@gmail.com", "rahulsinghrs174326@gmail.com"],
      subject: `CLIENT IS FACING ERROR!!! ${new Date()}`,
      text: `CLIENT IS FACING ERROR!!! ${new Date()}`, // it'll only visible when the client cannot render the HTML
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
                        <p><strong>CLIENT HAS LANDED TO 404 PAGE</strong></p>
                        <p><strong>pageUrl:</strong> ${data.url}</p>
                        <p><strong>pagePath:</strong> ${data.path}</p>
                        <p><strong>pageOrigin:</strong> ${data.origin}</p>
                        <p><strong>pageOrgin:</strong> ${data.host}</p>
                        <p><strong>userAgent:</strong> ${data.userAgent}</p>
                        <p><strong>userAccessToken:</strong> ${userToken}</p>
                    </td>
                </tr>
            </table>
            </center>
        </body>
        </html>

        `,
    });

    if (response.messageId) {
      return res.status(200).json({ message: "email sent successfully!!" });
    }

    return res.status(400).json({ message: "Error in sending email" });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
