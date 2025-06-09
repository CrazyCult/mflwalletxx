// api/generate_nonce.js

// Utilise le module "crypto" de Node.js pour générer un nonce
export default function handler(req, res) {
  // CORS headers obligatoires
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Génération d'un nonce hexa 32 caractères (16 octets)
  const nonce = require("crypto").randomBytes(16).toString("hex");

  // Retourne le nonce au format attendu par FCL Discovery
  res.status(200).json({ nonce });
}
