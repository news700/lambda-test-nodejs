console.log('Loading function');

var fs = require('fs');
var AWS = require('aws-sdk');
var sqs = new AWS.SQS();

//1. 람다의 전역변수
//var z = 0;

exports.handler = function (event, context) {
	//2. 람다의 지역변수
	var z = 0;

	var params = {
		MessageBody: '-1', /* required */
		QueueUrl: 'https://sqs.ap-northeast-1.amazonaws.com/033622598327/GlobalVariableTest', /* required */
		DelaySeconds: 0
	};

	setTimeout(function () {
		params.MessageBody = String(z++);

		sqs.sendMessage(params, function (err, data) {
			if (err) {
				console.log(err, err.stack); //an error occurred
			} else {
				console.log(data); //successful response
			}

			context.done(err, 'success!');
		});

	}, 1000);
};

//////////////////////////////////
//RESTful Stress Scenario code
//////////////////////////////////

function go() {
	$.ajax({
		url: 'https://6gcqk6gim5.execute-api.ap-northeast-1.amazonaws.com/prod/GlobalVariableTest',
		method: 'GET',
		success: function (res) {
			done(res);
		},
		error: function (err) {
			done(err);
		}
	});
}

for (var i = 0; i < 100; i++) {
	go();
}
