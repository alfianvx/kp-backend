import Joi from 'joi'
import { ClientType } from '../type/client.type'

export const createClientValidation = (payload: ClientType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    logo_url: Joi.string().required()
  })

  return schema.validate(payload)
}
