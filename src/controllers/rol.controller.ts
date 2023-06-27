import { AppDataSource } from '../config/db.config'
import { Request, Response, NextFunction } from 'express'
import { Rol } from '../entity/rol.entity'
import { Permiso } from '../entity/permiso.entity'
import { RESPONSES } from '../resources/constants'

const RolRepository = AppDataSource.getRepository(Rol)
const PermisoRepository = AppDataSource.getRepository(Permiso)

type RolInput = {
    id?: number
    nombre: string
    descripcion: string
    permisos?: number[]
}

export const create = async (req: Request, res: Response) => {
    const values: RolInput = req.body
    if (!values.nombre || !values.descripcion || !values.permisos.length) return res.status(400).send({
        statusCode: 400,
        data: null,
        message: RESPONSES.INCOMPLETE_DATA_ROL
    })

    const permisos = await PermisoRepository.find({
        where: values.permisos.map(item => { return { id: item }})
    })

    const rol = { ...values, permisos }
    
    RolRepository.save(rol)
        .then(data => {
            return res.status(200).send({
                statusCode: 200,
                data: data,
                message: RESPONSES.SUCCESS_CREATE_ROL
            })

        })
        .catch(error => {
            return res.status(500).send({
                statusCode: 500,
                error: error,
                message: RESPONSES.FAIL_CREATE_ROL
            })
        })
}

export const update = async (req: Request, res: Response) => {
    const id = +req.params.id
    const values: RolInput = req.body

    RolRepository.findBy({ id })
        .then(data => {
            if (!data) return res.status(404).send({
                statusCode: 404,
                data: data,
                message: RESPONSES.ROL_NOT_FOUND
            })
        })
        .catch(error => {
            return res.status(500).send({
                statusCode: 500,
                error: error,
                message: RESPONSES.FAIL_UPDATE_ROL
            })
        })

    if (!values.nombre || !values.descripcion) return res.status(400).send({
        statusCode: 400,
        data: null,
        message: RESPONSES.INCOMPLETE_DATA_ROL
    })

    const permisos = values.permisos.length && await PermisoRepository.find({
        where: values.permisos.map(item => { return { id: item }})
    })

    const rol = { ...values, permisos }
    
    RolRepository.update(id, rol)
        .then(data => {
            return res.status(200).send({
                statusCode: 200,
                data: data,
                message: RESPONSES.SUCCESS_UPDATE_ROL
            })

        })
        .catch(error => {
            return res.status(500).send({
                statusCode: 500,
                error: error,
                message: RESPONSES.FAIL_UPDATE_ROL
            })
        })
}

export const findOne = (req: Request, res: Response) => {
    const id = +req.params.id
    RolRepository.findOneBy({ id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    statusCode: 404,
                    data: null,
                    message: RESPONSES.ROL_NOT_FOUND
                })
            }
            return res.status(200).send({
                statusCode: 200,
                data: data,
                message: RESPONSES.ROL_FOUND
            })

        })
        .catch(error => {
            return res.status(500).send({
                statusCode: 500,
                error: error,
                message: RESPONSES.ROL_NOT_FOUND
            })
        })
}

export const findAll = (req: Request, res: Response) => {
    RolRepository.find()
        .then(data => {
            if (!data || !data.length) {
                return res.status(404).send({
                    statusCode: 404,
                    data: null,
                    message: RESPONSES.ROL_NOT_FOUND
                })
            }
            return res.status(200).send({
                statusCode: 200,
                data: data,
                message: RESPONSES.ROL_FOUND
            })

        })
        .catch(error => {
            return res.status(500).send({
                statusCode: 500,
                error: error,
                message: RESPONSES.ROL_NOT_FOUND
            })
        })
}