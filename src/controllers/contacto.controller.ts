// src/controllers/ContactoController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/db.config";
import { RESPONSES } from "../resources/constants";
import { Contacto } from "../entity/contacto.entity";
import { PrestadorDeServicio } from "../entity/prestador.entity";

const ContactoRepository = AppDataSource.getRepository(Contacto);
const PrestadorDeServicioRepository = AppDataSource.getRepository(PrestadorDeServicio)

type ContactoInput = {
  prestadorId: number;
  descripcion: string;
  tipo: string;
  url?: string;
};

export const createContacto = (req: Request, res: Response) => {
    const prestadorId = +req.params.prestadorId;
    const values: ContactoInput = req.body;
  
    // Check if the associated PrestadorDeServicio exists
    PrestadorDeServicioRepository.find({ where: { id: prestadorId } })
      .then((prestadorDeServicio) => {
        if (!prestadorDeServicio || prestadorDeServicio.length === 0) {
          return res.status(404).send({
            statusCode: 404,
            data: null,
            message: RESPONSES.PRESTADOR_NOT_FOUND,
          });
        }
  
        const newContacto = ContactoRepository.create({
          ...values,
          prestadorId,
        });
  
        ContactoRepository.save(newContacto)
          .then((contacto) => {
            return res.status(201).send({
              statusCode: 201,
              data: contacto,
              message: RESPONSES.SUCCESS_REGISTER_CONTACTO,
            });
          })
          .catch((error) => {
            return res.status(500).send({
              statusCode: 500,
              error: error.message,
              message: RESPONSES.FAIL_REGISTER_CONTACTO,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({
          statusCode: 500,
          error: error.message,
          message: RESPONSES.FAIL_REGISTER_CONTACTO,
        });
      });
  };
  
  export const updateContacto = (req: Request, res: Response) => {
    const prestadorId = +req.params.prestadorId;
    const contactoId = +req.params.contactoId; // Assuming you have the contactoId in the route parameter
    const values: ContactoInput = req.body;
  
    // Check if the associated PrestadorDeServicio exists
    PrestadorDeServicioRepository.find({ where: { id: prestadorId } })
      .then((prestadorDeServicio) => {
        if (!prestadorDeServicio || prestadorDeServicio.length === 0) {
          return res.status(404).send({
            statusCode: 404,
            data: null,
            message: RESPONSES.PRESTADOR_NOT_FOUND,
          });
        }
  
        // Check if the Contacto with the provided ID exists and belongs to the specified PrestadorDeServicio
        ContactoRepository.findOne({ where: { id: contactoId, prestadorId } })
          .then((contacto) => {
            if (!contacto) {
              return res.status(404).send({
                statusCode: 404,
                data: null,
                message: RESPONSES.CONTACTO_NOT_FOUND,
              });
            }
  
            // Update the Contacto entity with the provided values
            ContactoRepository.merge(contacto, values);
  
            ContactoRepository.save(contacto)
              .then((updatedContacto) => {
                return res.status(200).send({
                  statusCode: 200,
                  data: updatedContacto,
                  message: RESPONSES.SUCCESS_UPDATE_CONTACTO,
                });
              })
              .catch((error) => {
                return res.status(500).send({
                  statusCode: 500,
                  error: error.message,
                  message: RESPONSES.FAIL_UPDATE_CONTACTO,
                });
              });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).send({
              statusCode: 500,
              error: error.message,
              message: RESPONSES.FAIL_UPDATE_CONTACTO,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({
          statusCode: 500,
          error: error.message,
          message: RESPONSES.FAIL_UPDATE_CONTACTO,
        });
      });
  };
  
  export const findOneContacto = (req: Request, res: Response) => {
    const prestadorId = +req.params.prestadorId;
    const contactoId = +req.params.contactoId; // Assuming you have the contactoId in the route parameter
  
    // Check if the associated PrestadorDeServicio exists
    PrestadorDeServicioRepository.find({ where: { id: prestadorId } })
      .then((prestadorDeServicio) => {
        if (!prestadorDeServicio || prestadorDeServicio.length === 0) {
          return res.status(404).send({
            statusCode: 404,
            data: null,
            message: RESPONSES.PRESTADOR_NOT_FOUND,
          });
        }
  
        // Find the Contacto with the provided ID that belongs to the specified PrestadorDeServicio
        ContactoRepository.findOne({ where: { id: contactoId, prestadorId } })
          .then((contacto) => {
            if (!contacto) {
              return res.status(404).send({
                statusCode: 404,
                data: null,
                message: RESPONSES.CONTACTO_NOT_FOUND,
              });
            }
  
            return res.status(200).send({
              statusCode: 200,
              data: contacto,
              message: RESPONSES.CONTACTO_FOUND,
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).send({
              statusCode: 500,
              error: error.message,
              message: RESPONSES.CONTACTO_NOT_FOUND,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({
          statusCode: 500,
          error: error.message,
          message: RESPONSES.CONTACTO_NOT_FOUND,
        });
      });
  };
  export const findAllContactos = (req: Request, res: Response) => {
    const prestadorId = +req.params.prestadorId;
  
    // Check if the associated PrestadorDeServicio exists
    PrestadorDeServicioRepository.find({ where: { id: prestadorId } })
      .then((prestadorDeServicio) => {
        if (!prestadorDeServicio || prestadorDeServicio.length === 0) {
          return res.status(404).send({
            statusCode: 404,
            data: null,
            message: RESPONSES.PRESTADOR_NOT_FOUND,
          });
        }
  
        // Find all Contactos that belong to the specified PrestadorDeServicio
        ContactoRepository.find({ where: { prestadorId } })
          .then((contactos) => {
            if (!contactos || contactos.length === 0) {
              return res.status(404).send({
                statusCode: 404,
                data: null,
                message: RESPONSES.CONTACTOS_NOT_FOUND,
              });
            }
  
            return res.status(200).send({
              statusCode: 200,
              data: contactos,
              message: RESPONSES.CONTACTOS_FOUND,
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).send({
              statusCode: 500,
              error: error.message,
              message: RESPONSES.CONTACTOS_NOT_FOUND,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({
          statusCode: 500,
          error: error.message,
          message: RESPONSES.CONTACTOS_NOT_FOUND,
        });
      });
  };
  export const deleteContacto = (req: Request, res: Response) => {
    const prestadorId = +req.params.prestadorId;
    const contactoId = +req.params.contactoId; // Assuming you have the contactoId in the route parameter
  
    // Check if the associated PrestadorDeServicio exists
    PrestadorDeServicioRepository.find({ where: { id: prestadorId } })
      .then((prestadorDeServicio) => {
        if (!prestadorDeServicio || prestadorDeServicio.length === 0) {
          return res.status(404).send({
            statusCode: 404,
            data: null,
            message: RESPONSES.PRESTADOR_NOT_FOUND,
          });
        }
  
        // Find the Contacto with the provided ID that belongs to the specified PrestadorDeServicio
        ContactoRepository.findOne({ where: { id: contactoId, prestadorId } })
          .then((contacto) => {
            if (!contacto) {
              return res.status(404).send({
                statusCode: 404,
                data: null,
                message: RESPONSES.CONTACTO_NOT_FOUND,
              });
            }
  
            ContactoRepository.softRemove(contacto)
              .then(() => {
                return res.status(200).send({
                  statusCode: 200,
                  data: null,
                  message: RESPONSES.SUCCESS_DELETE_CONTACTO,
                });
              })
              .catch((error) => {
                return res.status(500).send({
                  statusCode: 500,
                  error: error.message,
                  message: RESPONSES.FAIL_DELETE_CONTACTO,
                });
              });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).send({
              statusCode: 500,
              error: error.message,
              message: RESPONSES.FAIL_DELETE_CONTACTO,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({
          statusCode: 500,
          error: error.message,
          message: RESPONSES.FAIL_DELETE_CONTACTO,
        });
      });
  };
  
