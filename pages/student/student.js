const burgerMenu = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const moveToTop = document.querySelector(".moveToTop");
const course = document.querySelector(".course");
const buttons = document.querySelectorAll("#courses button");

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

const courseContainer = document.querySelector(".my-courses");

let user;

const generateCourses = (id) => {
  
  const course = document.createElement("div");
  course.classList.add("course");

  const aboutCourse = document.createElement("div");
  aboutCourse.classList.add("about-course");

  const image = document.createElement("img");
  image.setAttribute("src", `${user.enrolled[id].image}`);

  const courseInfo = document.createElement("div");
  courseInfo.classList.add("course-info");

  const heading = document.createElement("h5");
  heading.innerText = `${user.enrolled[id].name}`;

  const courseDetails = document.createElement("div");
  courseDetails.classList.add("course-info-details");

  const description = document.createElement("p");
  description.classList.add("description");
  description.innerText = `${user.enrolled[id].description}`;

  const progress = document.createElement("div");
  progress.classList.add("progress");

  const paragraph = document.createElement("p");
  const span1 = document.createElement("span");
  span1.innerText = "Progress";
  const span2 = document.createElement("span");
  span2.innerText = "0%";
  paragraph.append(span1, span2);

  const courseProgress = document.createElement("div");
  courseProgress.classList.add("course-progress0");
  progress.append(paragraph, courseProgress);

  const dropBtn = document.createElement("button");
  dropBtn.classList.add("drop");
  dropBtn.addEventListener("click", () => {
    deleteCourse(id);
  });
  dropBtn.innerText = "Drop course";

  courseDetails.append(description, progress, dropBtn);
  courseInfo.append(heading, courseDetails);
  aboutCourse.append(image, courseInfo);

  const courseContent = document.createElement("div");
  courseContent.classList.add("course-content");

  const heading2 = document.createElement("h5");
  heading2.innerText = "Course content";

  const content = document.createElement("div");
  content.classList.add("content");

  const contentDiv = document.createElement("div");

  const iframe1 = document.createElement("iframe");
  iframe1.setAttribute("src", `${user.enrolled[id].videos[0]}`);
  const iframe2 = document.createElement("iframe");
  iframe2.setAttribute("src", `${user.enrolled[id].videos[1]}`);

  contentDiv.append(iframe1, iframe2);

  const link = document.createElement("a");
  link.setAttribute("href", `${user.enrolled[id].link}`);
  link.innerText = "Link to book";

  content.append(contentDiv, link);

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next lesson";

  actions.append(nextBtn);

  courseContent.append(heading2, content, actions);

  course.append(aboutCourse, courseContent);
  courseContainer.append(course);
};

const getData = () => {
  fetch(
    "https://lms-website-84545-default-rtdb.firebaseio.com/students/-N9h1VBFYQz-owFDgEbs/0.json"
  )
    .then((res) => res.json())
    .then((data) => (user = data))
    .then((user) =>
      user.enrolled.forEach((el, id) => {
        generateCourses(id);
      })
    );

  return user;
};

getData();

buttons.forEach((btn, id) => {
  btn.addEventListener("click", () => {
    user.enrolled.push(user.available[id]);

    fetch(
      "https://lms-website-84545-default-rtdb.firebaseio.com/students/-N9h1VBFYQz-owFDgEbs/0.json",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enrolled: user.enrolled,
        }),
      }
    )
      .then((btn.disabled = true))
      .then(() => {
        courseContainer.innerHTML = "";
        user.enrolled.forEach((el, id) => {
          generateCourses(id);
        });
      });
  });
});

function deleteCourse(clickedId) {

  const filtered = user.enrolled.filter((el,id) => {
    return id !== clickedId
  });

  fetch(
    "https://lms-website-84545-default-rtdb.firebaseio.com/students/-N9h1VBFYQz-owFDgEbs/0.json",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enrolled: filtered,
      }),
    }
  )
    .then(() => {
        location.reload();
    });

}
