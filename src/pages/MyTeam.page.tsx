import React, { useState, useEffect } from "react";
import DropDown from "../components/DropDown";
import axios from "axios";
import { playersLink, serverLink } from "../utils/constants/serverLink";
import styles from "./MyTeam.module.css";

const allFormations = {
  "4-4-2": [1, 4, 4, 2],
  "4-3-3": [1, 4, 3, 3],
  "3-5-2": [1, 3, 5, 2],
  "3-4-3": [1, 3, 4, 3],
};

type Formation = keyof typeof allFormations;
const positionNames = ["GK", "DEF", "MID", "FWD"];

const MyTeam = () => {
  const [selectedFormation, setSelectedFormation] =
    useState<Formation>("4-4-2");
  const [players, setPlayers] = useState<
    | {
        name: string;
        position: string;
        team: string;
        price: number;
        totalPoints: number;
        image: string;
      }[]
    | null
  >(null);
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [teamOptions, setTeamOptions] = useState<string[]>([]);

  const handleSelectFormation = (formation: Formation) => {
    setSelectedFormation(formation);
  };

  // Fetch players data
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(playersLink);
        setPlayers(response.data);
        setFilteredPlayers(response.data);

        // Extract unique teams and set them in state
        const teams: string[] = Array.from(
          new Set(response.data.map((player: { team: string }) => player.team))
        );
        teams.sort();
        setTeamOptions(["", ...teams, "Clear Filter"]);
      } catch (error) {
        console.error("Error fetching players data", error);
      }
    };

    fetchPlayers();
  }, []);

  // Filter players based on position and team
  useEffect(() => {
    if (!players) return;

    let filtered = players;

    if (selectedPosition) {
      filtered = filtered.filter(
        (player) => player.position === selectedPosition
      );
    }

    if (selectedTeam) {
      filtered = filtered.filter((player) => player.team === selectedTeam);
    }

    setFilteredPlayers(filtered);
  }, [selectedPosition, selectedTeam, players]);

  // Handle position and team selection
  const positionButtonText = selectedPosition
    ? `Position: ${selectedPosition}`
    : "Filter by Position";
  const teamButtonText = selectedTeam
    ? `Team: ${selectedTeam}`
    : "Filter by Team";

  const positionOptions = ["", "GK", "DEF", "MID", "FWD", "Clear Filter"];
  //const teamOptions = ["", "Team A", "Team B", "Team C", "Clear Filter"]; // Replace with dynamic team names

  const handlePositionSelect = (position: string) => {
    if (position === "Clear Filter") {
      setSelectedPosition("");
    } else {
      setSelectedPosition(position);
    }
  };

  const handleTeamSelect = (team: string) => {
    if (team === "Clear Filter") {
      setSelectedTeam("");
    } else {
      setSelectedTeam(team);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.heading}>My Team</h1>
        <div className={styles.dropdownWrapper}>
          <DropDown
            items={Object.keys(allFormations) as Formation[]}
            heading="Select Formation"
            onSelectItem={handleSelectFormation}
          />
        </div>
        <table className={styles.formationTable}>
          <tbody>
            {allFormations[selectedFormation].map((columns, rowIndex) => (
              <tr key={rowIndex} className={styles.formationRow}>
                <td
                  colSpan={allFormations[selectedFormation].length}
                  className={styles.formationCell}
                >
                  <div className={styles.buttonRow}>
                    {Array.from({ length: columns }).map((_, colIndex) => {
                      const position = positionNames[rowIndex];

                      return (
                        <button
                          key={colIndex}
                          className={styles.playerButton}
                          id={`${position}-${rowIndex + 1}-${colIndex + 1}`}
                        >
                          Player {rowIndex + 1}-{colIndex + 1}
                        </button>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.filters}>
          <div>
            <DropDown
              items={positionOptions}
              heading={positionButtonText}
              onSelectItem={handlePositionSelect}
            />
          </div>
          <div>
            <DropDown
              items={teamOptions}
              heading={teamButtonText}
              onSelectItem={handleTeamSelect}
            />
          </div>
        </div>

        <div className={styles.playerList}>
          <h2>All Players</h2>
          <table className={styles.playerTable}>
            <thead>
              <tr>
                <th className={styles.playerHeader}>Player</th>
                <th className={styles.playerHeader}></th>
                <th className={styles.playerHeader}>Price</th>
                <th className={styles.playerHeader}>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers ? (
                filteredPlayers.map((player, index) => (
                  <tr key={index} className={styles.playerItem}>
                    <td className={styles.playerNameContainer}>
                      <div className={styles.playerName}>{player.name}</div>
                      <div className={styles.playerInfo}>
                        <span className={styles.playerTeam}>{player.team}</span>
                        <span className={styles.playerPosition}>
                          {player.position}
                        </span>
                      </div>
                    </td>
                    <td className={styles.playerImage}>
                      {
                      player.image ? (
                        <img
                          src={player.image.startsWith("http") ? player.image : `https://${player.image}`}
                          alt={player.name}
                          className={styles.playerImage}
                        /> 
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className={styles.playerPrice}>${player.price}</td>
                    <td className={styles.playerPoints}>
                      {player.totalPoints} pts
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>Loading players...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
