const express = require('express')
const app = express()



app.get('/test', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	console.log(req.cookies)
	console.log('Signed Cookies: ', req.signedCookies)

	res.end()
})
app.get('/ping', (req, res) => {
	console.log("Request");
	setTimeout(() => res.send('Pong'), 20)
})
app.listen(8080, () => {
	console.log('Started on port 8080');
})