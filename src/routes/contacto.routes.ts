// src/routes/contacto.routes.ts
import { Router } from "express";
import { 
    createContacto, 
    deleteContacto, 
    findAllContactos, 
    findOneContacto, 
    updateContacto 
} from "../controllers/contacto.controller";

const router = Router({ mergeParams: true });

// Create a new Contacto for a specific PrestadorDeServicio
router.post("/", createContacto);

// Update a Contacto by ID for a specific PrestadorDeServicio
router.put("/:contactoId", updateContacto);

// Get a Contacto by ID for a specific PrestadorDeServicio
router.get("/:contactoId", findOneContacto);

// Get all Contactos for a specific PrestadorDeServicio
router.get("/", findAllContactos);

// Delete a Contacto by ID for a specific PrestadorDeServicio
router.delete("/:contactoId", deleteContacto);

export default router;