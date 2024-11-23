import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  // Use useEffect to ensure the router logic runs on the client side
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to /about if not authenticated
    }
  }, [isAuthenticated, router]); // Re-run effect when isAuthenticated or router changes

  // If not authenticated, the redirection happens immediately, so nothing renders
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render the content
  return (
    <div>
      <h1>Welcome back!</h1>
    </div>
  );
};

export default HomePage;
