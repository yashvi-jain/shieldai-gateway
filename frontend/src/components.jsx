export function Navbar() {
  return (
    <div
      style={{
        padding: "20px",
        background: "#111827",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold"
      }}
    >
      shieldAI Gateway
    </div>
  );
}

export function ThreatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#111827",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "220px"
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

export function LogsTable({ logs }) {
  return (
    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        marginTop: "20px",
        borderCollapse: "collapse"
      }}
    >
      <thead
        style={{
          background: "#111827",
          color: "white"
        }}
      >
        <tr>
          <th>ID</th>
          <th>Prompt</th>
          <th>Threats</th>
          <th>Risk</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{log.id}</td>
            <td
              style={{
                maxWidth: "400px",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap"
              }}
            >
              {log.prompt}
            </td>
            <td>{log.threats}</td>
            <td>{log.risk_score}</td>
            <td
              style={{
                color:
                  log.action === "BLOCKED"
                    ? "red"
                    : log.action === "FLAGGED"
                    ? "orange"
                    : "green",

                fontWeight: "bold"
              }}
            >
              {log.action}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}