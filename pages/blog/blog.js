const burgerMenu = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const moveToTop = document.querySelector(".moveToTop");
const login = document.querySelector(".login-btn");
const overlay = document.querySelector(".overlay");
const xMark = document.querySelector(".xMark");
const loginForm = document.querySelector(".loginForm");
const mail = document.querySelector(".mail");
const password = document.querySelector(".password");
const loginSpan = document.querySelector(".loginForm span");

moveToTop.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("active");
  menu.classList.toggle("active");
  if (screen.width < 650 && menu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }
});

login.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.style.display = "grid";
  document.body.style.overflowY = "hidden";
});

xMark.addEventListener("click", () => {
  overlay.style.display = "none";
  document.body.style.overflowY = "scroll";
});

let users = getData();

async function getData() {
  const response = await fetch(
    "https://lms-website-84545-default-rtdb.firebaseio.com/users/-N9qh4VOXPpWoocnbfxI.json"
  );
  let data = await response.json();
  users = data;
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let loggedUser = users.filter(user => {
    return user.mail === mail.value && user.password === password.value
  })

  if (loggedUser.length < 1) {
    loginSpan.style.color = "#fff";
  } else {
    loginSpan.style.color = "royalblue";
    if (loggedUser[0].type === "Student") {
      window.location.replace("../student/student.html");
    }
    if (loggedUser[0].type === "Teacher") {
      window.location.replace("../teacher/teacher.html");
    }
    if (loggedUser[0].type === "Admin") {
      window.location.replace("../admin/admin.html");
    }
  }
});
