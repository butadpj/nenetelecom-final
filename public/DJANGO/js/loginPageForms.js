//Error messages
let loginQuote = document.querySelector(".quote p");
let loginErrorMessage = document.querySelector(".login .error-message p");

if (loginErrorMessage != null) {
  loginQuote.innerHTML = "";
}

//Fix issue in mobile phones when pulling up the keyboard
let loginInputs = document.querySelectorAll(".login-info-form .form-input");

loginInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    document.body.style.overflow = "auto";
    document.body.style.height = "100vh";
  });
});
