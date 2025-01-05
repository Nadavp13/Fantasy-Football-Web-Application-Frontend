import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverLink, playersLink } from "../utils/constants/serverLink";

const HomePage = () => {
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(serverLink);
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players data", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <div>
        <h2>Raw Players Data</h2>
        <pre>{JSON.stringify(players, null, 2)}</pre>
      </div>
    </div>
  );
};

export default HomePage;
