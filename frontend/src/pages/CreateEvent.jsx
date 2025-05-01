// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CreateEvent = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     image: '',
//     date: '',
//     location: '',
//     description: '',
//     price: '',
//     ticketsAvailable: '',
//   });

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // ✅ Step 1: Validate DD/MM/YYYY format
//     const isValidDate = (dateStr) => {
//       return /^\d{2}\/\d{2}\/\d{4}$/.test(dateStr);
//     };
  
//     if (!isValidDate(form.date)) {
//       alert('Please enter the date in DD/MM/YYYY format');
//       return; // Stop submission if invalid
//     }
  
//     // ✅ Step 2: Convert to YYYY-MM-DD
//     const convertDateFormat = (dateStr) => {
//       const [day, month, year] = dateStr.split('/');
//       return `${year}-${month}-${day}`;
//     };
  
//     const formattedForm = {
//       ...form,
//       date: convertDateFormat(form.date),
//     };
  
//     // ✅ Step 3: Submit to backend
//     try {
//       await axios.post('http://localhost:5000/api/events/create', formattedForm);
//       navigate('/admin/events');
//     } catch (error) {
//       console.error('Error creating event:', error.response?.data || error.message);
//     }
//   };
  
//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Create Event</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {[
//           { label: 'Event Name', name: 'name' },
//           { label: 'Image URL', name: 'image' },
//           { label: 'Date (yyyy-mm-dd)', name: 'date' },
//           { label: 'Location', name: 'location' },
//           { label: 'Description', name: 'description' },
//           { label: 'Price', name: 'price', type: 'number' },
//           { label: 'Tickets', name: 'ticketsAvailable', type: 'number' },
//         ].map((field) => (
//           <input
//             key={field.name}
//             type={field.type || 'text'}
//             name={field.name}
//             placeholder={field.label}
//             value={form[field.name]}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         ))}
//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//           Create Event
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEvent;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CreateEvent = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     image: null, // Change to null because now image is a file
//     date: '',
//     location: '',
//     description: '',
//     price: '',
//     ticketsAvailable: '',
//   });

//   const handleChange = (e) => {
//     if (e.target.name === 'image') {
//       setForm((prev) => ({ ...prev, image: e.target.files[0] })); // handle file upload
//     } else {
//       setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Step 1: Validate DD/MM/YYYY format
//     const isValidDate = (dateStr) => {
//       return /^\d{2}\/\d{2}\/\d{4}$/.test(dateStr);
//     };

//     if (!isValidDate(form.date)) {
//       alert('Please enter the date in DD/MM/YYYY format');
//       return;
//     }

//     // ✅ Step 2: Convert to YYYY-MM-DD
//     const convertDateFormat = (dateStr) => {
//       const [day, month, year] = dateStr.split('/');
//       return `${year}-${month}-${day}`;
//     };

//     // ✅ Step 3: Submit using FormData
//     try {
//       const formData = new FormData();
//       formData.append('name', form.name);
//       formData.append('image', form.image); // append file
//       formData.append('date', convertDateFormat(form.date));
//       formData.append('location', form.location);
//       formData.append('description', form.description);
//       formData.append('price', form.price);
//       formData.append('ticketsAvailable', form.ticketsAvailable);

//       await axios.post('http://localhost:5000/api/events/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       navigate('/admin/events');
//     } catch (error) {
//       console.error('Error creating event:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Create Event</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {[
//           { label: 'Event Name', name: 'name' },
//           { label: 'Image', name: 'image', type: 'file' }, // change Image URL to file input
//           { label: 'Date (dd/mm/yyyy)', name: 'date' },
//           { label: 'Location', name: 'location' },
//           { label: 'Description', name: 'description' },
//           { label: 'Price', name: 'price', type: 'number' },
//           { label: 'Tickets', name: 'ticketsAvailable', type: 'number' },
//         ].map((field) => (
//           <input
//             key={field.name}
//             type={field.type || 'text'}
//             name={field.name}
//             placeholder={field.label}
//             value={field.type === 'file' ? undefined : form[field.name]} // no value binding for file input
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//             {...(field.type === 'file' ? { accept: 'image/*' } : {})} // allow only images
//           />
//         ))}
//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//           Create Event
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEvent;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from "../components/AdminLayout";


const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    image: '', // we will store the file here
    date: '',
    location: '',
    description: '',
    price: '',
    ticketsAvailable: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // If the field is image, save the file object
      setForm((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Step 1: Validate DD/MM/YYYY format
    const isValidDate = (dateStr) => {
      return /^\d{2}\/\d{2}\/\d{4}$/.test(dateStr);
    };

    if (!isValidDate(form.date)) {
      alert('Please enter the date in DD/MM/YYYY format');
      return; // Stop submission if invalid
    }

    // ✅ Step 2: Convert to YYYY-MM-DD
    const convertDateFormat = (dateStr) => {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
    };

    // ✅ Step 3: Prepare FormData
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('image', form.image); // file
    formData.append('date', convertDateFormat(form.date));
    formData.append('location', form.location);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('ticketsAvailable', form.ticketsAvailable);

    try {
      await axios.post('http://localhost:5000/api/events/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin/events');
    } catch (error) {
      console.error('Error creating event:', error.response?.data || error.message);
    }
  };

  return (
    <AdminLayout>
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Event Name', name: 'name' },
          { label: 'Date (DD/MM/YYYY)', name: 'date' },
          { label: 'Location', name: 'location' },
          { label: 'Description', name: 'description' },
          { label: 'Price', name: 'price', type: 'number' },
          { label: 'Tickets', name: 'ticketsAvailable', type: 'number' },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || 'text'}
            name={field.name}
            placeholder={field.label}
            value={form[field.name]}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        ))}

        {/* ✅ Special file input for Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Create Event
        </button>
      </form>
    </div>
    </AdminLayout>
  );
};

export default CreateEvent;
