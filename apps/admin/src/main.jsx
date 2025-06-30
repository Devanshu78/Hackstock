import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import {
  Bidding,
  Home,
  Login,
  Results,
  Signup,
  Custom404,
  Profile,
  Project,
  ProjectDetails,
} from "./pages/pages.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="results" element={<Results />} />
        <Route path="biddingdetails" element={<Bidding />} />
        <Route path="profile" element={<Profile />} />
        <Route path="projects" element={<Project />} />
        <Route path="project/:id" element={<ProjectDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Custom404 />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{ duration: 10000 }}
    />
  </StrictMode>
);
