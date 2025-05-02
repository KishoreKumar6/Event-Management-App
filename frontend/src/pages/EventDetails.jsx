import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "../Images/cool-website-background-13.jpg";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [selectedCount, setSelectedCount] = useState(1);
  const [selectedType, setSelectedType] = useState("general");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    axios
      .get(`https://event-management-app-2-21xj.onrender.com/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
        setTotalAmount(res.data.price);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (event) {
      const basePrice =
        selectedType === "general"
          ? event.price
          : event.vipPrice || event.price * 1.5;
      setTotalAmount(basePrice * selectedCount);
    }
  }, [selectedCount, selectedType, event]);

  const handleBookNow = () => {
    navigate("/payment", {
      state: {
        eventId: event._id,
        ticketType: selectedType,
        ticketCount: selectedCount,
        totalAmount,
      },
    });
  };

  if (!event)
    return <div className="text-center py-20 text-xl">Loading...</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="p-6 max-w-5xl mx-auto bg-black">
        <div className="rounded-xl overflow-hidden shadow-lg bg-white">
          <img
            src={`https://event-management-app-2-21xj.onrender.com${event.image}`}
            alt={event.name}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-6">
            <h2 className="text-4xl font-extrabold mb-2 text-gray-800">
              {event.name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>📅 {new Date(event.date).toLocaleDateString("en-GB")}</span>
              <span>📍 {event.location}</span>
            </div>

            <p className="text-gray-700 text-lg mb-4">{event.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-gray-600 mb-6">
              <p>
                💸 <strong>General Price:</strong> ₹{event.price}
              </p>
              <p>
                💎 <strong>VIP Price:</strong> ₹
                {event.vipPrice || event.price * 1.5}
              </p>
              <p>
                🎫 <strong>Tickets Left:</strong>{" "}
                {event.ticketsAvailable - selectedCount}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  🎟️ Ticket Type
                </label>
                <select
                  className="border border-gray-300 p-2 rounded w-full"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="general">General Admission</option>
                  <option value="vip">VIP</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  🔢 Ticket Count
                </label>
                <select
                  className="border border-gray-300 p-2 rounded w-full"
                  value={selectedCount}
                  onChange={(e) => setSelectedCount(parseInt(e.target.value))}
                >
                  {[...Array(event.ticketsAvailable).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-100 mt-8 p-6 rounded-lg flex flex-col sm:flex-row justify-between items-center">
              <div className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">
                Total: ₹{totalAmount}
              </div>
              <button
                onClick={handleBookNow}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
