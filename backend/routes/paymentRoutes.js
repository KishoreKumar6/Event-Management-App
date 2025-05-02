import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { ticketType, ticketCount, totalAmount, email, eventId, userId } =
    req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Ticket: ${ticketType.toUpperCase()} - Event ID: ${eventId}`,
            },
            unit_amount: (totalAmount / ticketCount) * 100,
          },
          quantity: ticketCount,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/payment",
      metadata: {
        userId,
        eventId,
        ticketType,
        ticketCount: ticketCount.toString(),
        totalAmount: totalAmount.toString(),
        email,
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});

export default router;
