import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverLink, playersLink } from "../utils/constants/serverLink"; // Ensure this is the correct URL

const HomePage = () => {
  // State for storing the players data
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    // Function to fetch players data from the backend
    const fetchPlayers = async () => {
      try {
        // Sending GET request to the server
        const response = await axios.get(serverLink); // Ensure 'playersLink' is the correct backend URL
        setPlayers(response.data); // Storing the fetched data in state
      } catch (error) {
        console.error("Error fetching players data", error);
      }
    };

    fetchPlayers();
  }, []); // Empty array to run once when the component mounts

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>

      {/* Displaying raw players data */}
      <div>
        <h2>Raw Players Data</h2>
        <pre>{JSON.stringify(players, null, 2)}</pre>
      </div>
    </div>
  );
};

export default HomePage;
