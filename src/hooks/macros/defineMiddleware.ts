export const defineMiddleware = (middleware: (context: MiddlewareContext) => void) =>
	middleware as Middleware;