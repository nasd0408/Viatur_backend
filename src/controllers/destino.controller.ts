import { Request, Response } from "express";
import { AppDataSource } from '../config/db.config';
import { Destino } from '../entity/destino.entity';
import { RESPONSES } from '../resources/constants';

const DestinoRepository = AppDataSource.getRepository(Destino);

// Get all Destinos
export const getAllDestinos = (req: Request, res: Response) => {
    DestinoRepository.find()
      .then(destinos => {
        if (!destinos || destinos.length === 0) {
          return res.status(404).send({
            statusCode: 404,
            data: null,
            message: RESPONSES.DESTINOS_NOT_FOUND,
          });
        }
  
        return res.status(200).send({
          statusCode: 200,
          data: destinos,
          message: RESPONSES.DESTINOS_FOUND,
        });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send({
          statusCode: 500,
          error: error,
          message: RESPONSES.DESTINOS_NOT_FOUND,
        });
      });
  };
  

// Get a single Destino by ID
export const getDestinoById = (req: Request, res: Response) => {
  const id = +req.params.id;

  DestinoRepository.findBy({ id })
    .then(destino => {
      if (!destino) {
        return res.status(404).send({
          statusCode: 404,
          data: null,
          message: RESPONSES.DESTINO_NOT_FOUND,
        });
      }
      return res.status(200).send({
        statusCode: 200,
        data: destino,
        message: RESPONSES.DESTINO_FOUND,
      });
    })
    .catch(error => {
      return res.status(500).send({
        statusCode: 500,
        error: error,
        message: RESPONSES.DESTINO_NOT_FOUND,
      });
    });
};

// Create a new Destino
export const createDestino = (req: Request, res: Response) => {
  const values: Destino = req.body;

  if (!values.nombre || !values.ciudad || !values.municipio || !values.estado || !values.dirección) {
    return res.status(400).send({
      statusCode: 400,
      data: null,
      message: RESPONSES.EMPTY_DATA,
    });
  }

  DestinoRepository.save(values)
    .then(destino => {
      return res.status(200).send({
        statusCode: 200,
        data: destino,
        message: RESPONSES.SUCCESS_REGISTER_DESTINO,
      });
    })
    .catch(error => {
      return res.status(500).send({
        statusCode: 500,
        error: error,
        message: RESPONSES.FAIL_REGISTER_DESTINO,
      });
    });
};
export const updateDestino = (req: Request, res: Response) => {
    const id = +req.params.id;
    const values: Destino = req.body;
  
    DestinoRepository.findBy({ id })
      .then(destino => {
        if (!destino) {
          return res.status(404).send({
            statusCode: 404,
            data: null,
            message: RESPONSES.DESTINO_NOT_FOUND,
          });
        }
  
        DestinoRepository.update(id, values)
          .then(() => {
            return res.status(200).send({
              statusCode: 200,
              data: null,
              message: RESPONSES.SUCCESS_UPDATE_DESTINO,
            });
          })
          .catch(error => {
            return res.status(500).send({
              statusCode: 500,
              error: error,
              message: RESPONSES.FAIL_UPDATE_DESTINO,
            });
          });
      })
      .catch(error => {
        return res.status(500).send({
          statusCode: 500,
          error: error,
          message: RESPONSES.FAIL_UPDATE_DESTINO,
        });
      });
  };
  
  
// Delete a Destino by ID
export const deleteDestino = (req: Request, res: Response) => {
  const id = +req.params.id;

  DestinoRepository.findBy({ id })
    .then(destino => {
      if (!destino) {
        return res.status(404).send({
          statusCode: 404,
          data: null,
          message: RESPONSES.DESTINO_NOT_FOUND,
        });
      }

      DestinoRepository.softRemove(destino)
        .then(() => {
          return res.status(200).send({
            statusCode: 200,
            data: null,
            message: RESPONSES.SUCCESS_DELETE_DESTINO,
          });
        })
        .catch(error => {
          return res.status(500).send({
            statusCode: 500,
            error: error,
            message: RESPONSES.FAIL_DELETE_DESTINO,
          });
        });
    })
    .catch(error => {
      return res.status(500).send({
        statusCode: 500,
        error: error,
        message: RESPONSES.FAIL_DELETE_DESTINO,
      });
    });
};
