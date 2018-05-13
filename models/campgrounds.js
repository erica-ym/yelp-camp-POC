var mongoose = require("mongoose");

//schema setup w mongoose
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    //need to add a comments array so that comments can be pushed in the seeds.js
    comments: [
        { //should be an array of comment IDs, we're not embeding the comments in here
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment",
        }
    ]
})

//makes us a model Campground that uses above schema, now we can add with methods on this model Object
var Campground = mongoose.model("Campground",campgroundSchema);

module.exports = Campground;