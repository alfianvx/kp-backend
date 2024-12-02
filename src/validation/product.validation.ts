import Joi from 'joi'
import { ProductType } from '../types/product.type'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    short_description: Joi.string().required(),
    slug: Joi.string(),
    logo_url: Joi.string(),
    thumbnail_url: Joi.string(),
    description: Joi.string().required()
  })

  return schema.validate(payload)
}
