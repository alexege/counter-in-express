// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);
// use app's get method and pass it the base route '/' and a callback

// require body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var session = require('express-session');

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.post('/users', function (req, res){
   // set the name property of session.  
   req.session.name = req.body.name;
   console.log(req.session.name);
   console.log("POST DATA \n\n", req.body)
   res.redirect('/');
});

app.get('/', function(request, response) {

   if(request.session['val'] === undefined){
      request.session['val'] = 0;
   } else {
      request.session['val'] += 1;
   }

   var test = request.session['val'];

   console.log("Counter: ", request.session['val']);
    // just for fun, take a look at the request and response objects
   console.log("The request object", request);
   console.log("The response object", response);
   // use the response object's .send() method to respond with an h1
   // response.send("<h1>Hello Express</h1>");
   response.render('index', {count: request.session['val'], test: test});
})

app.get('/add_two', function(request, response) {
   request.session['val'] += 1;
   response.redirect('/');
})

app.get('/clear_session', function(request, response){
   request.session['val'] = -1;
   response.redirect('/');
})

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jadecopy
app.set('view engine', 'ejs');

app.get("/users", function (request, response){

   // hard-coded user data
   var users_array = [
       {name: "Michael", email: "michael@codingdojo.com"}, 
       {name: "Jay", email: "jay@codingdojo.com"}, 
       {name: "Brendan", email: "brendan@codingdojo.com"}, 
       {name: "Andrew", email: "andrew@codingdojo.com"},
   ];
   response.render('users', {users: users_array});
})

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})
