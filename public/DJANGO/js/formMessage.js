var regQuote = document.querySelector(".register .info");
var regErrorMessages = document.querySelectorAll(".register .message p");

var loginQuote = document.querySelector(".quote p");
var loginErrorMessage = document.querySelector(".login .error-message p");

regErrorMessages.forEach((errorMessages) => {
  if (errorMessages != null) {
    regQuote.innerHTML = "";
    setTimeout(function () {
      errorMessages.parentElement.style.display = "none";
    }, 10000); // <-- time in milliseconds
  }
});

if (loginErrorMessage != null) {
  loginQuote.innerHTML = "";
}
