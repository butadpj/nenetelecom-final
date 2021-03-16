//Form validation
let usernameInput = document.querySelector("#id_username");
let mobile_numberInput = document.querySelector("#id_mobile_number");
let first_nameInput = document.querySelector("#id_first_name");
let last_nameInput = document.querySelector("#id_last_name");
let password1Input = document.querySelector("#id_password1");

let fields = new Set([]);
fields.add(usernameInput);
fields.add(mobile_numberInput);
fields.add(first_nameInput);
fields.add(last_nameInput);
fields.add(password1Input);

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

fields.forEach((field) => {
  field.oninput = (e) => {
    handleChange(e);
  };
});

let fieldsValidity = {
  username: false,
  mobile_number: false,
  first_name: false,
  last_name: false,
  password: false,
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
      fieldsValidity = { ...fieldsValidity, username: false };
    } else if (usernames.has(value)) {
      setValidityStyle(
        label,
        colors.danger,
        inputLine,
        colors.danger,
        errorMessage,
        "User with this Username already exists"
      );
      fieldsValidity = { ...fieldsValidity, username: false };
    } else {
      setValidityStyle(
        label,
        colors.success,
        inputLine,
        colors.success,
        errorMessage,
        ""
      );
      fieldsValidity = { ...fieldsValidity, username: true };
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
      fieldsValidity = { ...fieldsValidity, mobile_number: false };
    } else if (mobile_numbers.has(value)) {
      setValidityStyle(
        label,
        colors.danger,
        inputLine,
        colors.danger,
        errorMessage,
        "A User with this mobile number already exists"
      );
      fieldsValidity = { ...fieldsValidity, mobile_number: false };
    } else {
      setValidityStyle(
        label,
        colors.success,
        inputLine,
        colors.success,
        errorMessage,
        ""
      );
      fieldsValidity = { ...fieldsValidity, mobile_number: true };
    }
  }

  if (input === "first_name") {
    let label = document.querySelector(".first_name label");
    let inputLine = document.querySelector(".first_name .input-line");
    let errorMessage = document.querySelector(
      ".first_name .input-error-message p"
    );
    let regex = /^[a-zA-Z\s]{2,30}$/;

    if (!value.match(regex)) {
      setValidityStyle(
        label,
        colors.danger,
        inputLine,
        colors.danger,
        errorMessage,
        "Please enter a valid name"
      );
      fieldsValidity = { ...fieldsValidity, first_name: false };
    } else {
      setValidityStyle(
        label,
        colors.success,
        inputLine,
        colors.success,
        errorMessage,
        ""
      );
      fieldsValidity = { ...fieldsValidity, first_name: true };
    }
  }

  if (input === "last_name") {
    let label = document.querySelector(".last_name label");
    let inputLine = document.querySelector(".last_name .input-line");
    let errorMessage = document.querySelector(
      ".last_name .input-error-message p"
    );
    let regex = /^[a-zA-Z\s]{2,30}$/;

    if (!value.match(regex)) {
      setValidityStyle(
        label,
        colors.danger,
        inputLine,
        colors.danger,
        errorMessage,
        "Please enter a valid surname"
      );
      fieldsValidity = { ...fieldsValidity, last_name: false };
    } else {
      setValidityStyle(
        label,
        colors.success,
        inputLine,
        colors.success,
        errorMessage,
        ""
      );
      fieldsValidity = { ...fieldsValidity, last_name: true };
    }
  }

  if (input === "password1") {
    let label = document.querySelector(".password1 label");
    let inputLine = document.querySelector(".password1 .input-line");
    let errorMessage = document.querySelector(
      ".password1 .input-error-message p"
    );
    let regex = "^[A-Za-zd_]{8,}$";

    if (value.length < 8) {
      setValidityStyle(
        label,
        colors.danger,
        inputLine,
        colors.danger,
        errorMessage,
        "Minimum of 8 characters is required for password"
      );
      fieldsValidity = { ...fieldsValidity, password: false };
    } else if (!value.match(regex)) {
      setValidityStyle(
        label,
        colors.danger,
        inputLine,
        colors.danger,
        errorMessage,
        "Please enter a valid password, only _ (underscores) are allowed as special characters"
      );
      fieldsValidity = { ...fieldsValidity, password: false };
    } else {
      setValidityStyle(
        label,
        colors.success,
        inputLine,
        colors.success,
        errorMessage,
        ""
      );
      fieldsValidity = { ...fieldsValidity, password: true };
    }
  }
};

const allInputIsValid = () => {
  let inputStatus = [];
  Object.values(fieldsValidity).forEach((value) => {
    if (value != null || value != undefined) {
      inputStatus.push(value);
    }
  });

  let allValid = inputStatus.every((value) => {
    return value;
  });

  return allValid;
};

const handleChange = (e) => {
  let input = e.target.name;
  let value = e.target.value;
  checkValidity(input, value);
  handleButtonType();
};

const handleButtonType = () => {
  let submitBtn = document.querySelector(".submit-btn");
  if (!allInputIsValid()) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
};

//Password toggle
let isShown = false;
const passwordToggle = () => {
  let eyeIcon = document.querySelector(".field-icon").firstElementChild;

  if (!isShown) {
    eyeIcon.classList.add("fa-eye-slash");
    eyeIcon.classList.remove("fa-eye");
    password1Input.type = "text";
    isShown = true;
  } else {
    eyeIcon.classList.add("fa-eye");
    eyeIcon.classList.remove("fa-eye-slash");
    password1Input.type = "password";
    isShown = false;
  }
};

//Fix issue in mobile phones when pulling up the keyboard
let registerInputs = document.querySelectorAll(
  ".register-info-form .form-input"
);
let initialHeight = "100vh";

registerInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    document.body.style.overflow = "auto";
    document.body.style.height = "100vh";
  });
});
