import jwt from 'jsonwebtoken';
export const secretKey = 'S4Jj69qe$@rJ21Kl'

export const generateJWT = (payload: any): string => jwt.sign(payload, secretKey)

export const generateJWTExpire = (payload: any, expires = '30d'): string => jwt.sign(payload, secretKey, { expiresIn: expires })