// Server file for todo list
// Webpage will run on beaglebone black
// Mongodb will track todo's
// able to create, read, modify (progress) and delete todo's
// add statistics with time
// simple and visual interface, 
// and with reader for calendar from google calendar.
// will use JSON to communicate with html VERBS
// based on example from scotch.io on bear database: http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/'));
app.use(express.static(__dirname + '/modules/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// initialise mongoose db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-todo');
mongoose.connection.once('open', function(callback){
    console.log("connected to database");
});

var Todo = require('./modules/todo.js');

// define route for handling events
router = express.Router();

//define route for blank entry's (welcome page)
app.use('/', router);


//try out save and retrieve from database. Use postman to send .post
router.route('/input')
.post(function(req,res){
    var todo = new Todo();
    todo.user_id = req.body.who;
    todo.content = req.body.what;
    todo.updated_at = Date.now();
    console.log("Who: " + req.body.who + "What: " + req.body.what);
    todo.save(function(err){
	if (err) console.log("Couldn't save!");
    });
})

.get(function(req, res){
    Todo.find(function (err, todos){
	if (err) console.log("Couldn't find anything");
//	console.log(json(todos));
//	var count = bodyParser.json(todos).length;
	var count = todos.length;
	res.render('index.ejs', {title: "This is the list", intro: "These are new instructions", todos: todos, count: count});
//	res.json({title: "This is the list", intro: "These are new instructions", todos: todos, count: count});
    });
});

router.get('/todo', function(req, res, next){
    console.log("Todo route started");
    next();
});

router.get('/todo', function(req, res){
    console.log("showing main page");
    res.render('index.ejs', {title: "There is work to do!", intro: app.locals.intro});
});

router.get('/', function(req, res, next){
    console.log("cover route started");
    res.render('cover.ejs', {title: "Welcome, there is plenty to do!"});
    next();
});

router.get('/', function(req, res, next){
    fs.readFile('texts/intro.txt', function(err, intro){
	if (err){console.log("Didn't read introtext");}
	else{
	    app.locals.intro = intro;
	    app.set(introtext = intro);
	    console.log("app.locals.intro: " + app.locals.intro);
	}
    });
});

//only create fom app on phone, not implement in display   
router.post('/create', function(req, res, next){
    console.log(req.body.content);
    res.redirect('/todo');
    next();
});


app.listen(process.env.PORT || 8080);
console.log("we're listening at " +  process.env.PORT + " or 8080");




