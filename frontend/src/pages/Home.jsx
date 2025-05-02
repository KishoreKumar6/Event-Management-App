import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?event,concert')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Welcome to <span className="text-amber-400">KrishEvents</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Your one-stop platform for discovering and managing unforgettable
          events. Dive in and explore!
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-8 py-4 rounded-lg transition transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
