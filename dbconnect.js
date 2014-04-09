var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/weightwatcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected to database');
});

var Schema = mongoose.Schema;
var WeightSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        min: 0
    }
});
var Weight = mongoose.model('Weight', WeightSchema);

exports.Weight = Weight;
