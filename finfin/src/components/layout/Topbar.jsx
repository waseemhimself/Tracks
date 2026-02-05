function Topbar() {
  return (
    <header
      style={{
        height: "64px",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid var(--muted)",
      }}
    >
      <span style={{ color: "var(--muted)" }}>
        Track smart. Spend smarter.
      </span>
    </header>
  );
}

export default Topbar;
