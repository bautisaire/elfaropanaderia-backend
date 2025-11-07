import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

// ===============================
// 🧩 CORS CONFIG
// ===============================
const allowedOrigins = [
  "https://elfaropanaderia.vercel.app",
  "http://localhost:5173",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  // 👇 Si es preflight, responder antes de pasar a las rutas
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ===============================
// Middlewares
// ===============================
app.use(express.json());
app.use("/api/orders", orderRoutes);

// ===============================
// Ruta raíz de prueba
// ===============================
app.get("/", (req, res) => {
  res.send("🍞 API funcionando correctamente 🚀");
});

// ===============================
// Conexión a MongoDB
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Servidor backend en puerto ${PORT}`));
  })
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));