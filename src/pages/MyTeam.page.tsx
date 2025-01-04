import React, { useState } from "react";
import DropDown from "../components/DropDown";
import styles from "./MyTeam.module.css";

const allFormations = {
  "4-4-2": [1, 4, 4, 2],
  "4-3-3": [1, 4, 3, 3],
  "3-5-2": [1, 3, 5, 2],
  "3-4-3": [1, 3, 4, 3],
};

type Formation = keyof typeof allFormations;

const positionNames = ["GK", "DEF", "MID", "ATT"];

const MyTeam = () => {
  const [selectedFormation, setSelectedFormation] =
    useState<Formation>("4-4-2");

  const handleSelectFormation = (formation: Formation) => {
    setSelectedFormation(formation);
  };

  return (
    <div className={styles.container}>
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
  );
};

export default MyTeam;
