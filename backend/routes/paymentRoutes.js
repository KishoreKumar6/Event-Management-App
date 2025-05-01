import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(
  "sk_test_51RGmT0Rsq3sRR7mnn3CN9FCaGd3UEZVoShipKgb4RpxLJnraKQskbCMPutvou9hhp43l9iBrjRt6R4n9Hy0GN2ao00iWK5ejI4"
); // replace with your real secret key

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
