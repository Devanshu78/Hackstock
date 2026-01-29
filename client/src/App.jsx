import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import { useEffect, useState } from "react";
import useUserService from "./apis/usersApis";

function App() {
  const navigate = useNavigate();
  const { valid, isAuthenticated } = useUserService();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const res = await isAuthenticated();
      if (!res?.data?.loggedIn) {
        navigate("/login");
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-slate-700 border-t-emerald-600 dark:border-t-emerald-400 rounded-full animate-spin" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {valid ? (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
          <Navbar />
          <main className="animate-fadeIn">
            <Outlet />
          </main>
        </div>
      ) : null}
    </>
  );
}

export default App;
