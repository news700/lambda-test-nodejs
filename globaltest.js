console.log('Loading function');

//1. 람다의 전역변수
var i = 0;

exports.handler = function (event, context) {
	console.log('inside handler!');

	//2. 람다의 지역변수
	//var i = 0;

	context.done(null, i++);
};