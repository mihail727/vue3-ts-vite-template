import { defineMiddleware } from '@/hooks/macros';

export const layoutsMiddleware = defineMiddleware(async ({ to, next }) => {
	const { layoutName } = to.meta;
	const _layoutName = layoutName || 'default';

	const component = await import(`../../layouts/${_layoutName}.layout.vue`);
	to.meta.layoutComponent = component.default;

	return next();
});
