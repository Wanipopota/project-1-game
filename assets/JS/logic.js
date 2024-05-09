//Back button to go back
const closeButton = document.querySelector("#backBtn");
closeButton.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "index.html";
});

