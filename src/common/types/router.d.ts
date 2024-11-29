import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import type { Component } from 'vue';

declare global {
	interface MiddlewareContext {
		to: RouteLocationNormalized;
		from: RouteLocationNormalized;
		next: NavigationGuardNext;
	}

	interface MidlewareLaunchContext extends MiddlewareContext {
		globalMiddleware?: Middleware[];
	}

	type Middleware = (context: MiddlewareContext) => void | Promise<void>;
}

declare module 'vue-router' {
	interface RouterOptions {
		globalMiddleware?: Middleware[];
	}

	interface RouteMeta {
		layoutName?: string;
		layoutComponent?: Component;
		middleware?: Middleware | Middleware[];
	}
}
