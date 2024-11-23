import axios from "axios";
import { Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [apiKey, setApiKey] = useState(null);
  const [token, setToken] = useState(null);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchPromos = async () => {
    if (!token) return; // Prevent fetching promos if no login token

    try {
      setLoading(true); // Start loading
      const response = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token if available
          apiKey, // Use the token if available
        },
      });
      console.log("Promos response:", response.data.data);

      // Check if the response is an array
      if (Array.isArray(response.data.data)) {
        setPromos(response.data.data); // Update state with the fetched data
      } else {
        setError("Promotions data is not in the expected format.");
        console.error("Error: Response data is not an array");
      }
    } catch (err) {
      setError("Failed to load promotions");
      console.error("Error fetching promos:", err.response?.data || err.message);
    } finally {
      setLoading(false); // Stop loading after the request
    }
  };

  // Fetch promos after login state is set
  useEffect(() => {
    if (token) {
      console.log("Fetching promos...");
      fetchPromos(); // Fetch promos only if login is successful and token is available
    }
  }, [token]);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full shadow-sm bg-white/80 backdrop-blur-md">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-gray-900">Tripper</span>
              </Link>
              <div className="flex items-baseline ml-10 space-x-4">
                <Link
                  href="/destinations"
                  className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                >
                  Destinations
                </Link>
                <Link
                  href="/categories"
                  className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                >
                  Categories
                </Link>
                <Link
                  href="/promos"
                  className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                >
                  Promos
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="relative flex items-center justify-center h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-background.jpg"
            alt="Travel Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-70"
          />
        </div>
        <div className="relative z-10 max-w-4xl px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl drop-shadow-lg">
            Explore the World with Tripper
          </h1>
          <p className="mb-10 text-xl text-white md:text-2xl drop-shadow-md">
            Discover amazing destinations, incredible experiences, and unforgettable journeys
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/destinations"
              className="px-8 py-3 text-lg font-semibold text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700"
            >
              Browse Destinations
            </Link>
            <Link
              href="/promos"
              className="px-8 py-3 text-lg font-semibold text-blue-600 transition-colors bg-white rounded-full hover:bg-gray-100"
            >
              View Promos
            </Link>
          </div>
        </div>
      </div>
      <div className="container px-4 py-16 mx-auto space-y-16">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Featured Destinations</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Explore our handpicked destinations that offer unique experiences and unforgettable memories
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">{/* Featured Destinations will go here */}</div>
        </div>
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Popular Categories</h2>
            <p className="max-w-2xl mx-auto text-gray-600">Discover travel experiences tailored to your interests</p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">{/* Categories will go here */}</div>
        </div>
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Latest Promos</h2>
            <p className="max-w-2xl mx-auto text-gray-600">Grab unbeatable deals and save big on your next adventure</p>
          </div>

          <div className="space-y-8">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold">Latest Promos</h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                Grab unbeatable deals and save big on your next adventure
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {promos.map((promo) => (
                <div
                  key={promo.id}
                  className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
                >
                  <div className="relative w-full h-48">
                    <Image src={promo.imageUrl} alt={promo.title} fill className="object-cover" />
                    <div className="absolute flex items-center gap-2 px-3 py-1 text-white bg-red-500 rounded-full top-4 right-4">
                      <Tag size={16} />
                      {promo.promo_discount_price}% OFF
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-xl font-semibold">{promo.title}</h3>
                    <p className="mb-4 text-gray-600">{promo.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock size={16} />
                        <span>Valid until: {promo.validUntil}</span>
                      </div>
                      <Link
                        href={`/promos/${promo.id}`}
                        className="px-4 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                      >
                        View Promo
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;