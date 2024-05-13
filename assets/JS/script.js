//Go to description html
const reviewButton = $(".waves-effect.waves-light.btn-small") 
reviewButton.on("click", function (event) {
  event.preventDefault();
  window.location.href = "description.html";
});

const requestUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
const jokeButton = $("#jokeBtn");

$(document).ready(function() {
    $('.modal').modal();

    jokeButton.on("click", function(event) {
        event.preventDefault();

        $.ajax({
            url: requestUrl,
            method: 'GET',
        }).then(function(response) {
            console.log(response);

            if (response.type == "single") {
                $('#jokeSetup').empty();
                $('#jokeDelivery').empty();
                $('#joke').text(response.joke);
            } else if (response.type == "twopart") {
                $('#joke').html('');
                $('#jokeSetup').text(response.setup);
                $('#jokeDelivery').text(response.delivery);
            } else {
                console.log("Unexpected joke type: " + response.type);
            }
        });
    });
});