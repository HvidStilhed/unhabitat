const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const templatesDir = path.resolve(__dirname, 'src/templates');
const pugFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('.pug'));

const htmlPlugins = pugFiles.map(file => {
	return new HtmlWebpackPlugin({
		template: path.join(templatesDir, file),
		filename: file.replace('.pug', '.html')
	});
});

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: ['pug-loader']
			},
			{
				test: /\.json$/,
				type: 'javascript/auto',
				use: 'json-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		...htmlPlugins,
		new MiniCssExtractPlugin({
			filename: 'styles.css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src',
					to: '',
					globOptions: {
						ignore: [
							'**/*.sass',
							'**/*.pug'
						],
					},
					filter: async (resourcePath) => {
						const includeDirs = ['libs', 'styles/old', 'img', 'fonts', 'js/old'];
						return includeDirs.some(dir => resourcePath.includes(`src/${dir}`));
					}
				}
			]
		}),
	],
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 8080,
		hot: true
	}
};
