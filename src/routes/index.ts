import { Application, Router } from 'express'
import { HealtRouter } from './health.route'
import { ProductRouter } from './product.route'
import { AuthRoute } from './auth.route'
import { FaqRouter } from './faq.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealtRouter],
  ['/product', ProductRouter],
  ['/auth', AuthRoute],
  ['/faq', FaqRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
