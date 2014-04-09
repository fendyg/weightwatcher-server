var express = require('express'),
    weight = require('./routes/weight');

var app = express();

app.configure(function(){
    app.use(express.json());
    app.use(express.urlencoded());
});

//REST API
app.get('/', function(req,res){
    res.send('WeightWatcher REST API v0.0.1 by @fendyg');
});
app.get('/getweights', weight.getWeights);
app.get('/getweights/:id', weight.findWeight);
app.post('/postweight', weight.postWeight);
app.put('/updateweight/:id', weight.updateWeight);
app.delete('/deleteweight/:id', weight.deleteWeight);

app.listen(3000);
console.log("WeightWatcher::Listening on port 3000");