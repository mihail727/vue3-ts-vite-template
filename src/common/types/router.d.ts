import type {
	RouteLocationNormalized,
	RouteLocationNormalized,
	NavigationGuardNext,
} from 'vue-router';

declare global {
	type MidlewareLaunchContext = [
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext,
	];

	type MiddlewareContext = {
		to: MidlewareLaunchContext[0];
		from: MidlewareLaunchContext[1];
		next: MidlewareLaunchContext[2];
	};

	type Middleware = (context: MiddlewareContext) => void | Promise<void>;
}
