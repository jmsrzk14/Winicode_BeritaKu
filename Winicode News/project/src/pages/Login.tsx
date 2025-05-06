import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <img 
        src="/news.png" 
        alt="Logo"
        className="w-[20em] sm:w-30 md:w-30 lg:w-[26em] h-auto object-cover mb-[-2em]" 
      />
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        <p className="mt-5 text-gray-400">
          Not a member?{" "}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Create a new account
          </Link>
        </p>
      </form>
    </div>
  );
}
