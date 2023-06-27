import { register, login, changePassword, forgotPassword, newPassword } from "../controllers/auth.controller"
import { Router } from "express"
import { verifyToken } from "../middlewares/verifyToken"
const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/password-reset", newPassword)
router.post("/change-password", [verifyToken], changePassword)

export default router