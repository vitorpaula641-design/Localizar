const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Limite básico para o tamanho das requisições
app.use(express.json({ limit: "10kb" }));

// Servir os arquivos do site
app.use(express.static(path.join(__dirname, "public")));

// Armazenamento temporário em memória.
// As localizações são apagadas quando o servidor reinicia.
const locations = [];

// Receber uma localização APÓS o visitante ter dado consentimento
app.post("/api/location", (req, res) => {
  const { latitude, longitude, accuracy, timestamp } = req.body;

  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({
      error: "Localização inválida."
    });
  }

  const location = {
    latitude,
    longitude,
    accuracy: typeof accuracy === "number" ? accuracy : null,
    timestamp: timestamp || new Date().toISOString()
  };

  locations.push(location);

  // Mantém somente os 50 registros mais recentes
  if (locations.length > 50) {
    locations.shift();
  }

  console.log("Localização recebida com consentimento:", location);

  res.json({
    success: true
  });
});

// Painel protegido por token
app.get("/api/locations", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({
      error: "Não autorizado."
    });
  }

  res.json(locations);
});

// Rota de teste
app.get("/api/status", (req, res) => {
  res.json({
    online: true,
    locationsReceived: locations.length
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando na porta ${PORT}`);
});
