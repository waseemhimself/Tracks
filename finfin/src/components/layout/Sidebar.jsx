import { NavLink } from "react-router-dom";

const navItemStyle = ({ isActive }) => ({
  padding: "12px 16px",
  borderRadius: "12px",
  marginBottom: "8px",
  textDecoration: "none",
  color: isActive ? "#fff" : "var(--text)",
  background: isActive ? "var(--primary)" : "transparent",
  display: "block",
});

function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        padding: "24px",
        background: "var(--card)",
      }}
    >
      <h2 style={{ marginBottom: "24px" }}>FinFin</h2>

      <NavLink to="/" style={navItemStyle}>Dashboard</NavLink>
      <NavLink to="/add" style={navItemStyle}>Add Expense</NavLink>
      <NavLink to="/expenses" style={navItemStyle}>Expenses</NavLink>
      <NavLink to="/insights" style={navItemStyle}>Insights</NavLink>
      <NavLink to="/goals" style={navItemStyle}>Goals</NavLink>
      <NavLink to="/profile" style={navItemStyle}>Profile</NavLink>
      <NavLink to="/settings" style={navItemStyle}>Settings</NavLink>
    </aside>
  );
}

export default Sidebar;