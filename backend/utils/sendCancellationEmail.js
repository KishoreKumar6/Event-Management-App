import nodemailer from "nodemailer";

export async function sendCancellationEmail(toEmail, eventName) {
  console.log("📩 sendCancellationEmail triggered");
  console.log("✅ Loaded email user:", process.env.EMAIL_USER);
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Booking Cancellation",
    text: `Your booking for "${eventName}" has been successfully cancelled.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Cancellation email sent to ${toEmail}:`, info.response);
  } catch (error) {
    console.error("❌ Error sending cancellation email:", error);
  }
}
