import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === 'admin' ? '/api/admin/register' : '/api/users/register';
      
       await axios.post(`http://localhost:5000${endpoint}`, {
        name,
        email,
        password,
      });

      toast.success('Registration successful! Redirecting to dashboard...', { autoClose: 3000 });
      setTimeout(() => navigate('/login'), 3000); // delay navigation to let user see toast
    } catch (error) {
      console.error("Registration Error:", error);
      const message =
        error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message, { autoClose: 4000 });
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?conference,event')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register as {role}</h2>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              role === 'user'
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              role === 'admin'
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
