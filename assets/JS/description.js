//Back button to go Index
const closeButton = $("#backBtn") 
closeButton.on("click", function (event) {
  event.preventDefault();
  window.location.href = "index.html";
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

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');

    const settings = {
        async: true,
        crossDomain: true,
        url: `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '47274edc1dmshe31d084d77bf6f6p1ea994jsnbebd98eddec2',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    $.ajax(settings).done(function(response) {
        $('#game-title').text(response.title);
        $('#game-image').attr('src', response.thumbnail);
        $('#game-description').text(response.description);
    });
});