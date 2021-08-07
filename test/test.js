const { RequestTerter } = require('../lib/request');

const t = new RequestTerter('http://localhost:8080/ping', {
	output: 'r.json'
});
(async () => {
	const result = await t.start();

	console.log(result.medium);
})()
