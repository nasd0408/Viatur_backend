import { Router } from "express";
import {
  getAllDestinos,
  getDestinoById,
  createDestino,
  updateDestino,
  deleteDestino,
} from "../controllers/destino.controller";

const router = Router();

// GET all Destinos
router.get("/", getAllDestinos);

// GET a single Destino by ID
router.get("/:id", getDestinoById);

// CREATE a new Destino
router.post("/", createDestino);

// UPDATE an existing Destino by ID
router.put("/:id", updateDestino);

// DELETE a Destino by ID
router.delete("/:id", deleteDestino);

export default router;
