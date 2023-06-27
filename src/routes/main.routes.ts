import { Router, Request, Response } from "express"
import user from "./usuario.routes"
import auth from "./auth.routes"
import rol from "./rol.routes"

const routes = Router()

routes.use("/usuarios", user)
routes.use("/auth", auth)
routes.use("/roles", rol)

export default routes