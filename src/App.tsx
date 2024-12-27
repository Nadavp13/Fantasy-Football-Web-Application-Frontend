import Button from "./components/Button";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Modal from "./components/ModalAuth";
import MyTeam from "./pages/myTeam";

function App() {
  return (
    <div>
      <Navbar onSelectItem={() => {}} />
      <MyTeam />
    </div>
  );
}

export default App;
