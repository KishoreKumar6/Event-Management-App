import axios from "axios";
import { useEffect, useState } from "react";

const EventList = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await axios.get(
      "https://event-management-app-3-vs67.onrender.com/api/events"
    );
    setEvents(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `https://event-management-app-3-vs67.onrender.com/api/events/${id}`
    );
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="grid gap-4">
      {events.map((event) => (
        <div key={event._id} className="border p-4 rounded shadow">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-40 object-cover mb-2"
          />
          <h2 className="text-xl font-bold">{event.name}</h2>
          <p>{event.location}</p>
          <p>{new Date(event.date).toDateString()}</p>
          <button
            onClick={() => handleDelete(event._id)}
            className="bg-red-600 text-white px-3 py-1 rounded mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
