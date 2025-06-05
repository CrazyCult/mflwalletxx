import React from "react";
import { createRoot } from "react-dom/client";
import * as fcl from "@onflow/fcl";

fcl.config({
  "flow.network": "mainnet",
  "app.detail.title": "Mon Site",
  "app.detail.url": "https://metafixerlab.com",
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
  "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/authn",
  "discovery.authn.include": ["0xead892083b3e2c6c"],
  "fcl.accountProof.resolver": async () => {
    const res = await fetch("http://localhost:4000/api/generate_nonce");
    const { nonce } = await res.json();
    return {
      nonce,
      appIdentifier: "metafixerlab",
    };
  },
});

const App = () => {
  const handleConnect = async () => {
    await fcl.authenticate();
    const user = await fcl.currentUser().snapshot();

    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: user.addr,
        nonce: user.services.find(s => s.type === "account-proof")?.data?.nonce,
      }),
    });

    const { token } = await response.json();
    localStorage.setItem("mfl_token", token);
    alert("✅ Connecté avec Dapper: " + user.addr);
  };

  return (
    <button onClick={handleConnect}>
      Connexion avec Dapper Wallet
    </button>
  );
};

createRoot(document.getElementById("root")).render(<App />);
