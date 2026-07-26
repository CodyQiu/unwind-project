import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Journal from "./components/Journal";
import Breathing from "./components/Breathing";
import Checklist from "./components/Checklist";

const views = [
  { id: "home", label: "Home", icon: "🌙" },
  { id: "journal", label: "Journal", icon: "✍️" },
  { id: "breathing", label: "Breathing", icon: "🫧" },
  { id: "checklist", label: "Checklist", icon: "✨" },
];

function App() {
  const [activeView, setActiveView] = useState("home");

  const pages = {
    home: <Home />,
    journal: <Journal />,
    breathing: <Breathing />,
    checklist: <Checklist />,
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Header />
      <nav className="nav-tabs" aria-label="Primary navigation">
        {views.map((view) => (
          <button
            key={view.id}
            className={`nav-tab ${activeView === view.id ? "active" : ""}`}
            onClick={() => setActiveView(view.id)}
            type="button"
          >
            <span aria-hidden="true">{view.icon}</span>
            {view.label}
          </button>
        ))}
      </nav>
      <main className="content-panel">{pages[activeView]}</main>
    </div>
  );
}

export default App;
