import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
} from "../controllers/eleveController.js";

import { requireAuth } from "../middleware/auth.js";


const router = express.Router();

<<<<<<< HEAD

router.post("/", requireAuth('create_eleve'), createEleve);
// ➕ Créer un élève
router.post("/", createEleve);
=======
// ➕ Créer un étudiant
router.post("/", createStudent);
>>>>>>> origin/yves

// 📄 Lister tous les étudiants
router.get("/", getAllStudents);

// 🔍 Obtenir un étudiant par ID
router.get("/:id", getStudentById);

// 🗑️ Supprimer un étudiant
router.delete("/:id", deleteStudent);

export default router;
