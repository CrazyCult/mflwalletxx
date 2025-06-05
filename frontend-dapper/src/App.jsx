import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import "./App.css";

fcl.config({
  "flow.network": "mainnet",
  "app.detail.title": "MetafixerLab Wallet Test",
  "app.detail.url": "https://metafixerlab.com",
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
  "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/authn",
  "discovery.authn.include": ["0xead892083b3e2c6c"],
  "fcl.accountProof.resolver": async () => {
    const res = await fetch("https://mflwalletxx.vercel.app/api/generate_nonce");
    const { nonce } = await res.json();
    return { nonce };
  }
});

function App() {
  const [user, setUser] = useState({ loggedIn: null });

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);

  return (
    <div className="App">
      <h1>Connexion avec Dapper Wallet</h1>
      {user?.loggedIn ? (
        <>
          <p>✅ Connecté : {user.addr}</p>
          <button onClick={() => fcl.unauthenticate()}>Se déconnecter</button>
        </>
      ) : (
        <button onClick={() => fcl.authenticate()}>Connexion avec Dapper</button>
      )}
    </div>
  );
}

export default App;
