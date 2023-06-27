import { AppDataSource } from '../config/db.config'
import { Request, Response, NextFunction } from 'express'
import { Usuario } from '../entity/usuario.entity'
import { Rol } from '../entity/rol.entity'
import { RESPONSES } from '../resources/constants'

const UsuarioRepository = AppDataSource.getRepository(Usuario)
const RolRepository = AppDataSource.getRepository(Rol)

type UsuarioInput = {
    id?: number
    nombre: string
    email: string
    contrasena: string
    estado?: string
    rol: number
}

export const create = async (req: Request, res: Response) => {
    const values: UsuarioInput = req.body
    if (!values.nombre || !values.email || !values.contrasena || !values.rol) return res.status(400).send({
        statusCode: 400,
        data: null,
        message: RESPONSES.EMPTY_DATA
    })

    const existUser = await UsuarioRepository.findOneBy({ email: values.email })

    if (existUser) return res.status(404).send({
        statusCode: 404,
        data: null,
        message: RESPONSES.ALREADY_REGISTERED
    })
    const rol = await RolRepository.findOneBy({ id: +values.rol })

    UsuarioRepository.save({ ...values, rol })
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

export const update = async (req: Request, res: Response) => {
    const id = +req.params.id
    const values: UsuarioInput = req.body

    UsuarioRepository.findBy({ id })
        .then(data => {
            if (!data) return res.status(404).send({
                statusCode: 404,
                data: data,
                message: RESPONSES.USER_NOT_FOUND
            })
        })
        .catch(error => {
            return res.status(500).send({
                statusCode: 500,
                error: error,
                message: RESPONSES.FAIL_UPDATE_USER
            })
        })

    const rol = values.rol && await RolRepository.findOneBy({ id: +values.rol })

    UsuarioRepository.update(id, { ...values, rol })
        .then(data => {
            return res.status(200).send({
                statusCode: 200,
                data: data,
                message: RESPONSES.SUCCESS_UPDATE_USER
            })

        })
        .catch(error => {
            return res.status(500).send({
                statusCode: 500,
                error: error,
                message: RESPONSES.FAIL_UPDATE_USER
            })
        })
}

export const findOne = (req: Request, res: Response) => {
    const id = +req.params.id
    UsuarioRepository.findOneBy({ id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    statusCode: 404,
                    data: null,
                    message: RESPONSES.USER_NOT_FOUND
                })
            }
            return res.status(200).send({
                statusCode: 200,
                data: data,
                message: RESPONSES.USERS_FOUND
            })

        })
        .catch(error => {
            return res.status(500).send({
                statusCode: 500,
                error: error,
                message: RESPONSES
            })
        })
}

export const findAll = (request: Request, response: Response) => {
    UsuarioRepository.find()
        .then(data => {
            if (data || data.length) {
                return response.status(404).send({
                    success: true,
                    statusCode: 404,
                    data: null,
                    message: RESPONSES.USERS_NOT_FOUND
                })
            }
            return response.status(200).send({
                success: true,
                statusCode: 200,
                data: data,
                message: RESPONSES.USERS_FOUND
            })

        })
        .catch(async error => {
            console.log(error)
            return response.status(500).send({
                success: false,
                statusCode: 500,
                error: error,
                message: RESPONSES.USERS_NOT_FOUND
            })
        })
}