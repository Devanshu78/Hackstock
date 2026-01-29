import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {year} <span className="font-semibold">HackStock</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
