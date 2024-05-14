const burgerMenu = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const moveToTop = document.querySelector(".moveToTop");
const studentContainer = document.querySelector(".student.container");
const teacherContainer = document.querySelector(".teacher.container");
const courseContainer = document.querySelector(".course.container");

let students;

function getStudents(){
  fetch('https://lms-website-84545-default-rtdb.firebaseio.com/admin/students/-N9n2Ch8AwTMxc0ZvRjv.json')
  .then(res => res.json())
  .then(data => students = data)
  .then(() => {
    addingStudent(students)
  });
}

getStudents();

const addingStudent = (arr) => {
  arr.forEach((user, userID) => {
    const student = document.createElement("div");
    student.classList.add("single-student");

    const img = document.createElement("img");
    img.setAttribute("src", `${user.image}`);

    const name = document.createElement("span");
    name.innerText = `${user.name}`;
    name.classList.add("name");

    const courses = document.createElement("div");
    courses.classList.add("course-container");

    let coursesArr = [...user.courses];

    if(coursesArr[0] !== ''){
    coursesArr.forEach((cours, coursID) => {

      let help = userID;

      const course = document.createElement("div");
      course.classList.add("course");

      const courseName = document.createElement("div");
      courseName.classList.add("course-name");
      courseName.innerText = `${cours}`;

      const btn = document.createElement("button");
      btn.innerText = "Remove";
      btn.addEventListener("click", () => {
        let helper = user.courses.filter((el,id) => {
          return coursID !== id
        })
        fetch(`https://lms-website-84545-default-rtdb.firebaseio.com/admin/students/-N9n2Ch8AwTMxc0ZvRjv/${help}.json`,{
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courses: helper,
          }),
        }).then(()=>{
          location.reload();
        })
      });

      course.append(courseName, btn);
      courses.append(course);
    });
  }

    student.append(img, name, courses);

    studentContainer.append(student);
  });
};

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

//Adding new student

const studentName = document.querySelector(".student-name");
const studentMail = document.querySelector(".student-mail");
const studentPassword = document.querySelector(".student-password");
const studentImage = document.querySelector(".student-image");
const addStudent = document.querySelector(".add-student-button");

addStudent.addEventListener("click", () => {

  let helper = students;

  helper.push({
    id: "s" + Math.floor(Math.random() * 1000).toString(),
    name: studentName.value,
    mail: studentMail.value,
    password: studentPassword.value,
    image: studentImage.value,
    courses: [],
  });

  fetch(`https://lms-website-84545-default-rtdb.firebaseio.com/admin/students/-N9n2Ch8AwTMxc0ZvRjv.json`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      3: {    id: "s" + Math.floor(Math.random() * 1000).toString(),
      name: studentName.value,
      mail: studentMail.value,
      password: studentPassword.value,
      image: studentImage.value,
      courses: [''],},
    }),
  }).then(()=>{
    location.reload();
  })


  studentContainer.innerHTML = "";
  studentName.value = "";
  studentMail.value = "";
  studentPassword.value = "";
  studentImage.value = "";
});

//Removing student

const studentID = document.querySelector(".remove-student input");
const removeStudent = document.querySelector(".remove-student button");

removeStudent.addEventListener("click", () => {
  fetch(`https://lms-website-84545-default-rtdb.firebaseio.com/admin/students/-N9n2Ch8AwTMxc0ZvRjv/${studentID.value}.json`,{
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(()=>{
    location.reload();
  })
});

//Student managment

const add = document.querySelector(".add-action");
const remove = document.querySelector(".remove-action");
const all = document.querySelector(".all-action");
const addContainer = document.querySelector(".add-student");
const removeContainer = document.querySelector(".remove-student");

add.addEventListener("click", () => {
  removeContainer.style.display = "none";
  addContainer.style.display = "grid";
  all.style.display = "block";
});

remove.addEventListener("click", () => {
  addContainer.style.display = "none";
  removeContainer.style.display = "flex";
  all.style.display = "block";
});

all.addEventListener("click", () => {
  addContainer.style.display = "none";
  removeContainer.style.display = "none";
  all.style.display = "none";
});

//TEACHER

let teachers;

function getTeachers(){
  fetch('https://lms-website-84545-default-rtdb.firebaseio.com/admin/teachers/-N9msDKYxLFZxWbLFeHS/-N9s1AWj7rkynad71XQt.json')
  .then(res => res.json())
  .then(data => teachers = data)
  .then(() => {
    addingTeacher(teachers)
  });
}

getTeachers();

const addingTeacher = (arr) => {
  arr.forEach((user, userID) => {
    const teacher = document.createElement("div");
    teacher.classList.add("single-teacher");

    const img = document.createElement("img");
    img.setAttribute("src", `${user.image}`);

    const name = document.createElement("span");
    name.innerText = `${user.name}`;
    name.classList.add("name");

    let help = userID;

    const courses = document.createElement("div");
    courses.classList.add("course-container");

    if(user.courses[0] !== ''){
    user.courses.forEach((cours, coursID) => {
      const course = document.createElement("div");
      course.classList.add("course");

      const courseName = document.createElement("div");
      courseName.classList.add("course-name");
      courseName.innerText = `${cours}`;

      const btn = document.createElement("button");
      btn.innerText = "Remove";
      btn.addEventListener("click", () => {
        let helper = user.courses.filter((el,id) => {
          return coursID !== id
        })
        fetch(`https://lms-website-84545-default-rtdb.firebaseio.com/admin/teachers/-N9msDKYxLFZxWbLFeHS/-N9s1AWj7rkynad71XQt/${help}.json`,{
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courses: helper,
          }),
        }).then(()=>{
          location.reload();
        })
      });

      course.append(courseName, btn);
      courses.append(course);
    });
  }

    teacher.append(img, name, courses);

    teacherContainer.append(teacher);
  });
};

