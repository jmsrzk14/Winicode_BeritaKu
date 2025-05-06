import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: { preventDefault: () => void }) => {
    setError("");
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, username, password }),
      });

      const data = await response.json();
      console.log("Data yang dikirim:", { name, email, username, password });
      console.log("Server Response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
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
        <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-3xl font-bold mb-4 flex justify-center">Register</h2>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
            />
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
            />
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
            <p className="mt-5 text-gray-400">Have a account?
            {' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login Here
              </Link>
            </p>
        </form>
    </div>
  );
}
