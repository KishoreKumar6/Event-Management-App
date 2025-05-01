import express from "express";
import nodemailer from "nodemailer";
import Booking from "../models/Booking.js"; // ✅ import your Booking model

const router = express.Router();

router.post("/send-confirmation", async (req, res) => {
  const { ticketType, ticketCount, totalAmount, email, eventId, userId } =
    req.body;

    const ticketTypeMap = {
      vip: "VIP",
      general: "General Admission",
    };

    const incomingType = ticketType.toLowerCase();
    const formattedTicketType = ticketTypeMap[incomingType];

    if (!formattedTicketType) {
      return res.status(400).json({ message: "Invalid ticket type" });
    }
    
  try {
    // 1. Send the email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "kishorekumar20101999@gmail.com",
        pass: "whdm crbc wstm brng",
      },
    });

    await transporter.sendMail({
      from: "kishorekumar20101999@gmail.com",
      to: email,
      subject: "Booking Confirmation",
      html: `<h1>Booking Confirmed!</h1>
             <p>Ticket Type: ${ticketType}</p>
             <p>Ticket Count: ${ticketCount}</p>
             <p>Total Amount: ₹${totalAmount}</p>`,
    });

    // 2. Save booking into MongoDB
    const booking = new Booking({
      user: userId,
      event: eventId,
      ticketType: formattedTicketType,
      numberOfTickets: ticketCount, // 🛠️ correct field
      totalPrice: totalAmount, // 🛠️ correct field
    });

    await booking.save(); // ✅ Save booking

    // 3. Send success response
    res.status(200).json({ message: "Mail sent and booking saved!" });
  } catch (error) {
    console.error("Error sending mail or saving booking:", error);
    res.status(500).json({ message: "Failed to complete booking" });
  }
});

export default router;
