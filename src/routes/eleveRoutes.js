import express from "express";
import {
  createEleve,
  getAllEleves,
  getEleveById,
  deleteEleve,
} from "../controllers/eleveController.js";

import { requireAuth } from "../middleware/auth.js";


const router = express.Router();


router.post("/", requireAuth('create_eleve'), createEleve);
// ➕ Créer un élève
router.post("/", createEleve);

// 📄 Lister tous les élèves
router.get("/", getAllEleves);

// 🔍 Obtenir un élève par ID
router.get("/:id", getEleveById);

// 🗑️ Supprimer un élève
router.delete("/:id", deleteEleve);

export default router;
