// src/stripe.js
import { loadStripe } from "@stripe/stripe-js";

console.log("Stripe Public Key:", process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Debug

export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY
);
