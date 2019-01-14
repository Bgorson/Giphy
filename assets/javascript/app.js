//Global Variables
var nameQuery;
var staticQueryURL;
var activeQueryURL;
var topics = ["Lucille", "Buster", "Michael", "Lindsey","Gob","Blue Man", "Tobias", "George Michael"];
var more;
var moreType;
var favTopics =[];

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
  more = this;
  moreType="batch";
  $("#moreBtn").text("More?")
  populateGifs(this)
  $("#gifs").html("");

})
//AJAX function call to create gif elements and clear current page
function populateGifs(element){
  
  nameQuery = $(element).attr("name");
  staticQueryURL= "https://api.giphy.com/v1/gifs/search?q=" + nameQuery + "+arrested+development&api_key=AX02ZMKDt1EVKnwZGVJUoOEhJQxOW6ol"
  $.ajax({
      url: staticQueryURL,
      method: "GET"
    }).then(function(response) {
      for (var i=0; i < 10; i++) { //Amount of Gifs to display
        var gifDiv= $("<div class = 'gifDiv mx-2 my-1'>");
        var img = $("<img>");
        var ratingText = $("<p>")

            
        img.addClass("gifImage")
        img.attr("src", response.data[i].images.fixed_height_still.url);
        img.attr("activeURL",response.data[i].images.fixed_height.url);
        img.attr("stillURL",response.data[i].images.fixed_height_still.url);
        img.attr("gifState", "still");
        var rating = response.data[i].rating.toUpperCase();
        ratingText.html("Rating:" + rating);
        
        $(gifDiv).append(ratingText)
        $(gifDiv).append(img);
        placeFavorites(gifDiv,img)
        $("#gifs").append(gifDiv)

           
      }
})
}
//places hearts in gifs for favorites
function placeFavorites(div,imgStats){
  var favoriteIcon= $("<button>")
  $(favoriteIcon).addClass("favButton")
  $(div).append(favoriteIcon)
  favoriteIcon.attr("URL", imgStats.attr("src"));
  favoriteIcon.attr("activeURL", imgStats.attr("activeURL"));
  favoriteIcon.attr("stillURL", imgStats.attr("stillURL"));
  favoriteIcon.attr("gifState", imgStats.attr("gifState"));

}


//Click event to activate GIF and de-activate 
$(document).on("click", ".gifImage", function() {
  selectedGif=$(this);
  var isActive= selectedGif.attr("gifState")

  if (isActive === "still") {
    selectedGif.attr("src", selectedGif.attr("activeURL"));
    selectedGif.attr("gifState", "animate");
  }
  else {
    selectedGif.attr("src",selectedGif.attr("stillURL"));
    selectedGif.attr("gifState","still")
  }
  

})
// This function handles events where adding a button is clicked
$("#add-character").on("click", function() {
  event.preventDefault();
  var character = $("#character-input").val().trim();
  console.log(character.indexOf(topics))
  //Clears input field
  $("#character-input").val('');
  //Checks if its been added or if blank
  if (character == "") {
    return false;
  }
  if (topics.indexOf(character) == -1){
    topics.push(character);
    createButtons();
      }
})
//What to do when "more" is clicked
$("#moreBtn").on("click", function() {
  if (moreType == "batch"){
    populateMoreGifs(more)
  }
  else {
    populateEvenMoreGifs(more)
  }
})

//Adds a single random gif from the query
function populateEvenMoreGifs(element){
  
  console.log(element)
  nameQuery = $(element).attr("name");
  staticQueryURL= "https://api.giphy.com/v1/gifs/random?api_key=AX02ZMKDt1EVKnwZGVJUoOEhJQxOW6ol&tag=" + nameQuery + "+arrested+development"
  console.log(staticQueryURL)
  $.ajax({
      url: staticQueryURL,
      method: "GET"
    }).then(function(response) {
      
        var gifDiv= $("<div class = 'gifDiv mx-2 my-1'>");
        var img = $("<img>");
        img.addClass("gifImage")
        img.attr("src", response.data.images.fixed_height_still.url);
        img.attr("activeURL",response.data.images.fixed_height.url);
        img.attr("stillURL",response.data.images.fixed_height_still.url);
        img.attr("gifState", "still");
        $(gifDiv).append(img);
        placeFavorites(gifDiv,img)
        $("#gifs").append(gifDiv)
        

})
}

//Adds another set of 10 images from the ajax response
function populateMoreGifs(element){
  moreType="random";
  $("#moreBtn").text("One more?")
  nameQuery = $(element).attr("name");
  staticQueryURL= "https://api.giphy.com/v1/gifs/search?q=" + nameQuery + "+arrested+development&api_key=AX02ZMKDt1EVKnwZGVJUoOEhJQxOW6ol"
  $.ajax({
      url: staticQueryURL,
      method: "GET"
    }).then(function(response) {
      for (var i=10; i < 25; i++) { //Amount of Gifs to display
        var gifDiv= $("<div class = 'gifDiv mx-2 my-1'>");
        var img = $("<img>");
        var ratingText = $("<p>")
        img.addClass("gifImage")
        img.attr("src", response.data[i].images.fixed_height_still.url);
        img.attr("activeURL",response.data[i].images.fixed_height.url);
        img.attr("stillURL",response.data[i].images.fixed_height_still.url);
        img.attr("gifState", "still");
        var rating = response.data[i].rating.toUpperCase();
        ratingText.html("Rating:" + rating);
        $(gifDiv).append(ratingText)
        $(gifDiv).append(img);
        placeFavorites(gifDiv,img)
        $("#gifs").append(gifDiv)
           
      }
})
}
//Places buttons on the page at start
createButtons()
//When a favorite is clicked
$(document).on("click", ".favButton",function(){
  var info = {
  URL: $(this).attr("URL"),
  activeURL: $(this).attr("activeURL"),
  stillURL:$(this).attr("stillURL"),
  gifState:$(this).attr("gifState")
}
favTopics.push(info);
localStorage.setItem("favorites",JSON.stringify(favTopics));
})

//When pulling up the favorites page
$("#favPage").on("click",function(){
  $("#gifs").html("");
  var storedFavorites = (localStorage.getItem("favorites"));
  storedFavorites=(JSON.parse(storedFavorites))
  console.log(storedFavorites[0])
  for (i=0;i<storedFavorites.length;i++){
    var gifDiv= $("<div class = 'gifDiv mx-2 my-1'>");
    var img = $("<img>");
    // var ratingText = $("<p>")
    img.addClass("gifImage")
    img.attr("src", storedFavorites[i].URL);
    img.attr("activeURL",storedFavorites[i].activeURL);
    img.attr("stillURL",storedFavorites[i].stillURL)
    img.attr("gifState", "still");
        // var rating = response.data[i].rating.toUpperCase();
        // ratingText.html("Rating:" + rating);
        
        // $(gifDiv).append(ratingText)
        $(gifDiv).append(img);
        placeFavorites(gifDiv,img)
        $("#gifs").append(gifDiv)
  }

})