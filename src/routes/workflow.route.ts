import { Router } from 'express'
import { requireAdmin } from '../middleware/auth'
import {
  createWorkflow,
  deleteAllWorkflow,
  deleteWorkflow,
  getWorkflow,
  updateWorkflow
} from '../controllers/workflow.controller'

export const WorkflowRouter: Router = Router()

WorkflowRouter.get('/', getWorkflow)
WorkflowRouter.get('/:id', requireAdmin, getWorkflow)
WorkflowRouter.post('/', requireAdmin, createWorkflow)
WorkflowRouter.put('/:id', requireAdmin, updateWorkflow)
WorkflowRouter.delete('/all', requireAdmin, deleteAllWorkflow)
WorkflowRouter.delete('/:id', requireAdmin, deleteWorkflow)
