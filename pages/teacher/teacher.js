const burgerMenu = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const moveToTop = document.querySelector(".moveToTop");

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


const lectureInput = document.querySelectorAll('.lecture input');
const lectureTextarea = document.querySelectorAll('.lecture textarea');
const addLectureBtn = document.querySelectorAll('.lecture button');
const lectureContainer = document.querySelectorAll('.lecture-container');

addLectureBtn.forEach((btn,id) => {
  btn.addEventListener('click', () => {

    const bigTitle = document.createElement('h1');
    bigTitle.style = 
    `font: 500 3rem sans-serif;
    margin: 1rem 0;`
    bigTitle.innerText = 'Lecture';

    const title = document.createElement('h5');
    title.innerText = `${lectureInput[id].value}`;
    title.style = 
    `font: 300 3rem sans-serif;
    margin: 1rem 0;`

    const text = document.createElement('p');
    text.innerText = `${lectureTextarea[id].value}`;
    text.style = 
    `font: 300 2rem serif;
    margin: 1rem 0;`

    lectureContainer.style = 
    `display: flex;
    flex-direction: column;
    align-items: flex-start;`
    lectureContainer[id].append(bigTitle, title, text);

    lectureInput[id].value = '';
    lectureTextarea[id].value = '';
  })
})


const q1 = document.querySelectorAll('.q1');
const q2 = document.querySelectorAll('.q2');
const q3 = document.querySelectorAll('.q3');
const q4 = document.querySelectorAll('.q4');
const q5 = document.querySelectorAll('.q5');
const quizBtn = document.querySelectorAll('.add-quiz');
const quizContainer = document.querySelectorAll('.quiz-container');

quizBtn.forEach((btn,id) => {
  btn.addEventListener('click', () => {
    const title = document.createElement('h1');
    title.style = `
    font: 500 3rem sans-serif;
    margin: 1rem 0;
    `
    title.innerText = 'QUIZ';

    const p1 = document.createElement('p');
    p1.innerText = `${q1[id].value}`;
    p1.style = `
    font: 300 2.5rem sans-serif;
    margin: 1rem 0;
    `
    const p2 = document.createElement('p');
    p2.innerText = `${q2[id].value}`;
    p2.style = `
    font: 300 2.5rem sans-serif;
    margin: 1rem 0;
    `
    const p3 = document.createElement('p');
    p3.innerText = `${q3[id].value}`;
    p3.style = `
    font: 300 2.5rem sans-serif;
    margin: 1rem 0;
    `
    const p4 = document.createElement('p');
    p4.innerText = `${q4[id].value}`;
    p4.style = `
    font: 300 2.5rem sans-serif;
    margin: 1rem 0;
    `
    const p5 = document.createElement('p');
    p5.innerText = `${q5[id].value}`;
    p5.style = `
    font: 300 2.5rem sans-serif;
    margin: 1rem 0;
    `

    quizContainer[id].append(title, p1, p2, p3, p4, p5);

    q1[id].value = '';
    q2[id].value = '';
    q3[id].value = '';
    q4[id].value = '';
    q5[id].value = '';
  })
})

const removeButton = document.querySelectorAll('.remove');
const student = document.querySelectorAll('.student');

removeButton.forEach((btn,id) => {
  btn.addEventListener('click', () => {
    student[id].remove();
  })
})

let teacher;

function getData(){
  fetch('https://lms-website-84545-default-rtdb.firebaseio.com/teachers/-N9mkUr_hX2sdN1WPihg/0/courses.json')
  .then(res => res.json())
  .then(data => teacher = data)
  .then(()=>{
    teacher.forEach((el,id) => {
      createTeacher(el, id);
    })
  })
}

getData();

const courses = document.querySelector('#courses');

