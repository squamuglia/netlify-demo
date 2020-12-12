module.exports = {
	plugins: [
		'postcss-import',
		'tailwindcss',
		'postcss-flexbugs-fixes',
		['postcss-preset-env', { stage: 0 }],
		'postcss-nested',
		'postcss-calc',
		'postcss-discard-comments',
		'postcss-reporter',
		'postcss-custom-media',
	],
};
