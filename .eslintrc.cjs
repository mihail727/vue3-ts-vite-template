module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript/recommended',
	],
	plugins: ['import'],
	rules: {
		'no-console': [
			process.env.NODE_ENV === 'production' ? 'error' : 'warn',
			{ allow: ['warn', 'error', 'info'] },
		],
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/component-definition-name-casing': ['error', 'PascalCase'],
		'brace-style': 'warn',
		'object-property-newline': 'warn',
		'comma-dangle': ['error', 'always-multiline'],
		'object-curly-spacing': ['error', 'always'],
		'vue/multi-word-component-names': [0],
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
				disallowTypeAnnotations: false,
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',
		eqeqeq: ['error', 'always'],
		'import/newline-after-import': 'warn',
		'newline-before-return': 'warn',
		'no-unused-vars': 'off',
	},
};
