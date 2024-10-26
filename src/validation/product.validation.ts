import Joi from 'joi'
import { ProductType } from '../type/product.type'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
  })

  return schema.validate(payload)
}
