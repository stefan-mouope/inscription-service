import express from "express";
import {
  createEleve,
  getAllEleves,
  getEleveById,
  deleteEleve,
} from "../controllers/eleveController.js";

const router = express.Router();

// ➕ Créer un élève
router.post("/", createEleve);

// 📄 Lister tous les élèves
router.get("/", getAllEleves);

// 🔍 Obtenir un élève par ID
router.get("/:id", getEleveById);

// 🗑️ Supprimer un élève
router.delete("/:id", deleteEleve);

export default router;
