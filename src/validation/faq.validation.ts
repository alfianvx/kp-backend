import Joi from 'joi'
import { FaqType } from '../types/faq.type'

export const createFaqValidation = (payload: FaqType) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required()
  })

  return schema.validate(payload)
}
