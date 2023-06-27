import { Request, Response, NextFunction } from "express"
import { AppDataSource } from '../config/db.config'
import { verify } from "jsonwebtoken"
import { RESPONSES } from "../resources/constants"
import { Usuario } from "../entity/usuario.entity"
import { secretKey } from "../helpers/generate_jwt"

const UsuarioRepository = AppDataSource.getRepository(Usuario)

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').split(' ')[1]
    const jwtPayload = verify(token, secretKey)
    //If token is not valid, respond with 401 (unauthorized)
    if (typeof jwtPayload === 'string') return res.status(401).send({
        statusCode: 401,
        data: null,
        message: RESPONSES.INVALID_TOKEN
    })
    UsuarioRepository.findOneBy({ id: jwtPayload?.usuarioId })
        .then((data) => {
            res.locals.usuario = data
            next()
        })
        .catch((error) => {
            return res.status(404).send({
                statusCode: 404,
                data: error,
                message: RESPONSES.USER_NOT_FOUND
            })
        })
}