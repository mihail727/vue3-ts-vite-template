import type { NavigationGuardNext, RouteRecordNormalized } from 'vue-router';

/**
 * Функция-фабрика последовательно запускает цепочку Middleware
 */
export const middlewareFactory = (
	context: MiddlewareContext,
	middleware: Middleware[],
	index: number,
): NavigationGuardNext | Promise<NavigationGuardNext> => {
	const nextMiddleware = middleware[index];

	if (!nextMiddleware) {
		return context.next;
	}

	/* eslint-disable-next-line */
	// @ts-ignore
	return async (...ctx) => {
		if (ctx.length) {
			/* eslint-disable-next-line */
			// @ts-ignore
			context.next(...ctx);
		} else {
			const nextPipeline = await middlewareFactory(context, middleware, index + 1);
			await nextMiddleware({
				...context,
				next: nextPipeline,
			});
		}
	};
};

/**
 * Функция преобразующая meta.middleware в Middleware[]
 */
export function getMiddlewareList(mw?: Middleware | Middleware[]): Middleware[] {
	if (mw) return Array.isArray(mw) ? mw : [mw];
	else return [];
}

/**
 * Функция формирующая Middleware[] из to.matched
 */
export function getRouteMiddlewareListByMatched(matched: RouteRecordNormalized[]): Middleware[] {
	const arr = [];

	for (let i = 0; i < matched.length; i++) {
		const currentMiddlewares = matched[i]?.meta?.middleware;

		if (currentMiddlewares) {
			const currentMathcedMW = getMiddlewareList(currentMiddlewares);
			arr.push(...currentMathcedMW);
		}
	}

	return arr;
}

/**
 * Функция инициирующая запуск цепочки Middleware
 */
export async function launchMiddlewareSystem(context: MidlewareLaunchContext) {
	const selectedGlobalMiddlewares: Middleware[] = getMiddlewareList(context.globalMiddleware);
	const currentRouteMiddlewares: Middleware[] = getRouteMiddlewareListByMatched(
		context.to.matched,
	);

	const middleware: Middleware[] = [...selectedGlobalMiddlewares, ...currentRouteMiddlewares];
	const ctx: MiddlewareContext = {
		to: context.to,
		from: context.from,
		next: context.next,
	};

	if (middleware[0]) {
		return await middleware[0]({
			...ctx,
			next: await middlewareFactory(ctx, middleware, 1),
		});
	} else {
		return ctx.next();
	}
}
