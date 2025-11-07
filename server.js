import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const allowedOrigins = [
  "https://elfaropanaderia.vercel.app", // tu dominio de Vercel
  "http://localhost:5000" // para desarrollo local 
];

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (por ejemplo, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS no permitido para este dominio: " + origin));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
// ✅ Ruta de prueba
app.get("/", (req, res) => {
  res.send("🍞 API funcionando correctamente 🚀");
});
// Rutas
app.use("/api/orders", orderRoutes);

// Conectar a MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Conectado a MongoDB Atlas");
//     app.listen(5000, () => console.log("🚀 Servidor backend en puerto 5000"));
//   })
//   .catch((err) => console.error("❌ Error al conectar MongoDB:", err));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Servidor backend en puerto ${PORT}`));
  })
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));