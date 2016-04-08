console.log('This is index.js');

var common = require('./common');

//1. 람다의 전역변수 이면서 require 로 선언한 경우
//var data = require('./data.js');

//2. 람다의 전역변수 이지만 uncached 된 require 로 선언한 경우
//var data = common.uncachedrequire('./data.js');

exports.handler = function (event, context) {
	//3. 람다의 지역변수 이면서 require 로 선언한 경우
	//var data = require('./data.js');

	//4. 람다의 지역변수 이지만 uncached 된 require 로 선언한 경우
	var data = common.uncachedrequire('./data.js');

	console.log('init data =>', data);

	data.id = 7;
	data.name = 'eddie';

	console.log('changed data =>', data);

	context.done(null, 'success');
};
