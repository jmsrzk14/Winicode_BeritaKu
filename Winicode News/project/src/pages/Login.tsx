import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard/home");
      } else {
        setError(data.message || "Email dan password kamu salah");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungi server.");
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black via-blue-950 to-black">
      <motion.img 
        src="/news.png" 
        alt="Logo"
        className="w-[20em] sm:w-30 md:w-30 lg:w-[26em] h-auto object-cover mb-[-2em]" 
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.form
        onSubmit={handleLogin} className="bg-gradient-to-b from-black via-gray-950 to-black p-6 rounded-lg shadow-lg w-80"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold mb-[1em] flex justify-center text-white">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded pr-10"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
        <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white p-2 rounded mt-3">
          Login
        </button>
        <p className="mt-2 text-gray-400">
        </p>
      </motion.form>
    </div>
  );
}
