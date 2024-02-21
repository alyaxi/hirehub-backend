const nodemailer = require("nodemailer");

const sendForgetPasswordEmail = async (recipientEmail, html, subject) => {
  try {
    // Create a nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
     
      auth: {
        user: process.env.NOTIFICATION_EMAIL,
        pass: process.env.NOTIFICATION_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.NOTIFICATION_EMAIL, // Sender address
      to: recipientEmail, // Recipient address
      subject: subject, // Subject line
      text: html, // Plain text body
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);

    console.log("Email sent:", result);

    return true; // Email sent successfully
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Failed to send email
  }
};

module.exports = { sendForgetPasswordEmail };
