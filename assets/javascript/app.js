

var nameQuery;
var queryURL;

var topics = ["Ryu", "Ken", "Chun-Li", "Blanka"];

//Create buttons based on topics
for (i=0; i<topics.length;i++){
    var buttons = $('<button>');
    buttons.addClass("topics");
    buttons.html(topics[i]);
    buttons.attr("name", topics[i]); 
    buttons.appendTo('#topics'); 
}

//click event to populate page with static GIFS with Rating
$(".topics").on("click", function(){
    $("#gifs").html("");
    nameQuery = $(this).attr("name");
    queryURL= "http://api.giphy.com/v1/gifs/search?q=" + nameQuery + "-video-game-street-fighter&api_key=AX02ZMKDt1EVKnwZGVJUoOEhJQxOW6ol"
    console.log(queryURL);
    console.log(nameQuery)
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var requestedGifs = $("#gifs");
        for (var i=0; i < 10; i++) {
          var img = $("<img>").attr("src", response.data[i].images.fixed_height_still.url)
          $(requestedGifs).append(img)
        }
})
})


//Click event to activate GIF and de-activate 





/* 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var gs = $(".giphy-stuff");
    for (var i=0; i < 5; i++) {
      var img = $("<img>").attr("src", response.data[i].images.original.url)
      console.log(response.data[i])
      $(gs).append(img)
    }


    Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
    var img = $("<img>").text(response.data.url)
  Append the td elements to the new table row
  $(newgif).append(img);
 
  Append the table row to the tbody element
  $("body").append(newgif)
  });  */
