function getJoke () {
    fetch ( 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
    .then(response => response.json())
        .then(result => {
          console.log(result);
          console.log(result.type);
          alert(result.setup)
          alert(result.delivery)
        })
    }
getJoke()


