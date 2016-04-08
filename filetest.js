console.log('Loading function');

var fs = require('fs');

exports.handler = function (event, context) {
	fs.readFile('/tmp/test.txt', 'utf-8', function (err, data) {
		if (err) {
			console.log('readFile err =>', err);
			fs.writeFile('/tmp/test.txt', 'Hello World', function (err) {
				if (err) {
					console.log('writeFile err =>', err);
				} else {
					console.log('File write completed');
				}
				context.done(err, 'success!');
			});
		} else {
			console.log('readFile data =>', data);
			context.done(err, 'success!');
		}
	});
};