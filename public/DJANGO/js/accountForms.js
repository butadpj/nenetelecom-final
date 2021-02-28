// let regQuote = document.querySelector(".register .info");
// let regErrorMessages = document.querySelectorAll(".register .message p");

// regErrorMessages.forEach((errorMessages) => {
//   if (errorMessages != null) {
//     regQuote.innerHTML = "";
//     setTimeout(function () {
//       errorMessages.parentElement.style.display = "none";
//     }, 10000); // <-- time in milliseconds
//   }
// });

let loginQuote = document.querySelector(".quote p");
let loginErrorMessage = document.querySelector(".login .error-message p");

if (loginErrorMessage != null) {
  loginQuote.innerHTML = "";
}

let usernameInput = document.querySelector("#id_username");
let mobile_numberInput = document.querySelector("#id_mobile_number");
let first_nameInput = document.querySelector("#id_first_name");
let last_nameInput = document.querySelector("#id_last_name");
let password1Input = document.querySelector("#id_password1");
let password2Input = document.querySelector("#id_password2");

const setFieldAttributes = (element, attributeSet) => {
  attributeSet.forEach((attribute) => {
    let key = Object.keys(attribute)[0];
    let value = Object.values(attribute)[0];

    if (key === "placeholder") {
      element.placeholder = value;
    }

    if (key === "class") {
      value.forEach((val) => {
        element.classList.add(val);
      });
    }
  });
};

setFieldAttributes(usernameInput, [
  { placeholder: "juan5678" },
  { class: ["form-input", "transparent"] },
]);

setFieldAttributes(mobile_numberInput, [
  { placeholder: "09XXXXXXXXX" },
  { class: ["form-input", "transparent"] },
]);

setFieldAttributes(first_nameInput, [
  { placeholder: "Juan" },
  { class: ["form-input", "transparent"] },
]);

setFieldAttributes(last_nameInput, [
  { placeholder: "Dela Cruz" },
  { class: ["form-input", "transparent"] },
]);

setFieldAttributes(password1Input, [
  { placeholder: "********" },
  { class: ["form-input", "transparent"] },
]);

setFieldAttributes(password2Input, [
  { placeholder: "********" },
  { class: ["form-input", "transparent"] },
]);
