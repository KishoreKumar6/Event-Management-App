import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user && auth.token) {
      if (auth.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (auth.user.role === "user") {
        navigate("/user/dashboard", { replace: true });
      }
    }
  }, [auth, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "admin" ? "/api/admin/login" : "/api/users/login";
      const { data } = await axios.post(
        `https://event-management-app-2-21xj.onrender.com${endpoint}`,
        {
          email,
          password,
        }
      );
      toast.success("Login successful! Redirecting...", { autoClose: 2500 });

      dispatch(
        setUser({
          user: {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
          },
          token: data.token,
        })
      );

      const userRole = data.role?.toLowerCase();
      setTimeout(() => {
        if (userRole === "admin") navigate("/admin/dashboard");
        else if (userRole === "user") navigate("/user/dashboard");
        else
          toast.warning("Login succeeded but role unknown.", {
            autoClose: 3000,
          });
      }, 2500);
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please check your credentials.", {
        autoClose: 4000,
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?login,technology')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login as {role}
        </h2>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              role === "user"
                ? "bg-black text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              role === "admin"
                ? "bg-black text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
