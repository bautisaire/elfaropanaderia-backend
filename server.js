import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando correctamente!");
});
// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(5000, () => console.log("🚀 Servidor backend en puerto 5000"));
  })
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));