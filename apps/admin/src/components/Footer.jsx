import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-sky-100 font-semibold tracking-wider text-center py-4">
      <p>
        &copy; {year} <span className="font-ag opacity-90">HackStock</span>. All
        Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
