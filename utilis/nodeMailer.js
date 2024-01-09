const nodemailer = require("nodemailer");

const sendForgetPasswordEmail = async (recipientEmail, html) => {
  try {
    // Create a nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
     
      auth: {
        user: "syedaliuzzaman@gmail.com", // Your Gmail email address
        pass: "xkwvshptvnxpmfvc", // Your Gmail password or an app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: "syed.zaman@octalyte.com", // Sender address
      to: recipientEmail, // Recipient address
      subject: "Password Reset", // Subject line
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
