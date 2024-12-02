import { Application, Router } from 'express'
import { HealtRouter } from './health.route'
import { ProductRouter } from './product.route'
import { AuthRoute } from './auth.route'
import { FaqRouter } from './faq.route'
import { ClientRouter } from './client.route'
import { TestimonialRouter } from './testimonial.route'
import { ServiceRouter } from './service.route'
import { PortofolioRouter } from './portofolio.route'
import { WorkflowRouter } from './workflow.route'
import { PricingRouter } from './pricing.route'
import { UserRoute } from './user.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealtRouter],
  ['/user', UserRoute],
  ['/product', ProductRouter],
  ['/auth', AuthRoute],
  ['/faq', FaqRouter],
  ['/client', ClientRouter],
  ['/testimonial', TestimonialRouter],
  ['/service', ServiceRouter],
  ['/portofolio', PortofolioRouter],
  ['/workflow', WorkflowRouter],
  ['/pricing', PricingRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