const teacherName = document.querySelector(".teacher-name");
const teacherMail = document.querySelector(".teacher-mail");
const teacherPassword = document.querySelector(".teacher-password");
const teacherImage = document.querySelector(".teacher-image");
const addTeacher = document.querySelector(".add-teacher-button");

addTeacher.addEventListener("click", () => {

  let helper = teachers;

  helper.push({
    id: "s" + Math.floor(Math.random() * 1000).toString(),
    name: teacherName.value,
    mail: teacherMail.value,
    password: teacherPassword.value,
    image: teacherImage.value,
    courses: [],
  });

  fetch(`https://lms-website-84545-default-rtdb.firebaseio.com/admin/teachers/-N9msDKYxLFZxWbLFeHS/-N9s1AWj7rkynad71XQt.json`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      6: {    id: "s" + Math.floor(Math.random() * 1000).toString(),
      name: teacherName.value,
      mail: teacherMail.value,
      password: teacherPassword.value,
      image: teacherImage.value,
      courses: [''],},
    }),
  }).then(()=>{
    location.reload();
  })


  teacherContainer.innerHTML = "";
  teacherName.value = "";
  teacherMail.value = "";
  teacherPassword.value = "";
  teacherImage.value = "";
});

//Removing teacher

const teacherID = document.querySelector(".remove-teacher input");
const removeTeacher = document.querySelector(".remove-teacher button");

removeTeacher.addEventListener("click", () => {
  fetch(`https://lms-website-84545-default-rtdb.firebaseio.com/admin/teachers/-N9msDKYxLFZxWbLFeHS/-N9s1AWj7rkynad71XQt/${teacherID.value}.json`,{
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(()=>{
    location.reload();
  })
});

//Teacher managment

const addT = document.querySelector(".add-actionT");
const removeT = document.querySelector(".remove-actionT");
const allT = document.querySelector(".all-actionT");
const addContainerT = document.querySelector(".add-teacher");
const removeContainerT = document.querySelector(".remove-teacher");

addT.addEventListener("click", () => {
  removeContainerT.style.display = "none";
  addContainerT.style.display = "grid";
  addContainerT.style.display = "grid";
  allT.style.display = "block";
});

removeT.addEventListener("click", () => {
  addContainerT.style.display = "none";
  removeContainerT.style.display = "flex";
  allT.style.display = "block";
});

allT.addEventListener("click", () => {
  addContainerT.style.display = "none";
  removeContainerT.style.display = "none";
  allT.style.display = "none";
});

//Course managment

let courses;

function getCourses(){
  fetch('https://lms-website-84545-default-rtdb.firebaseio.com/admin/courses/-N9ms9uuIKgJfkKHMVru.json')
  .then(res => res.json())
  .then(data => courses = data)
  .then(() => {
    addingCourse(courses)
  });
}

getCourses();

const addingCourse = (arr) => {
  arr.forEach((user, userID) => {
    const course = document.createElement("div");
    course.classList.add("single-course");

    const img = document.createElement("img");
    img.setAttribute("src", `${user.image}`);

    const name = document.createElement("span");
    name.innerText = `${user.name}`;
    name.classList.add("name");

    let help = userID;

    const teacherCarry = document.createElement("div");
    teacherCarry.classList.add("teacher-container");

    const teacher = document.createElement("div");
    teacher.classList.add("teacher-name");
    teacher.innerText = `${user.teacher[0]}`;

    teacherCarry.append(teacher);

    const studentC = document.createElement("div");
    studentC.classList.add("student-container");

    if(user.students[0] !== ''){
    user.students.forEach((val, studID) => {
      const student = document.createElement("div");
      student.classList.add("student");

      const studentID = document.createElement("div");
      studentID.classList.add("student-id");
      studentID.innerText = `${val}`;

      const btn = document.createElement("button");
      btn.innerText = "Remove";
      btn.addEventListener("click", () => {
        let helper = user.students.filter((el,id) => {
          return studID !== id
        })

        fetch(`https://lms-website-84545-default-rtdb.firebaseio.com/admin/courses/-N9ms9uuIKgJfkKHMVru/${help}.json`,{
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            students: helper,
          }),
        }).then(()=>{
          location.reload();
        })
      });

      student.append(studentID, btn);
      studentC.append(student);
    });
  }

    course.append(img, name, teacherCarry, studentC);

    courseContainer.append(course);
  });
};

