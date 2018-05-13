var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
Campground = require("./models/campgrounds"),
Comment = require("./models/comment"),
User = require("./models/user"),
seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelpCamp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
//__dirname represents the directory that the script lives in

app.listen(8000, function() {
    console.log("YelpCamp server has started on port 8000");
} );

/* Campground.create(
    {name: "Algonquin Park", image: "https://pixabay.com/get/ea36b40a2efd083ed1584d05fb1d4e97e07ee3d21cac104497f5c57da6e8bdbe_340.jpg", description:"This is a huge park in Ontario that you will love with all kinds of activities."}
, function(err, campground) {
    if(err){
        console.log("you received this error" + err);
    } else {
        console.log("here is your camp: " + campground);
    }
})


var campgroundsList = [
        {name: "Georgian Bay", image: "https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c57da6e8bdbe_340.jpg"},
        {name: "Sandbanks", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f5c57da6e8bdbe_340.jpg"},
        {name: "Algonquin Park", image: "https://pixabay.com/get/ea36b40a2efd083ed1584d05fb1d4e97e07ee3d21cac104497f5c57da6e8bdbe_340.jpg"}
        ];
*/


app.get("/", function(req,res) {
    res.render("landing");
});

//OUR INDEX ROUTE
app.get("/campgrounds", function(req,res) {
    Campground.find({}, function(err,allCampgrounds) {
        if(err){
        console.log("you received this error" + err);
    } else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
    });
});

//OUR CREATE ROUTE
//if we want to send a new campground, need a POST request
app.post("/campgrounds", function(req,res) {
    //gets name and image URL from the form
    var addedName = req.body.name;
    var addedImageURL = req.body.imageURL;
    var addedDesc = req.body.description;
    var newCampground = {name: addedName, image: addedImageURL, description: addedDesc};
    //create a new campground and save to database
    Campground.create(newCampground, function(err, campground){
        if(err){
        console.log("you received this error" + err);
    } else {
       res.redirect("/campgrounds");
    }
    })
    //even though there are two campgrounds, the default is to render the get request
}) //the post request is where you do all the data manipulation

//NEW ROUTE, show form
//should show the form that sends the data to the other post route
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
})

//SHOW COMMAND
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(
        //this populate comments thing means there aren't just object IDs there
        //it actually fills the array comments with Comment schema items associated
        function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ===========================
//comments route
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground})
        }
    })
})

app.post("/campgrounds/:id/comments", function(req,res){
    //lookup campgrounds using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
    //connect new comment to campground
    //redirect campground show page
        }
    })

})
