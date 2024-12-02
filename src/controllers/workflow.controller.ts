import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { WorkflowParams } from '../types/workflow.type'
import {
  createWorkflowHandler,
  deleteAllWorkflowsHandler,
  deleteWorkflowHandler,
  getWorkflowByIdHandler,
  getWorkflowsHanlder,
  updateWorkflowHandler
} from '../services/workflow.service'
import { createWorkflowValidation } from '../validation/workflow.validation'

export const getWorkflow = async (req: Request<WorkflowParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const workflow = await getWorkflowByIdHandler(id)
      if (!workflow) {
        logger.error('ERR: get - workflow', 'Workflow not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Workflow not found'
        })
        return
      }

      logger.info('get workflow data successfully')
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success get workflow by id',
        data: workflow
      })
      return
    }

    const workflows = await getWorkflowsHanlder()
    logger.info('get workflows data successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: workflows.length === 0 ? 'Workflow data is empty' : 'Success get workflow data',
      data: workflows
    })
  } catch (error) {
    logger.error('ERR: get - service', error)
    next(error)
  }
}

export const createWorkflow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = createWorkflowValidation(req.body)
    if (error) {
      logger.error('ERR: create - workflow', error.details[0].message)
      res.status(422).json({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      })
      return
    }

    const workflow = await createWorkflowHandler(value)
    logger.info('create workflow successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Create workflow successfully',
      data: workflow
    })
  } catch (error) {
    logger.error('ERR: create - workflow', error)
    next(error)
  }
}

export const updateWorkflow = async (
  req: Request<WorkflowParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const workflow = await getWorkflowByIdHandler(id)
      if (!workflow) {
        logger.error('ERR: get - workflow', 'Workflow not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Workflow not found'
        })
        return
      }
    }

    const updatedWorkflow = await updateWorkflowHandler(id!, req.body)
    logger.info('workflow updated successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Workflow updated successfully',
      data: updatedWorkflow
    })
  } catch (error) {
    logger.error('ERR: update - workflow', error)
    next(error)
  }
}

export const deleteWorkflow = async (
  req: Request<WorkflowParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const workflow = await getWorkflowByIdHandler(id)
      if (!workflow) {
        logger.error('ERR: get - workflow', 'Workflow not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Workflow not found'
        })
        return
      }
    }

    await deleteWorkflowHandler(id!)
    logger.info('workflow deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Workflow deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - workflow', error)
    next(error)
  }
}

export const deleteAllWorkflow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteAllWorkflowsHandler()
    logger.info('all workflows deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'All workflows deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - workflows', error)
    next(error)
  }
}
