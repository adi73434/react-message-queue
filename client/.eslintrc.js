module.exports = {

	"env": {
		"es2021": true,
		"browser": true,
	},

	"extends": [
		// I don't know if eslint-recommended or recommended should come first
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:react/recommended",
		"google",
		// My settings file, used for both JS (here) and TS (down below)
		"../.eslint-global-config.js",
	],

	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
		},
		"ecmaVersion": 2021,
		"sourceType": "module",
		// "tsconfigRootDir": __dirname,
		// "project": "tsconfig.json",
	},

	"plugins": [
		"react",
	],

	"globals": {
	},

	"settings": {
		"react": {
			"version": "detect",
		},
	},


	// -------------------------------------------------------------------------
	// SECTION TypeScript specific
	// -------------------------------------------------------------------------
	"overrides": [
		{
			// Target only TypeScript files
			"files": [
				"**/*.ts",
				"**/*.tsx",
			],
			"extends": [
				// I don't know if eslint-recommended or recommended should come first
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/eslint-recommended",
				"plugin:react/recommended",
				"google",
				// My settings file, used for both JS (here) and TS (down below)
				"../.eslint-global-config.js",
			],
			"parser": "@typescript-eslint/parser",
			"parserOptions": {
				// "project": "./tsconfig.json",
			},
			"plugins": [
				"react",
				"@typescript-eslint",
			],
			"rules": {
				// Allow the use of ts-ignore for one liners
				// "@typescript-eslint/ban-ts-ignore": "off",
			},
		},
	],
	// -------------------------------------------------------------------------
	// !SECTION TypeScript specific
	// -------------------------------------------------------------------------
};
