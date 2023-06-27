import { findAll, create, findOne, update } from "../controllers/rol.controller"
import { Router } from "express"
const router = Router()

router.get("/", findAll)
router.post("/",create)
router.get("/:id", findOne)
router.put("/:id", update)

export default router