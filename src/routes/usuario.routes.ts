import { findAll, findOne } from "../controllers/usuario.controller"
import { Router } from "express"
const router = Router()

router.get("/", findAll)
router.get("/:id", findOne)

export default router