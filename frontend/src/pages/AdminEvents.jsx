// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const AdminEvents = () => {
//   const [events, setEvents] = useState([]);

//   const fetchEvents = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/events');
//       setEvents(res.data);
//     } catch (error) {
//       console.error('Failed to fetch events:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     // Ask the user for confirmation before deletion
//     const confirmed = window.confirm("Are you sure you want to delete this event?");
//     if (!confirmed) return;
  
//     try {
//       await axios.delete(`http://localhost:5000/api/events/${id}`);
//       alert("Event deleted successfully.");
//       fetchEvents();
//     } catch (error) {
//       console.error('Delete failed:', error);
//       alert("Failed to delete event: " + (error.response?.data || error.message));
//     }
//   };
  
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">All Events</h1>
//         <Link
//           to="/admin/dashboard"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Home
//         </Link>
//         <Link
//           to="/admin/events/create"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + Create Event
//         </Link>
//       </div>

//       {events.length === 0 ? (
//         <p>No events found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {events.map((event) => (
//             <div key={event._id} className="bg-white shadow p-4 rounded">
//               <img
//                 src={`http://localhost:5000${event.image}`}
//                 alt={event.name}
//                 className="h-40 w-full object-cover rounded mb-2"
//               />
//               <h2 className="text-lg font-semibold">{event.name}</h2>
//               <p>{event.location} | {new Date(event.date).toLocaleDateString("en-GB")}</p>
//               <div className="flex gap-2 mt-2">
//                 <button
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                   onClick={() => handleDelete(event._id)}
//                 >
//                   Delete
//                 </button>
//                 <Link
//                   to={`/admin/events/edit/${event._id}`}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded"
//                 >
//                   Edit
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminEvents;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import AdminLayout from "../components/AdminLayout";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      alert("Event deleted successfully.");
      fetchEvents();
    } catch (error) {
      console.error('Delete failed:', error);
      alert("Failed to delete event: " + (error.response?.data || error.message));
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    setEditingEvent({ ...editingEvent, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, editingEvent);
      setIsOpen(false);
      fetchEvents();
    } catch (error) {
      console.error('Failed to update event', error);
      alert("Failed to update event.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <AdminLayout>
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Events</h1>
        <div className="flex gap-2">
          <Link
            to="/admin/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Home
          </Link>
          <Link
            to="/admin/events/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Event
          </Link>
        </div>
      </div>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event._id} className="bg-white shadow p-4 rounded">
              <img
                src={`http://localhost:5000${event.image}`}
                alt={event.name}
                className="h-40 w-full object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p>{event.location} | {new Date(event.date).toLocaleDateString("en-GB")}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEditClick(event)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isOpen && editingEvent && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className=" p-6 rounded shadow-lg max-w-md w-full
            bg-blue-600 text-amber-50">
              <Dialog.Title className="text-xl font-bold mb-4">
                Edit Event
              </Dialog.Title>

              <input
                name="name"
                value={editingEvent.name}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full rounded"
                placeholder="Event Name"
              />
              <input
                name="location"
                value={editingEvent.location}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full rounded"
                placeholder="Location"
              />
              <input
                name="date"
                value={editingEvent.date}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full rounded"
                placeholder="Date"
              />
              <textarea
                name="description"
                value={editingEvent.description}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full rounded"
                placeholder="Description"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white px-4 py-2 rounded bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-700 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
    </AdminLayout>
  );
};

export default AdminEvents;
