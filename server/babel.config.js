// babel.config.js
module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
	],
	ignore: [
		"./node_modules",
		"./public",
		"./babel.config.js"
	]
};