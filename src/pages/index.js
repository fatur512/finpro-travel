import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1>Welcome back!</h1>
    </div>
  );
};

export default HomePage;