const courseName = document.querySelector(".course-name-input");
const courseTeacher = document.querySelector(".course-teacher");
const courseImage = document.querySelector(".course-image");
const addCourse = document.querySelector(".add-course-button");

// addingCourse(courses);

addCourse.addEventListener("click", () => {

  let helper = courses;

  helper.push({
    id: "s" + Math.floor(Math.random() * 1000).toString(),
    name: courseName.value,
    image: courseImage.value,
    teacher: [courseTeacher.value],
    students: [],
  });

  fetch(`https://lms-website-84545-default-rtdb.firebaseio.com/admin/courses/-N9ms9uuIKgJfkKHMVru.json`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      5: {    id: "s" + Math.floor(Math.random() * 1000).toString(),
      name: courseName.value,
      image: courseImage.value,
      teacher: [courseTeacher.value],
      students: [''],}
    }),
  }).then(()=>{
    location.reload();
  })

  courseContainer.innerHTML = "";
  addingCourse(courses);
  courseName.value = "";
  courseTeacher.value = "";
  courseImage.value = "";
});

//Removing course

const courseID = document.querySelector(".remove-course input");
const removeCourse = document.querySelector(".remove-course button");
removeCourse.addEventListener("click", () => {
  fetch(`https://lms-website-84545-default-rtdb.firebaseio.com/admin/courses/-N9ms9uuIKgJfkKHMVru/${courseID.value}.json`,{
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(()=>{
    location.reload();
  })
});

//Course managment

const addC = document.querySelector(".add-actionC");
const removeC = document.querySelector(".remove-actionC");
const allC = document.querySelector(".all-actionC");
const addContainerC = document.querySelector(".add-course");
const removeContainerC = document.querySelector(".remove-course");
const assign = document.querySelector(".assign-actionS");
const assignContainer = document.querySelector(".assign-student");

addC.addEventListener("click", () => {
  assignContainer.style.display = "none";
  removeContainerC.style.display = "none";
  addContainerC.style.display = "grid";
  addContainerC.style.display = "grid";
  allC.style.display = "block";
});

removeC.addEventListener("click", () => {
  assignContainer.style.display = "none";
  addContainerC.style.display = "none";
  removeContainerC.style.display = "flex";
  allC.style.display = "block";
});

assign.addEventListener("click", () => {
  assignContainer.style.display = "grid";
  addContainerC.style.display = "none";
  removeContainerC.style.display = "none";
  allC.style.display = "block";
});

allC.addEventListener("click", () => {
  assignContainer.style.display = "none";
  addContainerC.style.display = "none";
  removeContainerC.style.display = "none";
  allC.style.display = "none";
});

//Assign course

const assignCourseId = document.querySelector(".assign-course-id");
const assignStudentName = document.querySelector(".assign-student-name");
const assignButton = document.querySelector(".assign-student button");

assignButton.addEventListener("click", () => {
  helper = courses[assignCourseId.value].students;

  helper.push(assignStudentName.value);

  fetch(`https://lms-website-84545-default-rtdb.firebaseio.com/admin/courses/-N9ms9uuIKgJfkKHMVru/${assignCourseId.value}.json`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      students: helper,
    }),
  }).then(() => {
    location.reload();
  })

  assignCourseId.value = "";
  assignStudentName.value = "";
  courseContainer.innerHTML = "";
});
