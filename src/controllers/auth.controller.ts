import { Request, Response } from "express"
import { AppDataSource } from '../config/db.config'
import { Usuario } from "../entity/usuario.entity"
import { Rol } from "../entity/rol.entity"
import { Recuperacion } from "../entity/recuperacion.entity"
import { generateJWT, generateJWTExpire } from "../helpers/generate_jwt"
import { RESPONSES } from '../resources/constants'
import { hashSync } from "bcryptjs"

const UsuarioRepository = AppDataSource.getRepository(Usuario)
const RolRepository = AppDataSource.getRepository(Rol)
const RecRepository = AppDataSource.getRepository(Recuperacion)

export const register = async (req: Request, res: Response) => {
    const values: Usuario = req.body
    if (!values.nombre || !values.email || !values.contrasena || !values.rol) return res.status(400).send({
        statusCode: 400,
        data: null,
        message: RESPONSES.EMPTY_DATA
    })

    const existUser = await UsuarioRepository.findOneBy({ email: values.email })

    if (existUser) return res.status(409).send({
        statusCode: 409,
        data: null,
        message: RESPONSES.ALREADY_REGISTERED
    })
    const rol = await RolRepository.findOneBy({ id: +values.rol })
    const usuario = new Usuario()
    usuario.nombre = values.nombre
    usuario.email = values.email
    usuario.contrasena = values.contrasena
    usuario.estado = 'Activo'
    usuario.rol = rol
    usuario.hashPassword()
    UsuarioRepository.save(usuario)
        .then(data => {
            return res.status(200).send({
                statusCode: 200,
                data: data,
                message: RESPONSES.SUCCESS_REGISTER
            })

        })
        .catch(error => {
            return res.status(500).send({
                statusCode: 500,
                error: error,
                message: RESPONSES.FAIL_REGISTER
            })
        })
}

export const login = async (req: Request, res: Response) => {

    const { email, contrasena } = req.body;

    if (!contrasena || !email) return res.status(400).send({
        statusCode: 400,
        data: null,
        message: RESPONSES.EMPTY_DATA
    })

    const usuario = await UsuarioRepository.findOneOrFail({ where: { email }, relations: ['rol.permisos'] })
    if (!usuario) return res.status(404).send({
        statusCode: 404,
        data: null,
        message: RESPONSES.USER_NOT_FOUND
    })

    if (usuario.estado !== 'Activo') return res.status(401).send({
        statusCode: 401,
        data: null,
        message: RESPONSES.NOT_ACTIVE
    })

    //Check if encrypted password match
    if (!usuario.unencryptedPasswordValidate(contrasena)) return res.status(401).send({
        statusCode: 401,
        data: null,
        message: RESPONSES.PASSWORDS_NOT_MATCH
    })
    //Sign JWT
    const token = generateJWT({ usuarioId: usuario.id });
    //Send the jwt in the response
    return res.status(200).send({
        statusCode: 200,
        token: token,
        data: { 
            usuario: {...usuario, contrasena: undefined, rol: undefined },
            rol: {...usuario.rol, permisos: undefined },
            permisos: usuario.rol.permisos,
        },
        message: RESPONSES.ALREADY_LOGGED
    });
}

export const forgotPassword = async (req: Request, res: Response) => {

    const email = req.body.email;

    if (!email) return res.status(400).send({
        statusCode: 400,
        data: null,
        message: RESPONSES.EMPTY_DATA
    })

    //verify user email
    const usuario = await UsuarioRepository.findOneOrFail({ where: { email } })
    if (!usuario) return res.status(404).send({
        statusCode: 404,
        data: null,
        message: RESPONSES.USER_NOT_FOUND
    })

    const token = await generateJWTExpire({ usuarioId: usuario.id, email: usuario.email }, '30m')
    //let link = `http://localhost:3000/auth/password-reset/${token}`
    //Save token
    RecRepository.save({ email, token })
    .then((data) => {
        return res.status(200).send({
            statusCode: 200,
            success: true,
            data: token,
            message: RESPONSES.SUCCESS_UPDATE_USER
        })
    })
    .catch((error) => {
        return res.status(500).send({
            statusCode: 500,
            data: error,
             message: RESPONSES.FAIL_UPDATE_USER
        })
    })
}

export const newPassword = async (req: Request, res: Response) => {

    const contrasena = req.body.contrasena
    const token = req.body.token

    if (!token || !contrasena) return res.status(400).send({
        statusCode: 400,
        data: null,
        message: RESPONSES.EMPTY_DATA
    })

    const recuperacion = await RecRepository.findOne({ where: { token } })
    if (!recuperacion) return res.status(404).send({
        statusCode: 404,
        data: null,
        message: RESPONSES.RECOVER_NOT_FOUND
    })
    const exist = await UsuarioRepository.findOne({ where: { email: recuperacion.email } })
    if (!exist) return res.status(404).send({
        statusCode: 404,
        data: null,
        message: RESPONSES.USER_NOT_FOUND
    })

    UsuarioRepository.update(exist.id, { contrasena: hashSync(contrasena, 8) })
        .then(async (data) => {
            await RecRepository.delete(recuperacion.id)
            return res.status(200).send({
                statusCode: 200,
                data: null,
                message: RESPONSES.SUCCESS_UPDATE_USER
            })
        })
        .catch((error) => {
            console.log(error)
            return res.status(500).send({
                statusCode: 500,
                data: error,
                message: RESPONSES.FAIL_UPDATE_USER
            })
        })
}

export const changePassword = async (req: Request, res: Response) => {
    const usuario: Usuario = res.locals.usuario
    const { oldContrasena, newContrasena } = req.body

    if (!oldContrasena || !newContrasena) return res.status(400).send({
        statusCode: 400,
        data: null,
        message: RESPONSES.EMPTY_DATA
    });
    //Check if old password matchs
    if (!usuario.unencryptedPasswordValidate(oldContrasena)) return res.status(401).send({
        statusCode: 401,
        data: null,
        message: RESPONSES.PASSWORDS_NOT_MATCH
    })

    UsuarioRepository.update(usuario.id, { contrasena: hashSync(newContrasena, 8) })
        .then((data) => {
            return res.status(200).send({
                statusCode: 200,
                data: null,
                message: RESPONSES.SUCCESS_UPDATE_USER
            })
        })
        .catch((error) => {
            return res.status(500).send({
                statusCode: 500,
                data: error,
                message: RESPONSES.FAIL_UPDATE_USER
            })
        })
}