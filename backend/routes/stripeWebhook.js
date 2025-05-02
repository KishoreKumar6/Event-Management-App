import express from "express";
import Stripe from "stripe";
import { savePaymentToDB } from "../utils/mongoUtils.js";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const router = express.Router();

// ⚠️ Use express.raw here (NO bodyParser import needed)
router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  console.log("🔥 Webhook route hit");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("📩 Stripe Event Type:", event.type);
  console.log("📦 Full Event Payload:", JSON.stringify(event, null, 2));

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { customer_email, amount_total, metadata } = session;
    const { eventId, userId, ticketType, ticketCount, totalAmount } = metadata;

    try {
      await savePaymentToDB({
        email: customer_email,
        amount: amount_total / 100,
        eventId,
        userId,
        paymentStatus: "success",
      });
      console.log("✅ Payment saved to MongoDB");
    } catch (dbErr) {
      console.error("❌ Failed to save payment to DB:", dbErr);
    }

    try {
      const booking = new Booking({
        user: userId,
        event: eventId,
        ticketType,
        numberOfTickets: parseInt(ticketCount),
        totalPrice: parseFloat(totalAmount),
      });
      await booking.save();
      console.log("✅ Booking saved to MongoDB");
    } catch (bookingErr) {
      console.error("❌ Failed to save booking:", bookingErr);
    }

    try {
      const eventDetails = await Event.findById(eventId);
      if (!eventDetails) throw new Error("Event not found");

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customer_email,
        subject: "Booking Confirmation",
        html: `
          <h2>🎉 Thank you for your booking!</h2>
          <p><strong>Event:</strong> ${eventDetails.name}</p>
          <p><strong>Location:</strong> ${eventDetails.location}</p>
          <p><strong>Date:</strong> ${new Date(eventDetails.date).toLocaleDateString()}</p>
          <hr />
          <p><strong>Ticket Type:</strong> ${ticketType}</p>
          <p><strong>Ticket Count:</strong> ${ticketCount}</p>
          <p><strong>Total Paid:</strong> ₹${totalAmount}</p>
        `,
      });

      console.log("📧 Confirmation email sent");
    } catch (emailErr) {
      console.error("❌ Failed to send email:", emailErr);
    }
  }

  res.status(200).send("Webhook received");
});

export default router;
