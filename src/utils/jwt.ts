import jwt from 'jsonwebtoken'
import CONFIG from '../config/environment'

export const signJWT = (payload: Object, options: jwt.SignOptions) => {
  if (!CONFIG.jwt_private) {
    throw new Error('JWT private key is not defined')
  }
  return jwt.sign(payload, CONFIG.jwt_private, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const verifyJWT = (token: string) => {
  try {
    if (!CONFIG.jwt_public) {
      throw new Error('JWT public key is not defined')
    }
    const decoded = jwt.verify(token, CONFIG.jwt_public, { algorithms: ['RS256'] })
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    }
  }
}
