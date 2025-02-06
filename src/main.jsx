import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppProvider from "./ApolloProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "1002704080432-l88o1j3avpivvdic0t81vaq2nrcad5t0.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <AppProvider>
      <App />
    </AppProvider>
  </GoogleOAuthProvider>
);
