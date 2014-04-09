var dbconnect = require('../dbconnect'),
    Weight = dbconnect.Weight;

//Error Handler
function errorHandler(err, callback) {
    if(err) {
        console.log(err);
    } else {
        //If callback exists, call it
        if(callback && typeof(callback) === 'function') {
            callback();
        }
    }
}

//Retrieve all records
exports.getWeights = function(req,res) {
    Weight.find({}, function(err, data){
        errorHandler(err, function(){
            res.send(data);
        });
    });
};

//Add a new record
exports.postWeight = function(req,res){
    console.log('Posting Weight: ' + req.body.weight);
    var newWeight = new Weight({
        date: req.body.date,
        weight: req.body.weight
    });
    var successMessage = 'Insert succesful! Weight: '+ req.body.weight + ' Date: ' + req.body.date;

    newWeight.save(function(err){
        errorHandler(err, function() {
            res.send(successMessage);
        });
    });
};

//Get record with specified id
exports.findWeight = function(req,res) {
    var id = req.params.id;
    console.log('Retrieving weight: ' + id);

    Weight.findOne({ '_id': id}, function(err, data){
        errorHandler(err, function(){
            res.send(data);
        });
    });
};

//Update a record
exports.updateWeight = function(req,res) {
    var id = req.params.id;

    console.log('Updating weight: ' + id);

    Weight.update({ '_id': id }, {date: req.body.date, weight: req.body.weight}, function(err,data) {
        errorHandler(err, function(){
            var successMessage = 'ID: ' + id + ' updated!';
            res.send(successMessage);
        });
    });
};

//Delete a record
exports.deleteWeight = function(req,res) {
    var id = req.params.id;

    console.log('Deleting weight: ' + id);

    Weight.remove({ '_id': id }, function(err,data) {
        errorHandler(err, function(){
            var successMessage = 'ID: ' + id + ' removed!';
            res.send(successMessage);
        });
    });
};
