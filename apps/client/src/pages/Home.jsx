import React, { useState, useEffect } from "react";
import Card from "../Component/Card";
import PopUp from "../Component/PopUp";
import useComponentService from "../apis/componentsApis";
import useUserService from "../apis/usersApis";
import { useBiddingStore } from "../apis/biddingApis";
import { socketInstance } from "../apis/socketInstance";

function Home() {
  const { getComponentData, getComponent } = useComponentService();
  const { canBid, setCanBid, getEvent, Notification, showNotification } =
    useBiddingStore();
  const { getUser } = useUserService();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    getUser();
    getComponent();
    getEvent();
  }, [getComponent]);

  useEffect(() => {
    const notifyHandler = (data) => {
      alert("Bidding starts in 10 seconds");
    };
    const eventStartHandler = (data) => {
      setCanBid("true");
    };
    const eventEndHandler = (data) => {
      alert("Bidding Ends!!!");
      setCanBid("false");
    };

    // Register handlers
    socketInstance.on("notify", notifyHandler);
    socketInstance.on("event-start", eventStartHandler);
    socketInstance.on("event-end", eventEndHandler);

    // Cleanup
    return () => {
      socketInstance.off("notify", notifyHandler);
      socketInstance.off("event-start", eventStartHandler);
      socketInstance.off("event-end", eventEndHandler);
    };
  }, [setCanBid]);

  const handleClick = (card) => {
    setSelectedCard(card);
    setIsOpen(!isOpen);
  };
  const shouldOpenPopUp = isOpen && canBid;

  return (
    <div className="min-h-[calc(100vh-5rem)] relative overflow-auto">
      {showNotification && (
        <section className="my-2 text-center bg-[var(--action-color)] max-w-2xl mx-2 sm:mx-auto py-4 text-sm sm:text-lg  text-white rounded-xl tracking-wider">
          Bidding will start at <br />
          {Notification && (
            <span>
              {Notification.eventDate} at {Notification.startTime} and will end
              at {Notification.endTime}
            </span>
          )}
        </section>
      )}

      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-20 max-w-7xl mx-auto px-5 justify-items-center my-10">
        {getComponentData.map(
          (cardData) =>
            cardData.componentAvailability > 0 && (
              <div
                key={cardData?._id}
                onClick={handleClick.bind(this, cardData)}
              >
                <Card cardData={cardData} />
              </div>
            )
        )}
      </section>
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
