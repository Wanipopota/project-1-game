//Go to description html
const reviewButton = $(".waves-effect.waves-light.btn-small") 
reviewButton.on("click", function (event) {
  event.preventDefault();
  window.location.href = "description.html";
});

const requestUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
$.ajax({
  url: requestUrl,
  method: 'GET',
}).then(function (response) {
  console.log(response);
  alert(response.setup)
});