let i = 0;
let txt = "";
const speed = 50;

const reviewButton = $(".waves-effect.waves-light.btn-small")
reviewButton.on("click", function (event) {
    event.preventDefault();
    window.location.href = "description.html";
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
            $('#joke').empty();
            txt= r.joke;
            i=0;
            typeWriter();
            setTimeout(timeOut, 10000);
            document.getElementById('timeOutMessage').innerHTML = ""
            
        } else if (r.type == "twopart") {
            $('#joke').html('');
            $('#jokeSetup').text(r.setup);
            $('#jokeDelivery').text(r.delivery);
            $('#jokeSetup').empty();
            $('#jokeDelivery').empty();
            txt = (r.setup + '.....' + r.delivery);
            i=0;
            typeWriter();
            setTimeout(timeOut, 10000);
            document.getElementById('timeOutMessage').innerHTML = ""

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
$(document).ready(function () {
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
    $.ajax(settings).done(function (response) {
        const games = response.slice(0, 15);
        games.forEach(function (game, index) {
            const cardContainer = $(`#card-${index + 1}`); 
            if (cardContainer.length > 0) {
                const cardImage = cardContainer.find('.card-image img');
                const cardTitle = cardContainer.find('.card-title');
                const cardDescr = cardContainer.find('.card-content');
                if (cardImage.length > 0) {
                    cardImage.attr('src', game.thumbnail); 
                    cardImage.attr('alt', game.title); 
                }
                if (cardTitle.length > 0) {
                    cardTitle.text(game.title);
                }
                if (cardDescr.length > 0) {
                    cardDescr.text(`${game.short_description}`);
                }
                cardContainer.on('click', function () {
                    const gameId = game.id;
                    window.location.href = `description.html?id=${gameId}`;
                });
            }
        });
    });
})

function typeWriter() {
    if (i < txt.length) {
      document.getElementById('joke').innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

//const myTimeout = setTimeout(timeOut, 1000);


function timeOut() {
  document.getElementById('timeOutMessage').innerHTML = "Did you die of laughter?"

}




/*let i = 0;
let txt = "";
const speed = 150; */

/* this works but might want to apply to the module section

applied this to line 34 and it worked

            $("#liked-1").empty();
            txt= response.joke;
            i=0;
            typeWriter();

function typeWriter() {
  if (i < txt.length) {
    document.getElementById('liked-1').innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
HTML to call a function inside the HTML
                <button onclick="typeWriter()">Click me</button>
                <p id="demo"></p>
*/