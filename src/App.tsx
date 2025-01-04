import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Button from "./components/Button";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Modal from "./components/ModalAuth";
import HomePage from "./pages/Home.page";
import MyTeamPage from "./pages/MyTeam.page";
import MyLeaguesPage from "./pages/MyLeagues.page";
import PlayersPage from "./pages/Players.page";
import NotFoundPage from "./pages/NotFound.page";

const router = [
  {
    path: "/",
    component: HomePage,
    isPrivate: false,
    title: "Home - Fantasy Football",
  },
  {
    path: "/myteam",
    component: MyTeamPage,
    isPrivate: true,
    title: "My Team - Fantasy Football",
  },
  {
    path: "/myleagues",
    component: MyLeaguesPage,
    isPrivate: true,
    title: "My Leagues - Fantasy Football",
  },
  {
    path: "/players",
    component: PlayersPage,
    isPrivate: true,
    title: "Players - Fantasy Football",
  },
  {
    path: "*",
    component: NotFoundPage,
    isPrivate: false,
    title: "404 Not Found",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Home");

  const handleNavigate = (page: string) => {
    setActivePage(page);
    const navigate = useNavigate();
    if (page === "Home") navigate("/");
    if (page === "My Team") navigate("/myteam");
    if (page === "My Leagues") navigate("/myleagues");
    if (page === "Players") navigate("/players");
  };

  return (
    <Router>
      <Navbar onSelectItem={handleNavigate} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myteam" element={<MyTeamPage />} />
        <Route path="/myleagues" element={<MyLeaguesPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
