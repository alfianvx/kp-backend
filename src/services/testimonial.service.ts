import { prisma } from '.'
import { TestimonialType } from '../types/testimonial.type'

export const getTestimonialsHanlder = async () => {
  return await prisma.testimonial.findMany()
}

export const getTestimonialByIdHandler = async (id: string) => {
  return await prisma.testimonial.findUnique({ where: { id } })
}

export const createTestimonialHandler = async (data: TestimonialType) => {
  return await prisma.testimonial.create({ data })
}

export const updateTestimonialHandler = async (id: string, data: TestimonialType) => {
  return await prisma.testimonial.update({ where: { id }, data })
}

export const deleteTestimonialHandler = async (id: string) => {
  return await prisma.testimonial.delete({ where: { id } })
}

export const deleteAllTestimonialsHandler = async () => {
  return await prisma.testimonial.deleteMany()
}
