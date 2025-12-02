import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "./app/store"; // Import your store
import App from "./App.jsx";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* Wrap the App in Redux Provider */}
      <App />
    </Provider>
  </StrictMode>
);
