import { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
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
        error: "Failed to connect backend",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          background: "white",
          borderRadius: "18px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h1 style={{ color: "#111827", marginBottom: "8px" }}>
          ShieldAI Test Chatbot
        </h1>

        <p style={{ color: "#555", marginBottom: "20px" }}>
          Enter a prompt to test your security gateway
        </p>

        <textarea
          rows="7"
          value={prompt}
          placeholder="Type your prompt..."
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "2px solid #111827",
            outline: "none",
            fontSize: "15px",
            resize: "none",
            boxSizing: "border-box",
            color: "#111827",
          }}
        />

        <button
          onClick={sendPrompt}
          disabled={loading}
          style={{
            marginTop: "15px",
            background: "#111827",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            fontSize: "15px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Scanning..." : "Send"}
        </button>

        <div style={{ marginTop: "25px" }}>
          <h2 style={{ color: "#111827", marginBottom: "10px" }}>
            Response
          </h2>

          <div
            style={{
              background: "#111827",
              color: "white",
              padding: "18px",
              borderRadius: "12px",
              maxHeight: "320px",
              overflowY: "auto",
              overflowX: "hidden",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            {response ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {Object.entries(response).map(([key, value]) => (
                  <div key={key} style={{ borderBottom: "1px solid #374151", paddingBottom: "8px" }}>
                    <div style={{ color: "#9ca3af", textTransform: "uppercase", fontSize: "11px", fontWeight: "bold", letterSpacing: "0.5px" }}>
                      {key.replace(/_/g, " ")}
                    </div>
                    <div style={{ color: key === "error" ? "#f87171" : "#fff", marginTop: "4px", whiteSpace: "pre-wrap" }}>
                      {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              "No response yet."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;