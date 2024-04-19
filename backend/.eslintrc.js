module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'unicorn'
	],
	'rules': {
		'linebreak-style': ['off'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'comma-dangle': ['error', 'never'],
		'@typescript-eslint/no-non-null-assertion': ['off'],
		'@typescript-eslint/no-var-requires': ['off'],
		'@typescript-eslint/no-explicit-any': ['off'],
		'@typescript-eslint/no-empty-function': ['off'],
		'@typescript-eslint/no-namespace': 'off',
		'no-empty': ['off'],
		'unicorn/numeric-separators-style': ['error', {
			'onlyIfContainsSeparator': false,
			'number': {
				'minimumDigits': 5,
				'groupLength': 3
			}
		}]
	}
};