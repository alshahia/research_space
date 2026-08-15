import {
  defineMiddlewares,
  type MedusaRequest,
  type MedusaResponse,
  type MedusaNextFunction,
} from "@medusajs/framework/http"

/**
 * Global middlewares for the Medusa 2 backend.
 * CORS is also handled in medusa-config.ts (projectConfig.http.storeCors); this
 * middleware adds headers the framework doesn't cover (e.g. cache-control).
 *
 * defineMiddlewares takes either Route[] or { routes?, errorHandler? }.
 * The single route here applies the header to every request.
 */
export default defineMiddlewares({
  routes: [
    {
      matcher: "/**",
      middlewares: [
        (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
          void req
          res.setHeader("Cache-Control", "no-store, max-age=0")
          next()
        },
      ],
    },
  ],
})
