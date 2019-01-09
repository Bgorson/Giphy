var nameQuery;
var staticQueryURL;
var activeQueryURL;
var topics = ["Lucille", "Buster", "Michael", "Lindsey","Gob","Blue Man", "Tobias", "George Michael"];

//Create buttons based on topics
function createButtons(){
  $('#topics').html('')
for (i=0; i<topics.length;i++){
    var buttons = $('<button>');
    buttons.addClass("topics btn btn-primary");
    buttons.html(topics[i]);
    buttons.attr("name", topics[i]); 
    buttons.appendTo('#topics'); 
  }
}

//click event to populate page with static GIFS with Rating
$(document).on("click", ".topics", function() {
   populateGifs(this)
})

function populateGifs(element){
  $("#gifs").html("");
  nameQuery = $(element).attr("name");
  console.log(element)
  staticQueryURL= "https://api.giphy.com/v1/gifs/search?q=" + nameQuery + "-arrested-development&api_key=AX02ZMKDt1EVKnwZGVJUoOEhJQxOW6ol"
  $.ajax({
      url: staticQueryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      for (var i=0; i < 10; i++) {
        var gifDiv= $("<div class = 'gifDiv mx-2 my-1'>");
        var img = $("<img>");
        var ratingText = $("<p>")
        img.addClass("gifImage")
        img.attr("src", response.data[i].images.fixed_height_still.url);
        img.attr("activeURL",response.data[i].images.fixed_height.url);
        var rating = response.data[i].rating
        ratingText.html("Rating:" + rating);
        $(gifDiv).append(ratingText)
        $(gifDiv).append(img);
        $("#gifs").append(gifDiv)
           
      }
})
}

//Click event to activate GIF and de-activate 
$(document).on("click", ".gifImage", function() {
selectedGif=$(this);
  var animated= selectedGif.attr("activeurl");
  var static = selectedGif.attr("src");
  selectedGif.attr("src",animated);
  selectedGif.attr("activeurl",static);

})
// This function handles events where one button is clicked
$("#add-character").on("click", function() {
  event.preventDefault();
  var character = $("#character-input").val().trim();
  //Clears input field
  $("#character-input").val('');
       //Checks if its been added
      if (character.indexOf(topics) == -1){
  topics.push(character);
  console.log(topics)
  createButtons();
      }
})
createButtons()
