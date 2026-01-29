import React, { useState, useEffect } from "react";
import Card from "../Component/Card";
import PopUp from "../Component/PopUp";
import useComponentService from "../apis/componentsApis";
import useUserService from "../apis/usersApis";
import { useBiddingStore } from "../apis/biddingApis";
import { socketInstance } from "../apis/socketInstance";
import Testimonials from "./Testimonials";

function Home() {
  const { getComponentData, getComponent } = useComponentService();
  const { canBid, setCanBid, getEvent, Notification, showNotification } =
    useBiddingStore();
  const { getUser } = useUserService();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([getUser(), getComponent(), getEvent()]);
      setIsLoading(false);

      // FOR TESTING: Auto-enable bidding after 1 second
      // Uncomment the lines below to test bidding UI
      // setTimeout(() => {
      //   setCanBid("true");
      // }, 1000);
    };
    loadData();
  }, []);

  useEffect(() => {
    const notifyHandler = (data) => {
      // Custom toast-like notification
      const notification = document.createElement("div");
      notification.className =
        "fixed top-20 right-4 z-50 animate-fadeIn bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20";
      notification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clip-rule="evenodd" />
        </svg>
        <span class="font-semibold">Bidding starts in 10 seconds!</span>
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => notification.remove(), 300);
      }, 5000);
    };

    const eventStartHandler = (data) => {
      setCanBid("true");
      const notification = document.createElement("div");
      notification.className =
        "fixed top-20 right-4 z-50 animate-fadeIn bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20";
      notification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
        <span class="font-semibold">Bidding is now LIVE!</span>
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => notification.remove(), 300);
      }, 5000);
    };

    const eventEndHandler = (data) => {
      setCanBid("false");
      const notification = document.createElement("div");
      notification.className =
        "fixed top-20 right-4 z-50 animate-fadeIn bg-gray-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20";
      notification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
        </svg>
        <span class="font-semibold">Bidding has ended!</span>
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => notification.remove(), 300);
      }, 5000);
    };

    socketInstance.on("notify", notifyHandler);
    socketInstance.on("event-start", eventStartHandler);
    socketInstance.on("event-end", eventEndHandler);

    return () => {
      socketInstance.off("notify", notifyHandler);
      socketInstance.off("event-start", eventStartHandler);
      socketInstance.off("event-end", eventEndHandler);
    };
  }, [setCanBid]);

  const handleClick = (card) => {
    // Only open popup if bidding is active
    if (canBid === "true") {
      setSelectedCard(card);
      setIsOpen(!isOpen);
    }
  };

  const shouldOpenPopUp = isOpen && canBid === "true";

  // Filter components based on search
  const filteredComponents = getComponentData.filter(
    (item) =>
      item.componentAvailability > 0 &&
      item.componentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableCount = getComponentData.filter(
    (item) => item.componentAvailability > 0
  ).length;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-50 dark:bg-slate-900">
      {/* Hero Section with Notification */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-8">
          {/* Bidding Status Banner */}
          <div className="mb-6 animate-fadeIn">
            <div
              className={`relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-500 ${
                canBid === "true"
                  ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
                  : "bg-gradient-to-r from-gray-700 to-gray-900"
              }`}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div
                  className={`p-3 bg-white/20 rounded-xl backdrop-blur-sm ${
                    canBid === "true" ? "animate-pulse" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    {canBid === "true" ? (
                      <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    )}
                    {canBid === "true" && (
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </div>
                <div className="flex-1 text-white">
                  <h3 className="text-lg md:text-xl font-bold mb-1 flex items-center gap-2">
                    {canBid === "true" ? (
                      <>
                        <span className="animate-pulse">🔴</span>
                        Bidding is LIVE NOW!
                      </>
                    ) : (
                      "Bidding Event"
                    )}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {canBid === "true" ? (
                      <span className="font-semibold">
                        Click on any component card to place your bid! 🎯
                      </span>
                    ) : (
                      <>
                        {showNotification && Notification ? (
                          <>
                            <span className="font-mono bg-white/20 px-2 py-0.5 rounded">
                              {Notification.eventDate}
                            </span>{" "}
                            from{" "}
                            <span className="font-mono bg-white/20 px-2 py-0.5 rounded">
                              {Notification.startTime}
                            </span>{" "}
                            to{" "}
                            <span className="font-mono bg-white/20 px-2 py-0.5 rounded">
                              {Notification.endTime}
                            </span>
                          </>
                        ) : (
                          "No active bidding event at the moment"
                        )}
                      </>
                    )}
                  </p>
                </div>
                {canBid === "true" && (
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-600 font-bold rounded-full shadow-xl animate-pulse border-2 border-white/50">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    LIVE NOW
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Page Header with Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Components
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Browse and bid on{" "}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {availableCount}
                </span>{" "}
                available electronic components
              </p>
            </div>

            {/* Search Bar */}
            <div
              className="relative animate-fadeIn"
              style={{ animationDelay: "0.1s" }}
            >
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/30 outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-gray-400 dark:text-gray-500"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          // Loading Skeleton
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="aspect-square bg-gray-200 dark:bg-slate-700" />
                <div className="p-4">
                  <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredComponents.length === 0 ? (
          // Empty State
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-gray-400 dark:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No components found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : "All components are currently out of stock"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-6 py-3 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          // Components Grid
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredComponents.map((cardData, index) => (
              <div
                key={cardData?._id}
                onClick={() => handleClick(cardData)}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <Card cardData={cardData} canBid={canBid} />
              </div>
            ))}
          </div>
        )}

        {/* Material Warning */}
        <div className="mt-12 animate-fadeIn">
          <div className="flex items-start gap-4 p-5 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-amber-600 dark:text-amber-400"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
                Material Usage Limits
              </h4>
              <p className="text-amber-800 dark:text-amber-300 text-sm">
                Maximum allowed per student:{" "}
                <span className="font-mono font-bold">100gm Lead</span> and{" "}
                <span className="font-mono font-bold">500gm Copper</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Bidding Popup */}
      {shouldOpenPopUp && (
        <PopUp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          Notification={Notification}
        />
      )}
    </div>
  );
}

export default Home;
