import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import { AuthContextProvider } from "../context/AuthContext.jsx"; // Ensure this is correct

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
);