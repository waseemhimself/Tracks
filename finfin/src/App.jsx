import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import { useEffect } from "react";
import { initStorage } from "./utils/storage";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Expenses from "./pages/Expenses";
import Insights from "./pages/Insights";
import Goals from "./pages/Goals";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  useEffect(() => {
    initStorage();

    const savedTheme = localStorage.getItem("theme") || "auto";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <div className="main">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddExpense />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;