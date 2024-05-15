//Back button to go Index
const closeButton = $("#backBtn") 
closeButton.on("click", function (event) {
  event.preventDefault();
  window.location.href = "index.html";
});

let response;
const requestUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
const jokeButton = $("#jokeBtn");

$(document).ready(function () {
    $('.modal').modal();
    const likeJoke = $("#like-Joke");
    const dislikeJoke = $("#dislike-Joke");


    likeJoke.on("click", function (event) {
        let likeJokeArray = JSON.parse(localStorage.getItem("Liked")) || [];
        if (response.type == "single") {
            console.log(response.joke);
            likeJokeArray.push(response.joke);
            saveLikedJokes(likeJokeArray);
            let likedJokeTable1 = $("<li>").text(response.joke);
            $("#liked-1").empty().append;
            $("#liked-1").append(likedJokeTable1);
        }
        else {
            console.log(response.setup);
            console.log(response.delivery);
            likeJokeArray.push({
                setup: response.setup,
                delivery: response.delivery
            });
            saveLikedJokes(likeJokeArray);
            let likedJokeTable2 = $("<li>").text(response.setup + '  . . . ' + response.delivery);
            $("#liked-1").empty().append;
            $("#liked-1").append(likedJokeTable2);
        }
    })

    dislikeJoke.on("click", function (event) {
        let dislikeJokeArray = JSON.parse(localStorage.getItem("Disliked")) || [];
        if (response.type == "single") {
            console.log(response.joke);
            dislikeJokeArray.push(response.joke);
            saveDislikedJokes(dislikeJokeArray);
            let dislikedJokeTable1 = $("<li>").text(response.joke);
            $("#disliked-1").empty().append;
            $("#disliked-1").append(dislikedJokeTable1);
        }
        else {
            console.log(response.setup);
            console.log(response.delivery);
            dislikeJokeArray.push({
                setup: response.setup,
                delivery: response.delivery
            });
            saveDislikedJokes(dislikeJokeArray);
            let dislikedJokeTable2 = $("<li>").text(response.setup + '  . . . ' + response.delivery);
            $("#disliked-1").empty().append;
            $("#disliked-1").append(dislikedJokeTable2);
        }
    })
});

jokeButton.on("click", function (event) {
    event.preventDefault();

    $.ajax({
        url: requestUrl,
        method: 'GET',
    }).then(function (r) {
        console.log(response);

        if (r.type == "single") {
            $('#jokeSetup').empty();
            $('#jokeDelivery').empty();
            $('#joke').text(r.joke);
        } else if (r.type == "twopart") {
            $('#joke').html('');
            $('#jokeSetup').text(r.setup);
            $('#jokeDelivery').text(r.delivery);
        } else {
            console.log("Unexpected joke type: " + r.type);
        }
        response = r

    });
});

function saveLikedJokes(likeJokeArray) {
    localStorage.setItem("Liked", JSON.stringify(likeJokeArray));
}

function saveDislikedJokes(dislikeJokeArray) {
    localStorage.setItem("Disliked", JSON.stringify(dislikeJokeArray));
}

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
        console.log(response)
        $('#game-title').text(response.title);
        $('#game-image').attr('src', response.thumbnail);
        $('#game-description').text(response.description);
        $('#game-link').attr('href',response.game_url).text(response.game_url)
        $('#graphics').text(response.minimum_system_requirements.graphics)
        $('#memory').text(response.minimum_system_requirements.memory)
        $('#os').text(response.minimum_system_requirements.os)
        $('#processor').text(response.minimum_system_requirements.processor)
        $('#storage').text(response.minimum_system_requirements.storage)

    if (response && response.screenshots) {
        const infoArray = response.screenshots;
        console.log(infoArray);

        infoArray.forEach(function(item) {
        console.log(item);
            });
        for (let i=0;i<infoArray.length; i++){
        $(`#image-${i+1}`).attr('src', `${infoArray[i].image}`)
        }
        }
    });
});