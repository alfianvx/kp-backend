import Joi from 'joi'
import { PricingType } from '../types/pricing.type'

export const createPricingValidation = (payload: PricingType) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    offer: Joi.array().items(Joi.string()).required()
  })

  return schema.validate(payload)
}
