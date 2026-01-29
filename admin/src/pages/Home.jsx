import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import AddComponent from "../components/AddComponent";
import useComponentsService from "../apis/componentsApis";

function Home() {
  const { getComponents } = useComponentsService();
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await getComponents();
      setComponents(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Components
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Manage your hackathon components and inventory
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{components?.length || 0}</span>
              <span>Total Components</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Component Section */}
        <AddComponent />

        {/* Components Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg
                className="animate-spin h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Loading components...
              </p>
            </div>
          </div>
        ) : components?.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No components
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by adding a new component
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {components?.map((item) => (
              <Card key={item?._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

/* 
  const handleClick = () => {
    const socketConnection = io("http://localhost:8000");
    startBid();

    socketConnection.on("connect", () => {
      // console.log("Socket connected with id:", socketConnection.id);
    });

    socketConnection.on("bid-started", (data) => {
      console.log("Bid started:", data);
    });

    socketConnection.on("bid", (data) => {
      console.log(data);
    });

    socketConnection.on("auction-ended", (data) => {
      console.log("Auction ended:", data);
    });

    setSocket(socketConnection);
  };

*/
