import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./dashboard";
import Chatbot from "./chatbot";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/admin"
          element={<Dashboard />}
        />

        <Route
          path="/"
          element={<Chatbot />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);