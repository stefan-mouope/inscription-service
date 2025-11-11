import express from "express";
import {
  createPayement,
  getAllPayements,
  getPayementById,
} from "../controllers/payementController.js";

const router = express.Router();

// ➕ Créer un paiement
router.post("/", createPayement);

// 📄 Lister tous les paiements
router.get("/", getAllPayements);

// 🔍 Obtenir un paiement par ID
router.get("/:id", getPayementById);

export default router;
