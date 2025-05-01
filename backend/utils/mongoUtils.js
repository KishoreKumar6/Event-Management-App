import Payment from "../models/PaymentModel.js"; // use your model name

export const savePaymentToDB = async ({ email, amount, eventId, userId, paymentStatus }) => {
  try {
    const payment = new Payment({
      email,
      amount,
      eventId,
      userId,
      status: paymentStatus,
    });

    await payment.save();
    console.log("💾 Payment data saved!");
  } catch (err) {
    console.error("MongoDB Save Error:", err);
  }
};
