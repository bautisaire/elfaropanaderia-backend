import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Guardar un pedido
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Pedido guardado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el pedido" });
  }
});

// Obtener todos los pedidos (para control interno)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pedidos" });
  }
});

export default router;