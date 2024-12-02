import Joi from 'joi'
import { WorkflowType } from '../types/workflow.type'

export const createWorkflowValidation = (payload: WorkflowType) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    icon_url: Joi.string().required()
  })

  return schema.validate(payload)
}
