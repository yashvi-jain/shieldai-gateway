import { useEffect, useState } from "react";

import API from "./api";

import {
  Navbar,
  ThreatCard,
  LogsTable
} from "./components";

import {
  RiskChart
} from "./charts";

function Dashboard() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
  const password = prompt("Enter Admin Password:");
  if (password !== "your_secret_password") {
    window.location.href = "/";
  }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await API.get("https://yashvi-jain-shieldai-gateway.hf.space/analytics/logs");
    setLogs(res.data);
  };

  const blocked = logs.filter(
    (log) => log.action === "BLOCKED"
  ).length;

  return (
    <div>

      <Navbar />

      <div style={{ padding: "20px" }}>

        <div
          style={{
            display: "flex",
            gap: "20px"
          }}
        >

          <ThreatCard
            title="Total Attacks"
            value={logs.length}
          />

          <ThreatCard
            title="Blocked Requests"
            value={blocked}
          />

        </div>

        <div style={{ marginTop: "40px" }}>
          <RiskChart logs={logs} />
        </div>

        <LogsTable logs={logs} />

      </div>

    </div>
  );
}

export default Dashboard;