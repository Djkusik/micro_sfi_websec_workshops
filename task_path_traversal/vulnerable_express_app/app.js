const express = require('express')
const path = require("path");
const mkdirp = require("mkdirp");
const serveIndex = require('serve-index');
const fs = require('fs');
const requireUncached = require('require-uncached');
const app = express()
const port = 5003

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

mkdirp.sync('public/uploads/')
app.use('/uploads',express.static('public/uploads') ,serveIndex("public/uploads"))

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

var admzip = require('adm-zip');
var extractzip = require('@vtex/extract-zip');
var uuid = require('uuid');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})
var upload = multer({ storage: storage, fileFilter: function (req, file, cb) {
        var extension = file.mimetype;
	if (extension !== 'application/zip' && extension !== 'application/x-zip-compressed' && extension !== 'application/octet-stream' && extension !== 'multipart/x-zip') {
            return cb(new Error('Only zips are allowed'))
        }
        cb(null, true)
    }
})

app.get('/', (req, res) => {
	res.render("index", {Title: "Micro SFI"});
})

app.get('/task1', (req, res) => {
	res.render("task", {Title: "Micro SFI", First: "./task1/cat?filename=1.jpg", Second:"./task1/cat?filename=2.jpg", Third: "./task1/cat?filename=3.jpg"});
})

app.get('/task1/cat', (req, res, next) => {
	var filename = req.query.filename
	if(filename.includes('.js')) res.redirect(301, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	var type = mime[filename.split('.').pop()] || 'text/plain';
	res.setHeader('Content-Type', type);
	fs.readFile('images/'+filename, function(err, data){
	    	if(err){
			 next(err)
		} else {
			res.send(data)
		}
	});
})

app.get('/task2', (req, res) => {
	//sfi{flag_should_be_here}
	res.render("task", {Title: "Micro SFI", First: "./task2/cat?filename=1.jpg", Second:"./task2/cat?filename=2.jpg", Third: "./task2/cat?filename=3.jpg"});
})

app.get('/task2/cat', (req, res, next) => {
	var filename = req.query.filename.replace(/\.\.\//g,'')
  //find a way to read it and get the flag
  if(filename.includes('flag.js')) filename = '1.jpg'
	var type = mime[filename.split('.').pop()] || 'text/plain';
	res.setHeader('Content-Type', type);
	fs.readFile('images/'+filename, function(err, data){
	    	if(err){
			 next(err)
		} else {
			res.send(data)
		}
	});
})

app.get('/task3', (req, res) => {
	res.render("form", {Title: "Micro SFI"});
})

app.post('/task3', upload.single('zipupload'),(req, res, next) => {
  //there is some file to read
  var random = uuid()
  mkdirp.sync('public/uploads/'+random)
  extractzip(req.file.path, {dir: path.resolve('public/uploads/'+random)},function (err){
    if(err){
      next(err)
    } else {
      res.redirect(301, './uploads/'+random)
    }
  })
})

app.get('/task4', (req, res) => {
	res.render("form", {Title: "Micro SFI"});
})

app.post('/task4', upload.single('zipupload'), (req, res, next) => {
  //there is some serious bug in this library, check it out
  var zip = new admzip(req.file.path)
  var random = uuid()
  mkdirp.sync('public/uploads/'+random)
  zip.extractAllTo(path.resolve('public/uploads/'+random), true)
  res.redirect(301, './uploads/'+random)
})

app.get('/task5', (req, res) => {
  var test = requireUncached('./test')
	res.send(test.helloWorld());
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
