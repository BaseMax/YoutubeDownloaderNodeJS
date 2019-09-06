// https://github.com/BaseMax/YoutubeDownloaderNodeJS
let express = require('express')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let multer  = require('multer')
let app = express()
let MysqlJson = require('mysql-json')
var fs = require('fs')
var youtubedl = require('youtube-dl')

let db = new MysqlJson({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'asrez'
})
// app.use(multer({ dest: './upload/' }))
app.use(cookieParser())  
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'pug')
app.set('views', './view')
app.use(express.static('static'))

let config= {
	site:'http://localhost:8081/',
}

app.get('/', (request, response) => {
	// response.render('main', {config:config})
	response.send('...FORM...')
})
app.post('/', (request, response) => {
	var video = youtubedl('https://www.youtube.com/watch?v=N7h97s2qeFE',
		['--format=18'],
		{ cwd: __dirname }
	)
	video.on('info', function(info) {
		console.log('Download started')
		console.log('filename: ' + info._filename)
		console.log('size: ' + info.size)
	})
	video.pipe(fs.createWriteStream('myvideo.mp4'))
	// After finish: download vide from 'myvideo.mp4'...
})

let server = app.listen(9090, function () {
	let host = server.address().address
	let port = server.address().port
	console.log("Youtube DownloaderNode App listening at http://%s:%s", host, port)
})
