import { launchMiddlewareSystem } from '@/router/middleware-system';
import type { App } from 'vue';

export const middlewareFactoryPlugin = {
	install: (app: App) => {
		const router = app.config.globalProperties.$router;
		const globalMiddleware = router.options.globalMiddleware;

		router.beforeEach((to, from, next) =>
			launchMiddlewareSystem({
				to,
				from,
				next,
				globalMiddleware,
			}),
		);
	},
};
