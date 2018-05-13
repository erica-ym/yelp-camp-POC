var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
        {
            name: "Machu Picchu",
            image: "https://lonelyplanetwp.imgix.net/2018/01/Machu_Picchu-694dbac6b0e5.jpg?crop=entropy&fit=crop&h=421&sharp=10&vib=20&w=748",
            description: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley."
        },
        {
            name: "Patagonia, Argentina",
            image: "https://i.imgur.com/Y6qMZTX.jpg",
            description: "Patagonia is a region encompassing the vast southernmost tip of South America, shared by Argentina and Chile, with the Andes Mountains as its dividing line. The Argentine side features arid steppes, grasslands and deserts."
        },
        {
            name: "Camino de Santiago",
            image: "https://caspin.com/wp-content/gallery/camino-de-santiago/Camino-De-Santiago-Spain-Small-Group-Guided-Tours-Caspin-Journeys.jpg",
            description: "The Camino de Santiago, known in English as the Way of Saint James among other names, is a network of pilgrims' ways serving pilgrimage to the shrine of the apostle Saint James the Great in the cathedral.",
        },
        {
          name: "Algonquin Park",
          image: "https://i.pinimg.com/originals/43/a5/7a/43a57acea1b0fe87a645d8c50cd1df7f.jpg",
          description: "Algonquin Provincial Park is in southeastern Ontario, Canada. Its forests, rivers and numerous lakes, including the large Lake of Two Rivers, are home to moose, bears and common loons. The park’s many trails include the Whiskey Rapids Trail, along the Oxtongue River, and the Barron Canyon Trail, with views from the north rim. The Algonquin Logging Museum features a re-created camp and a steam-powered amphibious tug."
        }
    ];

function seedDB() {
    //removes all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("All has been removed.");
            //make sure this function goes in the callback
            //so that the code runs provided no error upon removal
            data.forEach(function(seed){
               Campground.create(seed, function(err, campground){
                   if(err){
                       console.log(err);
                   } else {
                       console.log("you added a campground!" + campground);
                       //create a comment on each campground
                       Comment.create(
                        {
                            text: "This place is great, but hard to get to internet",
                            author: "Homer",
                        }, function(err, comment) {
                            if(err){
                                console.log(err);
                            } else {
                                //associate the comment with the campground
                                campground.comments.push(comment); //push it into comments array on campground
                                campground.save(); //save it all to database
                                console.log("created new comment");
                            }

                        }
                        );
                   }
               });
        });
        }
    });
    //adds some campgrounds

    //adds some comments
}


module.exports = seedDB; //this sends out that function
