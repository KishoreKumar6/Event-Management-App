import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { stripePromise } from "../components/stripe";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handlePay = async () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      const stripe = await stripePromise;

      const response = await axios.post(
        "https://event-management-app-2-21xj.onrender.com/api/create-checkout-session",
        {
          eventId: state.eventId,
          ticketType: state.ticketType,
          ticketCount: state.ticketCount,
          totalAmount: state.totalAmount,
          email: user.email,
          userId: user._id,
        }
      );

      await stripe.redirectToCheckout({ sessionId: response.data.id });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Confirm Your Payment
        </h2>

        <div className="bg-gray-100 p-6 rounded-xl shadow-inner mb-8 text-left space-y-4">
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Ticket Type:</span>{" "}
            {state.ticketType}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Ticket Count:</span>{" "}
            {state.ticketCount}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Total Amount:</span> ₹
            {state.totalAmount}
          </p>
        </div>

        <button
          onClick={handlePay}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 rounded-lg shadow-md transition duration-300"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
