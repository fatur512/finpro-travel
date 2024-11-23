import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [profilePicture, setProfilePicture] = useState(null); // File for profile picture
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [apiKey, setApiKey] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get the token from localStorage
    const savedToken = localStorage.getItem("token");
    const apikey = localStorage.getItem("apiKey");

    if (savedToken) {
      setToken(savedToken); // Set the token if it exists
      setApiKey(apikey); // Set the token if it exists
    } else {
      // Redirect to login if no token is found
      window.location.href = "/login";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error on form submit

    // Validate if passwords match
    if (password !== passwordRepeat) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const API_BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1";

      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwordRepeat", passwordRepeat);
      formData.append("role", role);
      formData.append("phoneNumber", phoneNumber);

      if (profilePicture) {
        formData.append("profilePicture", profilePicture); // Append file if provided
      }

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Use the token if available
          apiKey, // Use the token if available
        },
        body: formData, // Send FormData in the body
      });

      const data = await response.json(); // Parse the JSON response

      if (!response.ok) {
        // If the response is not OK, throw an error with the message
        throw new Error(data.message || "Registration failed");
      }

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (err) {
      setError(err.message); // Set error message if any
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-900">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="passwordRepeat" className="block text-sm font-medium text-gray-700">
              Repeat Password
            </label>
            <input
              id="passwordRepeat"
              type="password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              id="profilePicture"
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])} // Store file
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>} {/* Display error */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
