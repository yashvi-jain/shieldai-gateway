import { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post("https://yashvi-jain-shieldai-gateway.hf.space/api/scan", {
        prompt,
      });
      setResponse(res.data);
    } catch (err) {
      setResponse({
        error: "Failed to connect to backend",
        details: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper to style the status values
  const getStatusStyle = (key, value) => {
    const val = String(value).toLowerCase();
    if (key === "error") return { color: "#ef4444", fontWeight: "bold" };
    if (val === "safe" || val === "pass") return { color: "#10b981", fontWeight: "bold" };
    if (val === "high" || val === "blocked") return { color: "#ef4444", fontWeight: "bold" };
    return { color: "#374151" };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "white",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        }}
      >
        <header style={{ marginBottom: "25px" }}>
          <h1 style={{ color: "#1e293b", margin: "0 0 8px 0", fontSize: "28px" }}>
            ShieldAI Gateway
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Enter a prompt to analyze security risks and injection attempts.
          </p>
        </header>

        <textarea
          rows="5"
          value={prompt}
          placeholder="Enter prompt to scan..."
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            border: "2px solid #e2e8f0",
            outline: "none",
            fontSize: "16px",
            resize: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
            color: "#1e293b",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />

        <button
          onClick={sendPrompt}
          disabled={loading}
          style={{
            marginTop: "16px",
            background: loading ? "#94a3b8" : "#2563eb",
            color: "white",
            border: "none",
            padding: "14px 28px",
            borderRadius: "12px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
            width: "100%",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Scanning for threats..." : "Scan Prompt"}
        </button>

        <hr style={{ margin: "30px 0", border: "0", borderTop: "1px solid #f1f5f9" }} />

        <div>
          <h2 style={{ color: "#1e293b", fontSize: "18px", marginBottom: "15px" }}>
            Analysis Results
          </h2>

          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              minHeight: "100px",
            }}
          >
            {!response ? (
              <p style={{ color: "#94a3b8", textAlign: "center", marginTop: "20px" }}>
                No response yet.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {Object.entries(response).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: "1px solid #edf2f7",
                    }}
                  >
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#64748b",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {key.replace(/_/g, " ")}
                    </span>
                    <span style={{ fontSize: "15px", ...getStatusStyle(key, value) }}>
                      {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;