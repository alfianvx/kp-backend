import Joi from 'joi'
import { ServiceType } from '../types/service.type'

export const createServiceValidation = (payload: ServiceType) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    icon_url: Joi.string().required()
  })

  return schema.validate(payload)
}
