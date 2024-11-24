import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    // Get the token and apiKey from localStorage
    const savedToken = localStorage.getItem("token");
    const savedApiKey = localStorage.getItem("apiKey");

    if (savedToken) {
      setToken(savedToken);
      setApiKey(savedApiKey);
    } else {
      // Redirect to login if no token is found
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!token || !apiKey) return; // Prevent fetching if no token or apiKey

      try {
        // Replace with your actual BASE_URL in your environment configuration
        const response = await axios.get("https://your-api-base-url.com/api/v1/categories", {
          headers: {
            Authorization: `Bearer ${token}`, // Use token for authentication
            apiKey, // Pass the apiKey for access
          },
        });
        setCategories(response.data.data); // Set the fetched categories data
      } catch (err) {
        setError("Failed to load categories");
        console.error("Error fetching categories:", err.response?.data || err.message);
      } finally {
        setLoading(false); // Stop loading once request is complete
      }
    };

    fetchCategories();
  }, [token, apiKey]);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container px-4 py-16 mx-auto space-y-16">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold">Popular Categories</h2>
        <p className="max-w-2xl mx-auto text-gray-600">Discover travel experiences tailored to your interests</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
          >
            <div className="relative w-full h-48">
              <Image
                src={category.imageUrl} // Assuming imageUrl exists in the category data
                alt={category.name}
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{category.name}</h3>
              <p className="mb-4 text-gray-600">{category.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={16} />
                  <span>Updated on: {category.updatedAt}</span>
                </div>
                <Link
                  href={`/categories/${category.id}`}
                  className="px-4 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                >
                  View Category
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
