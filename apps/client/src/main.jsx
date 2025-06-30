import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

import {
  Card,
  ProjectUpload,
  Bidding,
  Login,
  Signup,
  Home,
  Profile,
  Project,
  ProjectDetails,
  Custom404,
} from "./pages/index.js";
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
        <Route path="projectupload" element={<ProjectUpload />} />
        <Route path="biddingdetails" element={<Bidding />} />
        <Route path="profile" element={<Profile />} />
        <Route path="projects" element={<Project />} />
        <Route path="project/:id" element={<ProjectDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/createaccount" element={<Signup />} />
      <Route path="*" element={<Custom404 />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" reverseOrder={false} />
  </StrictMode>
);
