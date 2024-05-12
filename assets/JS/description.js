//Back button to go Index
const closeButton = $("#backBtn") 
closeButton.on("click", function (event) {
  event.preventDefault();
  window.location.href = "index.html";
});


const requestUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
const jokeButton = $("#jokeBtn")




$(document).ready(function(){
  $('.modal').modal();})

jokeButton.on("click", function(){
  $.ajax({
    url: requestUrl,
    method: 'GET',
  }).then(function (response) {
    console.log(response);
   
    if (response.type == "single"){
      alert(response.joke);
     } else {
    alert(response.setup);
    alert(response.delivery);
  }});
})
