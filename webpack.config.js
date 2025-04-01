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
		filename: file.replace('.pug', '.html'),
		minify: {
			collapseWhitespace: false,
			removeComments: false,
			collapseBooleanAttributes: false,
			preserveLineBreaks: true,
			indentInnerHtml: true,
		}
	});
});

module.exports = {
	mode: 'development',
	entry: {
		'index': './index.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	context: path.resolve(__dirname, 'src'),
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [
					{
					  loader: 'pug-loader',
					  options: {
						pretty: true,
					  }
					}
				]
			},
			{
				test: /\.json$/i,
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
			filename: 'sass/[name].css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/fonts'),
					to: 'fonts',
				},
				{
					from: path.resolve(__dirname, 'src/js'),
					to: 'js',
				},
				{
					from: path.resolve(__dirname, 'src/lib'),
					to: 'lib',
				},
				{
					from: path.resolve(__dirname, 'src/sass'),
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