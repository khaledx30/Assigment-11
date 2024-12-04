// // Inputs
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");
const existMessage = document.getElementById("exist");
const incorrectMessage = document.getElementById("incorrect");

const baseURL = location.pathname.split("/").slice(0, -1).join("/") || "/";

const username = localStorage.getItem("sessionUsername");
if (username) {
  document.getElementById("username").textContent = `Welcome ${username}`;
}

let signUpArray = JSON.parse(localStorage.getItem("users")) || [];

function showMessage(element, message, type = "success") {
  const className = type === "success" ? "text-success" : "text-danger";
  element.innerHTML = `<span class="m-3 ${className}">${message}</span>`;
}

function isFieldEmpty(fields) {
  return fields.some((field) => field.value.trim() === "");
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isEmailExist(email) {
  return signUpArray.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
}

function signUp() {
  if (isFieldEmpty([name, email, password])) {
    showMessage(existMessage, "All inputs are required", "error");
    return false;
  }

  if (!isValidEmail(email.value)) {
    showMessage(existMessage, "Invalid email format", "error");
    return false;
  }

  if (isEmailExist(email.value)) {
    showMessage(existMessage, "Email already exists", "error");
    return false;
  }

  const newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  signUpArray.push(newUser);
  localStorage.setItem("users", JSON.stringify(signUpArray));

  showMessage(existMessage, "Registration successful");
  return true;
}

function login() {
  if (isFieldEmpty([signinEmail, signinPassword])) {
    showMessage(incorrectMessage, "All inputs are required", "error");
    return false;
  }

  const email = signinEmail.value;
  const password = signinPassword.value;

  const user = signUpArray.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (user) {
    localStorage.setItem("sessionUsername", user.name);
    location.replace("home.html");
  } else {
    showMessage(incorrectMessage, "Incorrect email or password", "error");
  }
}

function logout() {
  localStorage.removeItem("sessionUsername");
}
