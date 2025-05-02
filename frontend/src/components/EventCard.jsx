const EventCard = ({ image, title, description, location, date }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4 flex">
      <img
        src={`https://event-management-app-3-vs67.onrender.com${event.image}`}
        alt={title}
        className="w-64 h-40 object-cover"
      />
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="text-sm text-gray-500">
          <p>📍 {location}</p>
          <p>📅 {date}</p>
        </div>
      </div>
      <div className="p-4 flex items-center">
        <button className="bg-black text-white px-4 py-2 rounded">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
