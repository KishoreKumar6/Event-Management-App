import { Link } from "react-router-dom";

const EventList = () => {
  const events = []; // fetch events from backend

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link
          to="/admin/events/create"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event._id} className="p-4 border shadow rounded-lg">
              <img
                src={`http://localhost:5000${event.image}`}
                alt={event.name}
                className="h-40 w-full object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p>{event.location}</p>
              <p> {new Date(event.date).toLocaleDateString("en-GB")}</p>
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
