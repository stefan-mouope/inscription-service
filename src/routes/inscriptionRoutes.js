import express from "express";
import {
  createInscription,
  getAllInscriptions,
  getInscriptionById,
  deleteInscription,
} from "../controllers/inscriptionController.js";

const router = express.Router();

router.post("/", createInscription);
router.get("/", getAllInscriptions);
router.get("/:id", getInscriptionById);
router.delete("/:id", deleteInscription);

export default router;
