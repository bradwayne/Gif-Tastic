
var gifTopics = ['kittens', 'puppies', 'owls', 'bunnies', 'fish', 'sharks', 'chinchillas',
    'bats', 'hedgehog', 'cows', 'birds', 'turtles', 'frogs', 'lizards',
    'skunks', 'ferrets', 'pigs'
];


$("body").on("click", "button", function() {
    // Grabbing and storing the data property value from the button
    var topic = $(this).attr("data-topic");

    // Constructing a queryURL using the topic name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=696K8TVeuBJBg1ref0LA24jIoa4gZspp&limit=10";


    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            console.log(queryURL);
            console.log(response);

            $("#gifs-here").empty();


            // storing the data from the AJAX request in the results variable
            var results = response.data;
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var topicDiv = $("<div class='floatLeft'></div>");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                // Creating and storing an image tag
                var gifImg = $("<img width='225'>");
               
                // Setting the src attribute of the image to a property pulled off the result item
                gifImg.attr('src', results[i].images.fixed_height_small_still.url);

                gifImg.attr('data-animate', results[i].images.fixed_height_small.url);

                gifImg.attr('data-state', 'still');

                gifImg.attr('data-still', results[i].images.fixed_height_small_still.url);



                // Appending the paragraph and image tag to the animalDiv
                topicDiv.append(p);
                topicDiv.append(gifImg);

                // Prependng the topicDiv to the HTML page in the "#gifs-here" div
                $("#gifs-here").prepend(topicDiv);
            }
        });
});


// Function for displaying topics data
function renderButtons() {
    // Deleting the topics buttons prior to adding new topics buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#button-view").empty();
    // Looping through the array of topics
    for (var i = 0; i < gifTopics.length; i++) {
        // Then dynamicaly generating buttons for each topics in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button class='btn btn-success'>");
        // Adding a class
        a.addClass("topic");
        // Adding a data-attribute with a value of the topics at index i
        a.attr("data-topic", gifTopics[i]);
        // Providing the button's text with a value of the topics at index i
        a.text(gifTopics[i]);
        // Adding the button to the HTML
        $("#button-view").append(a);
    }
}
// This function handles events where one button is clicked
$("#add-topic").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    var topic = $(".form-control").val().trim();
    // The topics from the textbox is then added to our array
    gifTopics.push(topic);
    // calling renderButtons which handles the processing of our topics array
    renderButtons();
});


// create the on click function for the still and animate
$("body").on("click", "img", function() {

var gifImg = $(this);
      var state = gifImg.attr("data-state");

      if (state === "still") {
        gifImg.attr("src", gifImg.attr("data-animate"));
        gifImg.attr("data-state", "animate");
      } else {
        gifImg.attr("src", gifImg.attr("data-still"));
        gifImg.attr("data-state", "still");
      }
    });

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();