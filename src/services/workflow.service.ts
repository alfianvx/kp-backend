import { WorkflowType } from '../types/workflow.type'
import { prisma } from '.'

export const getWorkflowsHanlder = async () => {
  return await prisma.workflow.findMany()
}

export const getWorkflowByIdHandler = async (id: string) => {
  return await prisma.workflow.findUnique({ where: { id } })
}

export const createWorkflowHandler = async (data: WorkflowType) => {
  return await prisma.workflow.create({ data })
}

export const updateWorkflowHandler = async (id: string, data: WorkflowType) => {
  return await prisma.workflow.update({ where: { id }, data })
}

export const deleteWorkflowHandler = async (id: string) => {
  return await prisma.workflow.delete({ where: { id } })
}

export const deleteAllWorkflowsHandler = async () => {
  return await prisma.service.deleteMany()
}
