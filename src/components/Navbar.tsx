import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";
import Icon from "../assets/Icon.jpg";
import Modal from "./ModalAuth";

interface Props {
  onSelectItem: (item: string) => void;
}

const Navbar = ({ onSelectItem }: Props) => {
  const [activeItem, setActiveItem] = useState<string>("Home");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    onSelectItem(item);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={Icon} alt="Fantasy Football" className="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${activeItem === "Home" ? "active" : ""}`}
                href="#"
                onClick={() => handleItemClick("Home")}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeItem === "My Team" ? "active" : ""
                }`}
                href="#"
                onClick={() => handleItemClick("My Team")}
              >
                My Team
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeItem === "My Leagues" ? "active" : ""
                }`}
                href="#"
                onClick={() => handleItemClick("My Leagues")}
              >
                My Leagues
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeItem === "Players" ? "active" : ""
                }`}
                href="#"
                onClick={() => handleItemClick("Players")}
              >
                Players
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <Modal modalName="Sign In" />
            <Modal modalName="Sign Up" />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
