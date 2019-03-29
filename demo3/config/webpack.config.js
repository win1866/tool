let path = require('path');

//导入分离css插件
let miniCssExtractPlugin = require('mini-css-extract-plugin');

//处理html文件
let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	//环境模式
	// mode: 'development', //开发环境

	mode: 'production', //生产环境

	entry: {
		// app: './app/app.js',
		// home: './app/home.js'

		index: './app/index.js'
	},

	output: {

		path: path.resolve(__dirname, '../public'),

		filename: '[name].js'
	},

	module: {

		//配置loader
		rules: [

			//css-loader
			{
				//匹配文件后缀
				test: /\.css$/,

				//使用 css-loader
				use: [
					//css和js混合时，需要 style-loader
					// {loader: 'style-loader'},

					//分离css loader
					{loader: miniCssExtractPlugin.loader},
					{loader: 'css-loader'}
				]
			},


			//less-loader
			{
				//匹配文件后缀
				test: /\.less$/,

				//less-loader
				use: [
					//css和js混合时，需要 style-loader
					// {loader: 'style-loader'},

					//分离less编译后的css文件
					{loader: miniCssExtractPlugin.loader},

					{loader: 'css-loader'},

					{loader: 'less-loader'}

				]
			},


			//sass-loader
			{
				test: /\.(sass|scss)$/,
				use: [
					//css和js混合时，需要 style-loader
					// {loader: 'style-loader'},

					//分离sass编译后的css文件
					{loader: miniCssExtractPlugin.loader},

					{loader: 'css-loader'},

					{loader: 'sass-loader'}

				]
			},

			//图片loader
			{
				test: /\.(png|gif|jpg|jpeg)/,

				use: [
					{
						loader: 'url-loader',

						options: {
							//将图片转换为base64大小范围, 单位B
							limit: 10000
						}
					}
				]
			},

			//处理html 文件图片路径
			{
				test: /\.html?$/,

				use: [
					{loader: 'html-withimg-loader'}
				]
			}

		]

	},

	//配置插件
	plugins: [

		//分离css插件
		new miniCssExtractPlugin({
			filename: '[name].min.css'
		}),

		//处理html文件插件
		new htmlWebpackPlugin({
			//模板路径
			// template: './app.html',

			template: './index.html',

			//将打包后的脚本注入在 head 或者 body 或者 移除脚本
			inject: true,

			//如果没有filename字段， 输出名称为 index.html
			// filename: 'app.min.html',

			//html压缩配置
			minify: {

				//移除注释
				removeComments: true,

				//移除标签属性的引号
				removeAttributeQuotes: true,

				//合并空白字符
				collapseWhitespace: true
			}
		})

	],


	//配置服务器
	devServer: {

		//ip地址
		host: 'localhost',

		//配置端口
		port: 10000,

		//打包显示信息方式
		inline: true,

		//显示百分比
		progress: true,

		//自动打开浏览器
		open: true,

		//配置请求路由
		before(app) {
			//服务器实例

			//配置请求地址
			app.get('/home', (req, res) => {
				//req: 请求对象
				//res: 服务器响对象
				res.json({msg: '成功'});

			})


			app.get('/detail', (req, res) => {
				res.json({msg: 'success', status: 200});
			})

		},

		//代理
		proxy: {
			'/app': {

				//重定向
				target: 'http://localhost:10001',

				//重写路径
				pathRewrite: {
					'^/app': ''
				}

			}
		}

	}

}