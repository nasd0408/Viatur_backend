// src/routes/index.ts
import { Router, Request, Response } from "express";
import user from "./usuario.routes";
import auth from "./auth.routes";
import rol from "./rol.routes";
import prestadores from "./prestador.routes";
import contacto from "./contacto.routes";

const routes = Router();

routes.use("/usuarios", user);
routes.use("/auth", auth);
routes.use("/roles", rol);
routes.use("/prestadores", prestadores);

// Mount contacto routes with the PrestadorDeServicio ID as a route parameter
routes.use("/prestadores/:prestadorId/contactos", contacto);

export default routes;
