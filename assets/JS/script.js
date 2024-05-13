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

$(document).ready(function() {
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc&sort-by=relevance',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '47274edc1dmshe31d084d77bf6f6p1ea994jsnbebd98eddec2',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    $.ajax(settings).done(function(response) {
        const games = response.slice(0, 15); // Get the first 15 games from the response

        // Loop through each game and populate the game cards
        games.forEach(function(game, index) {
            const cardContainer = $(`#card-${index + 1}`); // Get card container by ID

            if (cardContainer.length > 0) {
                const cardImage = cardContainer.find('.card-image img');
                const cardTitle = cardContainer.find('.card-title');
                const cardDescr = cardContainer.find('.card-content');

                // Populate card elements with game information
                if (cardImage.length > 0) {
                    cardImage.attr('src', game.thumbnail); // Set image source
                    cardImage.attr('alt', game.title); // Set image alt text
                }
                if (cardTitle.length > 0) {
                    cardTitle.text(game.title);
                }
                if (cardDescr.length > 0) {
                    cardDescr.text(`${game.short_description}`);
                }

                // Add click event listener to each game card
                cardContainer.on('click', function() {
                    const gameId = game.id;
                    window.location.href = `description.html?id=${gameId}`;
                });
            }
        });
    });
});