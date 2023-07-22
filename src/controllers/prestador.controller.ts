import { Request, Response } from 'express';
import { AppDataSource } from '../config/db.config';
import { RESPONSES } from '../resources/constants';
import { PrestadorDeServicio } from '../entity/prestador.entity';

const PrestadorDeServicioRepository = AppDataSource.getRepository(PrestadorDeServicio);

type PrestadorDeServicioInput = {
  id?: number;
  nombre: string;
  direccion: string;
  telefono: string;
  estado: string;
};

export const createPrestadorDeServicio = (req: Request, res: Response) => {
  const values: PrestadorDeServicioInput = req.body;

  if (!values.nombre || !values.direccion || !values.telefono || !values.estado) {
    return res.status(400).send({
      statusCode: 400,
      data: null,
      message: RESPONSES.EMPTY_DATA,
    });
  }

  PrestadorDeServicioRepository.save(values)
    .then(prestadorDeServicio => {
      return res.status(200).send({
        statusCode: 200,
        data: prestadorDeServicio,
        message: RESPONSES.SUCCESS_REGISTER,
      });
    })
    .catch(error => {
      return res.status(500).send({
        statusCode: 500,
        error: error,
        message: "what",
      });
    });
};

export const updatePrestadorDeServicio = (req: Request, res: Response) => {
  const id = +req.params.id;
  const values: PrestadorDeServicioInput = req.body;

  PrestadorDeServicioRepository.findBy({id})
    .then(prestadorDeServicio => {
      if (!prestadorDeServicio) {
        return res.status(404).send({
          statusCode: 404,
          data: null,
          message: RESPONSES.USER_NOT_FOUND,
        });
      }

      PrestadorDeServicioRepository.update(id, values)
        .then(() => {
          return res.status(200).send({
            statusCode: 200,
            data: null,
            message: RESPONSES.SUCCESS_UPDATE_USER,
          });
        })
        .catch(error => {
          return res.status(500).send({
            statusCode: 500,
            error: error,
            message: RESPONSES.FAIL_UPDATE_USER,
          });
        });
    })
    .catch(error => {
      return res.status(500).send({
        statusCode: 500,
        error: error,
        message: RESPONSES.FAIL_UPDATE_USER,
      });
    });
};

export const findOnePrestadorDeServicio = (req: Request, res: Response) => {
  const id = +req.params.id;

  PrestadorDeServicioRepository.findBy({id})
    .then(prestadorDeServicio => {
      if (!prestadorDeServicio) {
        return res.status(404).send({
          statusCode: 404,
          data: null,
          message: RESPONSES.USER_NOT_FOUND,
        });
      }
      return res.status(200).send({
        statusCode: 200,
        data: prestadorDeServicio,
        message: RESPONSES.USERS_FOUND,
      });
    })
    .catch(error => {
      return res.status(500).send({
        statusCode: 500,
        error: error,
        message: RESPONSES.USERS_NOT_FOUND,
      });
    });
};

export const findAllPrestadoresDeServicio = (request: Request, response: Response) => {
  PrestadorDeServicioRepository.find()
    .then(prestadoresDeServicio => {
      if (!prestadoresDeServicio || prestadoresDeServicio.length === 0) {
        return response.status(404).send({
          success: true,
          statusCode: 404,
          data: null,
          message: RESPONSES.USERS_NOT_FOUND,
        });
      }
      return response.status(200).send({
        success: true,
        statusCode: 200,
        data: prestadoresDeServicio,
        message: RESPONSES.USERS_FOUND,
      });
    })
    .catch(error => {
      console.log(error);
      return response.status(500).send({
        success: false,
        statusCode: 500,
        error: error,
        message: RESPONSES.USERS_NOT_FOUND,
      });
    });
};

export const deletePrestadorDeServicio = (req: Request, res: Response) => {
    const id = +req.params.id;
  
    PrestadorDeServicioRepository.findBy({id})
      .then(prestadorDeServicio => {
        if (!prestadorDeServicio) {
          return res.status(404).send({
            statusCode: 404,
            data: null,
            message: RESPONSES.USER_NOT_FOUND,
          });
        }
  
        PrestadorDeServicioRepository.softRemove(prestadorDeServicio)
          .then(() => {
            return res.status(200).send({
              statusCode: 200,
              data: null,
              message: RESPONSES.SUCCESS_DELETE_ROL,
            });
          })
          .catch(error => {
            return res.status(500).send({
              statusCode: 500,
              error: error,
              message: RESPONSES.FAIL_DELETE_ROL,
            });
          });
      })
      .catch(error => {
        return res.status(500).send({
          statusCode: 500,
          error: error,
          message: RESPONSES.FAIL_DELETE_ROL,
        });
      });
  };