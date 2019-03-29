let _ = require('jquery');

_(function () {

	_('#home').on('click', function () {

		_.ajax({
			type: 'GET',

			url: '/home',

			success: function (result) {
				console.log('result ==> ', result);
			}
		})

	})


	_('#app').on('click', function() {

			_.ajax({
				type: 'GET',

				url: '/app',

				success: function (result) {
					console.log('proxy result ==> ', result);
				}
			})

	})

})