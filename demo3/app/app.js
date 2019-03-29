//ES6规范
import app from '../css/app.css';

import img from '../images/hua.jpg';

// console.log('img ==> ', img);

require('../sass/detail.scss');

console.log('app');

window.onload = function () {

	let image = new Image();

	// var reg = /^data:image\/.+;base64,/;

	// if (reg.test(img)) {
	// 	image.src = img;
	// } else {
	// 	image.src = './public/' + img;
	// }

	image.className = 'auto-img';

	image.src = img;

	
	document.getElementById('imgBox').appendChild(image);

}