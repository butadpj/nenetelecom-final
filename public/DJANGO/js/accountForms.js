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

let fields = new Set([]);
fields.add(usernameInput);
fields.add(mobile_numberInput);
fields.add(first_nameInput);
fields.add(last_nameInput);
fields.add(password1Input);
fields.add(password2Input);

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

fields.forEach((field) => {
  field.oninput = (e) => {
    handleChange(e);
  };
});

const handleChange = (e) => {
  let input = e.target.name;
  let value = e.target.value;

  checkValidity(input, value);
};

const setValidityStyle = (
  label,
  labelColor,
  line,
  lineColor,
  errorMessage,
  message
) => {
  label.style.color = labelColor;
  line.style.background = lineColor;
  errorMessage.textContent = message;
};

const checkValidity = (input, value) => {
  let colors = {
    danger: "var(--shadeRed)",
    success: "var(--shadeLightGreen)",
  };

  if (input === "username") {
    let label = document.querySelector(".username label");
    let inputLine = document.querySelector(".username .input-line");
    let errorMessage = document.querySelector(
      ".username .input-error-message p"
    );
    let regex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

    if (!value.match(regex)) {
      setValidityStyle(
        label,
        colors.danger,
        inputLine,
        colors.danger,
        errorMessage,
        "Please enter a valid username"
      );
    } else if (usernames.has(value)) {
      setValidityStyle(
        label,
        colors.danger,
        inputLine,
        colors.danger,
        errorMessage,
        "User with this Username already exists"
      );
    } else {
      setValidityStyle(
        label,
        colors.success,
        inputLine,
        colors.success,
        errorMessage,
        ""
      );
    }
  }

  if (input === "mobile_number") {
    let label = document.querySelector(".mobile_number label");
    let inputLine = document.querySelector(".mobile_number .input-line");
    let errorMessage = document.querySelector(
      ".mobile_number .input-error-message p"
    );

    let initialDigit = "09";
    let inputInitialDigit = value.slice(0, 2);
    let regex = /^[0-9]{11}$/;

    if (inputInitialDigit != initialDigit || !value.match(regex)) {
      setValidityStyle(
        label,
        colors.danger,
        inputLine,
        colors.danger,
        errorMessage,
        "Please enter a valid mobile number"
      );
    }
    // else if (usersMobileNumber.includes(value)) {

    // }
    else {
      setValidityStyle(
        label,
        colors.success,
        inputLine,
        colors.success,
        errorMessage,
        ""
      );
    }
  }

  if (input === "first_name") {
    let regex = /^[a-zA-Z\s]{2,30}$/;

    if (!value.match(regex)) {
      console.log("not valid");
    } else {
      console.log("valid");
    }
  }

  if (input === "last_name") {
    let regex = /^[a-zA-Z\s]{2,30}$/;

    if (!value.match(regex)) {
      console.log("not valid");
    } else {
      console.log("valid");
    }
  }
};
