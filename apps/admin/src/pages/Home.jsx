import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import AddComponent from "../components/AddComponent";
import useComponentsService from "../apis/componentsApis";

function Home() {
  const { getComponents } = useComponentsService();
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getComponents();
      setComponents(data);
    };
    getData();
  }, []);

  return (
    <div>
      <AddComponent />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-10 max-w-7xl mx-auto px-2 justify-items-center my-10">
        {components?.map((item) => (
          <div key={item?._id}>
            <Card item={item} />
          </div>
        ))}
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
