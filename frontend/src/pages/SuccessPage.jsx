// const Success = () => (
//   <div className="p-10 text-center">
//     <h1 className="text-2xl font-bold text-green-600">✅ Payment Successful!</h1>
//     <p>Tickets booked. A confirmation has been sent to your email.</p>
//   </div>
// );

// export default Success;

import { ArrowLeft } from "lucide-react"; // Make sure you have lucide-react installed

const Success = () => (
  <div className="p-10 text-center space-y-6">
    <h1 className="text-2xl font-bold text-green-600">✅ Payment Successful!</h1>
    <p className="text-gray-700">Tickets booked. A confirmation has been sent to your email.</p>
    
    <a
      href="/"
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Home
    </a>
  </div>
);

export default Success;
