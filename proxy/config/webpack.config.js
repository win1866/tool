module.exports = {

	mode: 'development',

	devServer: {

		host: 'localhost',

		port: 10001,

		inline: true,

		progress: true,

		before(app) {

			app.get('/', (request, response) => {

				//request: 请求对象
				//response: 响应对象

				response.json({msg: '代理请求成功'});

			})

		}

	}

}