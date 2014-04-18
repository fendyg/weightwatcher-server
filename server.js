//Initialization
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    weight = require('./routes/weight');

// Socket IO Config
io.set('log level', 1);
module.exports.io = io;

//Middleware: Allow cross-domain requests (CORS)
var allowCrossDomain = function(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

//Configure server behavior
app.configure(function(){
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(allowCrossDomain);
    app.use(express.static(__dirname + '/public'));
});

//REST API
app.get('/', function(req,res){
    res.send('WeightWatcher REST API v0.0.1 by @fendyg');
});
app.get('/getweights', weight.getWeights);
app.get('/getweights/:id', weight.findWeight);
app.get('/reload', function(req,res){
    res.send('Reloading!');
    io.sockets.emit('reload', {});
});
app.post('/postweight', weight.postWeight);
app.put('/updateweight/:id', weight.updateWeight);
app.delete('/deleteweight/:id', weight.deleteWeight);


server.listen(3000);

console.log("WeightWatcher::Listening on port 3000");