function createTeacher(user, userId){

  const lecturesArray = user.lectures;
  const quizArray = user.quiz;

  const course = document.createElement('div');
  course.classList.add('course');

  const courseInfo = document.createElement('div');
  courseInfo.classList.add('course-info');

  const image = document.createElement('img');
  image.setAttribute('src', `${user.image}`)

  const info = document.createElement('div');
  info.classList.add('info');

  const name = document.createElement('h5');
  name.innerText = `${user.name}`;

  const paragraph = document.createElement('p');
  const span1 = document.createElement('span');
  span1.innerText = `${user.desc[0]}`;
  const span2 = document.createElement('span');
  span2.innerText = `${user.desc[1]}`;
  span2.classList.add('color');
  paragraph.append(span1, span2);

  const btn = document.createElement('button');
  btn.classList.add('drop');
  btn.innerText = 'Drop course';
  btn.addEventListener('click', () => {

    let courseArray = teacher.filter((el, id) => {
      return userId !== id;
    });


    // console.log(user);
    fetch(
      `https://lms-website-84545-default-rtdb.firebaseio.com/teachers/-N9mkUr_hX2sdN1WPihg/0.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courses: courseArray,
        }),
      }
    )
      .then(() => {
          location.reload();
      });
  })

  info.append(name, paragraph, btn);

  courseInfo.append(image, info);

  const add = document.createElement('div');
  add.classList.add('add');

  const action = document.createElement('div');
  action.classList.add('action');

  const button1 = document.createElement('button');
  button1.classList.add('action-lecture');
  button1.innerText = 'Add Lecture'
  const button2 = document.createElement('button');
  button2.classList.add('action-quiz');
  button2.innerText = 'Add Quiz';
  const button3 = document.createElement('button');
  button3.classList.add('action-close');
  button3.innerText = 'Close'

  action.append(button1, button2, button3);

  const lecture = document.createElement('div');
  lecture.classList.add('lecture');

  const titleDiv = document.createElement('div');
  const titleSpan = document.createElement('span');
  titleSpan.innerText = 'Title';
  const titleInput = document.createElement('input');
  titleDiv.append(titleSpan, titleInput);
  const titleTxtDiv = document.createElement('div');
  titleTxtDiv.classList.add('txt');
  const txtSpan = document.createElement('span');
  txtSpan.innerText = 'Text'
  const textarea = document.createElement('textarea');
  titleTxtDiv.append(txtSpan, textarea);
  const lectureButton = document.createElement('button');
  lectureButton.classList.add('add-lecture');
  lectureButton.innerText = 'Add';
  lectureButton.addEventListener('click', () => {
    
    if(lecturesArray[0] === ''){
      lecturesArray.splice(0, 1);
      lecturesArray.push({title: titleInput.value, text: textarea.value})
    }else{
      lecturesArray.push({title: titleInput.value, text: textarea.value})
    }



    fetch(
      `https://lms-website-84545-default-rtdb.firebaseio.com/teachers/-N9mkUr_hX2sdN1WPihg/0/courses/${userId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lectures: lecturesArray,
        }),
      }
    )
      .then(() => {
          location.reload();
      });
  })

  lecture.append(titleDiv, titleTxtDiv, lectureButton);

  const quiz = document.createElement('div');
  quiz.classList.add('quiz');

  const quizDiv1 = document.createElement('div');
  const quizSpan1 = document.createElement('span');
  quizSpan1.innerText = 'Question 1';
  const quizInput1 = document.createElement('input');
  quizInput1.classList.add('q1');
  quizDiv1.append(quizSpan1, quizInput1);

  const quizDiv2 = document.createElement('div');
  const quizSpan2 = document.createElement('span');
  quizSpan2.innerText = 'Question 2';
  const quizInput2 = document.createElement('input');
  quizInput2.classList.add('q2');
  quizDiv2.append(quizSpan2, quizInput2);

  const quizDiv3 = document.createElement('div');
  const quizSpan3 = document.createElement('span');
  quizSpan3.innerText = 'Question 3';
  const quizInput3 = document.createElement('input');
  quizInput3.classList.add('q3');
  quizDiv3.append(quizSpan3, quizInput3);

  const quizDiv4 = document.createElement('div');
  const quizSpan4 = document.createElement('span');
  quizSpan4.innerText = 'Question 4';
  const quizInput4 = document.createElement('input');
  quizInput4.classList.add('q4');
  quizDiv4.append(quizSpan4, quizInput4);

  const quizDiv5 = document.createElement('div');
  const quizSpan5 = document.createElement('span');
  quizSpan5.innerText = 'Question 5';
  const quizInput5 = document.createElement('input');
  quizInput5.classList.add('q5');
  quizDiv5.append(quizSpan5, quizInput5);
  const addQuizBtn = document.createElement('button');
  addQuizBtn.classList.add('add-quiz');
  addQuizBtn.innerText = 'Add';
  addQuizBtn.addEventListener('click', () => {

    if(quizArray[0] === ''){
      quizArray.splice(0, 1);
      quizArray.push({q1: quizInput1.value, q2: quizInput2.value, q3: quizInput3.value, q4: quizInput4.value, q5: quizInput5.value});
    }else{
      quizArray.push({q1: quizInput1.value, q2: quizInput2.value, q3: quizInput3.value, q4: quizInput4.value, q5: quizInput5.value});
    }




    fetch(
      `https://lms-website-84545-default-rtdb.firebaseio.com/teachers/-N9mkUr_hX2sdN1WPihg/0/courses/${userId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quiz: quizArray,
        }),
      }
    )
      .then(() => {
          location.reload();
      });
  })


  quiz.append(quizDiv1, quizDiv2, quizDiv3, quizDiv4, quizDiv5, addQuizBtn);

  add.append(action, lecture, quiz);

  course.append(courseInfo, add);

  const lContainer = document.createElement('div');
  lContainer.classList.add('lecture-container');

  const qContainer = document.createElement('div');
  qContainer.classList.add('quiz-container');
  
  let studentsArr = document.createElement('section');

  user.students.forEach((student,id) => {
    const container = document.createElement('div');
    container.classList.add('student');

    const studentName = document.createElement('div');
    studentName.classList.add('name');
    studentName.innerText = `${student.name}`;

    const studentStatus = document.createElement('div');
    studentStatus.classList.add('status');

    const studentSpan1 = document.createElement('span');
    studentSpan1.innerText = 'Marked: '
    const studentSpan2 = document.createElement('span');
    studentSpan2.innerText = 'True';
    studentSpan2.classList.add('color');
    studentStatus.append(studentSpan1, studentSpan2);

    const studentButton = document.createElement('button');
    studentButton.classList.add('remove');
    studentButton.innerText = 'Remove';
    
    studentButton.addEventListener('click', () => {
      //Filter without selected student
      let studentsArray = user.students.filter((el, elID) => {
        return elID !== id;
      });

      // Send new array to database
      fetch(
        `https://lms-website-84545-default-rtdb.firebaseio.com/teachers/-N9mkUr_hX2sdN1WPihg/0/courses/${userId.json}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            students: studentsArray,
          }),
        }
      )
        .then(() => {
            location.reload();
        });
    })

    container.append(studentName, studentStatus, studentButton);
    studentsArr.append(container);
  })
    if(lecturesArray[0] !== ''){
      lecturesArray.forEach(el => {
        const container = document.createElement('div');
        container.style = `margin: 3rem 0;`
        const lectureHeading = document.createElement('h1');
        lectureHeading.innerText = 'Lecture';
        lectureHeading.style = `font: 600 5rem sans-serif`;
        const heading = document.createElement('h5');
        heading.style = `font: 300 2rem sans-serif;`
        heading.innerText = `${el.title}`;
        const text = document.createElement('p');
        text.style = `font: 300 1.5rem serif;`
        text.innerText = `${el.text}`;
        container.append(heading, text);
    
        lContainer.append(lectureHeading, container);
      })
    }


    if(quizArray[0] !== ''){
      quizArray.forEach(el => {
        const container = document.createElement('div');
        container.style = `margin: 3rem 0;`
        const lectureHeading = document.createElement('h1');
        lectureHeading.innerText = 'Quiz';
        lectureHeading.style = `font: 600 5rem sans-serif`;
  
        const q1 = document.createElement('p');
        q1.innerText = `${el.q1}`;
        q1.style = `font: 300 2rem sans-serif`;
        const q2 = document.createElement('p');
        q2.innerText = `${el.q2}`;
        q2.style = `font: 300 2rem sans-serif`;
        const q3 = document.createElement('p');
        q3.innerText = `${el.q3}`;
        q3.style = `font: 300 2rem sans-serif`;
        const q4 = document.createElement('p');
        q4.innerText = `${el.q4}`;
        q4.style = `font: 300 2rem sans-serif`;
        const q5 = document.createElement('p');
        q5.innerText = `${el.q5}`;
        q5.style = `font: 300 2rem sans-serif`;
  
        container.append(q1, q2, q3, q4, q5);
    
        qContainer.append(lectureHeading, container);
      })
    }

  courses.append(course, lContainer, qContainer, studentsArr);

  const close = document.querySelectorAll('.action-close');

close.forEach((btn,id) => {
  btn.addEventListener('click', () => {
    lectures[id].style.display = 'none';
    quizs[id].style.display = 'none';
    close[id].style.display = 'none';
  })
})

const addLecture = document.querySelectorAll('.action-lecture');
const lectures = document.querySelectorAll('.lecture');

addLecture.forEach((btn,id) => {
  btn.addEventListener('click', () => {
    lectures[id].style.display = 'flex';
    close[id].style.display = 'block';
    quizs[id].style.display = 'none';
  })
})

const addQuiz = document.querySelectorAll('.action-quiz');
const quizs = document.querySelectorAll('.quiz');

addQuiz.forEach((btn,id) => {
  btn.addEventListener('click', () => {
    quizs[id].style.display = 'grid';
    close[id].style.display = 'block';
    lectures[id].style.display = 'none';
  })
})
}

