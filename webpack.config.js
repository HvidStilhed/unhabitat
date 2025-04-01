const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const templatesDir = path.resolve(__dirname, 'src/pages');
const pugFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('.pug'));

const htmlPlugins = pugFiles.map(file => {
	return new HtmlWebpackPlugin({
		template: path.join(templatesDir, file),
		filename: file.replace('.pug', '.html')
	});
});

module.exports = {
	mode: 'development',
	entry: './index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	context: path.resolve(__dirname, 'src'),
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
			{
				test: /\.(woff2?|eot|ttf|otf|svg|png|jpg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: '[path][name][ext]',
				},
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
					from: 'fonts',
					to: 'fonts',
				},
				{
					from: 'js',
					to: 'js',
				},
				{
					from: 'lib',
					to: 'lib',
				},
				{
					from: 'sass',
					to: 'sass',
				},
			]
		}),
	],
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 8080,
		hot: true
	}
};
