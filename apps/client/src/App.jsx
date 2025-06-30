import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import { useEffect } from "react";
import useUserService from "./apis/usersApis";

function App() {
  const navigate = useNavigate();

  const { valid, isAuthenticated } = useUserService();

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
        <div className=" bg-[var(--bg-color)] min-h-screen">
          <Navbar />
          <Outlet />
        </div>
      ) : null}
    </>
  );
}

export default App;
