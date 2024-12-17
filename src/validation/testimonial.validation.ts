import Joi from 'joi'
import { TestimonialType } from '../types/testimonial.type'

export const createTestimoniallValidation = (payload: TestimonialType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    profession: Joi.string().required(),
    avatar_url: Joi.string().required(),
    message: Joi.string().required(),
    is_featured: Joi.boolean().required()
  })

  return schema.validate(payload)
}
