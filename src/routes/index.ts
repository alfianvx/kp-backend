import { Application, Router } from 'express'
import { HealtRouter } from './health.route'
import { ProductRouter } from './product.route'
import { AuthRoute } from './auth.route'
import { FaqRouter } from './faq.route'
import { ClientRouter } from './client.route'
import { TestimonialRouter } from './testimonial.route'
import { ServiceRouter } from './service.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealtRouter],
  ['/product', ProductRouter],
  ['/auth', AuthRoute],
  ['/faq', FaqRouter],
  ['/client', ClientRouter],
  ['/testimonial', TestimonialRouter],
  ['/service', ServiceRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
