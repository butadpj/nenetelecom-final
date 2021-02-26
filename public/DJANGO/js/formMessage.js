var regQuote = document.querySelector(".register .info");
var regErrorMessages = document.querySelectorAll(".register .message p");

var logQuote = document.querySelector(".login .info");
var logMessage = document.querySelector(".login .message p");

regErrorMessages.forEach((errorMessages) => {
  if (errorMessages != null) {
    regQuote.innerHTML = "";
    setTimeout(function () {
      errorMessages.parentElement.style.display = "none";
    }, 10000); // <-- time in milliseconds
  }
});

if (logMessage != null) {
  logQuote.innerHTML = "";
  logMessage.style.color = "red";
}
