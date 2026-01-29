import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import useUserService from "./apis/usersApis";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { Login } from "./pages/pages.js";

function App() {
  const { isAuthenticated, valid } = useUserService();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await isAuthenticated();
      if (!res?.data?.loggedIn) {
        navigate("/login");
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      {valid ? (
        <div className="min-h-screen flex flex-col w-full">
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;

/* 

#eadafa
 */
