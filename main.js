let questionNum = document.querySelector(".count span")
let category = document.querySelector(".category span")
let bullet = document.querySelector(".bullet")
let bulletSpanContainer = document.querySelector(".bullet .spans")
let quiz = document.querySelector(".quiz .question")
let answers = document.querySelector(".answers")
let submitBtn = document.querySelector(".submit-button")
let countdown = document.querySelector(".countdown")

let current = 0
let rightAnswers = 0
let countInterval
function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){
        // check state of api
        if (this.readyState === 4 && this.status == 200){
            let questions = JSON.parse(this.responseText)
            console.log(questions);

            // add question num 
            let questionCount = questions.length
            questionNum.innerHTML = questionCount
            category.innerHTML = questions[current].category
            countDown(20 , questionCount)
            createBullets(questionCount)
            addQuestion(questions[current] , questionCount)
            

            submitBtn.onclick = () => {

                category.innerHTML = questions[current].category

                // get correct answer
                let correctAnswer = questions[current].correctAnswer
                
                // get next question
                current++;

                // check answer
                checkAnswer(correctAnswer , questionCount)

                // to change question
                quiz.innerHTML = " "
                answers.innerHTML = " "
                addQuestion(questions[current] , questionCount)

                // update bullets
                handleBullets()

                // result
                checkResult(questionCount)

            }
        }
    }

    myRequest.open("Get", "question.json" ,true)
    myRequest.send()
}

getQuestions()

function createBullets(num){
    for (let i = 0 ; i < num ; i++){

       let theBullet = document.createElement("span");
        if(i===0){
            theBullet.className = "active"
        }
       bulletSpanContainer.appendChild(theBullet);

    }
}

function handleBullets(){
    let bullets = document.querySelectorAll(".bullet .spans span")
    let bulletsArray = Array.from(bullets)
        console.log(bulletsArray);
    
    
    bulletsArray.forEach((span , index) => {
     
        if(current === index){
            span.className = "active"
        }
    })
}

function addQuestion(obj , num){
   if(current < num){
     // add quiz question
    let questionTitle = document.createElement("h2")
    let questionText = document.createTextNode(obj['question'])
    questionTitle.appendChild(questionText)
    quiz.appendChild(questionTitle)

    // make answers
    for( let i = 0 ; i < 4 ; i++){
        // create main dev
        let mainDev = document.createElement("div")
        mainDev.className = 'answer'

        // create radio answers
        let radioInput = document.createElement("input")
        radioInput.name = "question"
        radioInput.id = `answer_${i}`
        radioInput.type = "radio"
        radioInput.dataset.answer = obj.options[`${i}`]

        // create label
        let theLabel = document.createElement("label")
        theLabel.htmlFor = `answer_${i}`
        let textLabel = document.createTextNode(obj.options[`${i}`])
        theLabel.appendChild(textLabel)

        // add radio & label to dev
        mainDev.appendChild(radioInput)
        mainDev.appendChild(theLabel)
        
        // add main dev to dev answers
        answers.appendChild(mainDev)

    }
   }
}

function checkAnswer(cAnswer , qcount){

    let answers = document.getElementsByName("question")
    let currentAnswer

    for(let i = 0 ; i < 4 ; i++){
        if(answers[i].checked){
            currentAnswer = answers[i].dataset.answer
        }
    }

    if(cAnswer === currentAnswer){
        rightAnswers++
    }
}

function checkResult(qcount){
    let result
    console.log(current);
    console.log(qcount);
    
    if(current === qcount){
        quiz.remove()
        answers.remove()
        submitBtn.remove()
        bulletSpanContainer.remove()

        if(rightAnswers > qcount/2)
        {
            result = `<h2>good</h2>`
        }else{
            result = `<h2>bad</h2>`
        }

        bullet.innerHTML = result
    }
}

function countDown(duration , qcount){
    if (current < qcount){
        let minute , second
        countInterval = setInterval(function(){
            minute = parseInt(duration / 60)
            second = parseInt(duration % 60)

            minute = minute < 10 ? `0${minute}` : minute
            second = second < 10 ? `0${second}` : second
            countdown.innerHTML = `${minute} : ${second}`

            if(--duration < 0){
                clearInterval(countInterval)
                countdown.innerHTML = `<h4>Finished</h4>`
                 quiz.remove()
                answers.remove()
                submitBtn.remove()
                bulletSpanContainer.remove()

                if(rightAnswers > qcount/2)
                {
                    result = `<h2>good</h2>`
                }else{
                    result = `<h2>bad</h2>`
                }

                bullet.innerHTML = result
                    }
        }, 1000)
    }
}



// [
//   {
//     "category": "HTML",
//     "question": "What does HTML stand for?",
//     "options": ["HyperText Markup Language", "HighText Machine Language", "Hyper Tool Multi Language", "Home Tool Markup Language"],
//     "correctAnswer": "HyperText Markup Language",
//     "explanation": "HTML stands for HyperText Markup Language and it is used to structure content on the web."
//   },
//   {
//     "category": "HTML",
//     "question": "Which attribute specifies an image source in the <img> tag?",
//     "options": ["alt", "href", "src", "link"],
//     "correctAnswer": "src",
//     "explanation": "The 'src' attribute defines the path or URL to the image file."
//   },
//   {
//     "category": "HTML",
//     "question": "Which element is used to insert a line break?",
//     "options": ["<lb>", "<break>", "<br>", "<line>"],
//     "correctAnswer": "<br>",
//     "explanation": "The <br> tag inserts a single line break."
//   },
//   {
//     "category": "HTML",
//     "question": "Which tag is used to define a table row?",
//     "options": ["<td>", "<tr>", "<th>", "<table-row>"],
//     "correctAnswer": "<tr>",
//     "explanation": "The <tr> tag defines a table row inside a table."
//   },
//   {
//     "category": "HTML",
//     "question": "Which HTML element is used to display a numbered list?",
//     "options": ["<ol>", "<ul>", "<dl>", "<list>"],
//     "correctAnswer": "<ol>",
//     "explanation": "The <ol> tag defines an ordered (numbered) list."
//   },
//   {
//     "category": "HTML",
//     "question": "What is the correct HTML element for inserting a paragraph?",
//     "options": ["<p>", "<para>", "<text>", "<paragraph>"],
//     "correctAnswer": "<p>",
//     "explanation": "The <p> tag is used for paragraphs."
//   },
//   {
//     "category": "HTML",
//     "question": "Which tag is used to define the largest heading in HTML?",
//     "options": ["<heading>", "<h6>", "<h1>", "<head>"],
//     "correctAnswer": "<h1>",
//     "explanation": "Headings in HTML range from <h1> (largest) to <h6> (smallest)."
//   },

//   {
//     "category": "CSS",
//     "question": "What does CSS stand for?",
//     "options": ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Syntax", "Colorful Style Syntax"],
//     "correctAnswer": "Cascading Style Sheets",
//     "explanation": "CSS stands for Cascading Style Sheets and it defines the look and formatting of a webpage."
//   },
//   {
//     "category": "CSS",
//     "question": "Which property changes the text color?",
//     "options": ["font-color", "text-style", "color", "text-color"],
//     "correctAnswer": "color",
//     "explanation": "The 'color' property in CSS is used to change text color."
//   },
//   {
//     "category": "CSS",
//     "question": "Which value of the position property places an element relative to its first positioned ancestor?",
//     "options": ["absolute", "fixed", "relative", "static"],
//     "correctAnswer": "absolute",
//     "explanation": "Position: absolute positions the element relative to its nearest positioned ancestor."
//   },
//   {
//     "category": "CSS",
//     "question": "What is the default value of the position property?",
//     "options": ["absolute", "relative", "fixed", "static"],
//     "correctAnswer": "static",
//     "explanation": "By default, elements have 'position: static', meaning they are positioned normally in the flow."
//   },
//   {
//     "category": "CSS",
//     "question": "Which CSS property is used to make text bold?",
//     "options": ["font-weight", "text-bold", "font-style", "bold"],
//     "correctAnswer": "font-weight",
//     "explanation": "The 'font-weight' property controls how thick or bold the text appears."
//   },
//   {
//     "category": "CSS",
//     "question": "Which unit is relative to the root element’s font size?",
//     "options": ["em", "px", "rem", "%"],
//     "correctAnswer": "rem",
//     "explanation": "'rem' stands for root em, and it’s based on the root font-size, not the parent."
//   },
//   {
//     "category": "CSS",
//     "question": "Which property adds space between an element’s border and its content?",
//     "options": ["margin", "border", "padding", "spacing"],
//     "correctAnswer": "padding",
//     "explanation": "Padding creates space inside the element, between the content and its border."
//   },

//   {
//     "category": "JavaScript",
//     "question": "Which keyword is used to declare a variable in JavaScript?",
//     "options": ["var", "let", "const", "All of the above"],
//     "correctAnswer": "All of the above",
//     "explanation": "You can declare variables with var, let, or const in JavaScript."
//   },
//   {
//     "category": "JavaScript",
//     "question": "What is the output of '2' + 2 in JavaScript?",
//     "options": ["4", "22", "NaN", "undefined"],
//     "correctAnswer": "22",
//     "explanation": "JavaScript performs string concatenation when one operand is a string."
//   },
//   {
//     "category": "JavaScript",
//     "question": "Which of the following is NOT a JavaScript data type?",
//     "options": ["String", "Boolean", "Float", "Object"],
//     "correctAnswer": "Float",
//     "explanation": "JavaScript does not have a separate 'float' type; all numbers are of type 'number'."
//   },
//   {
//     "category": "JavaScript",
//     "question": "Which function is used to parse an integer from a string?",
//     "options": ["parseInt()", "parseFloat()", "Number()", "String()"],
//     "correctAnswer": "parseInt()",
//     "explanation": "parseInt() extracts an integer from a string."
//   },
//   {
//     "category": "JavaScript",
//     "question": "Which symbol is used for single-line comments?",
//     "options": ["//", "/* */", "#", "<!-- -->"],
//     "correctAnswer": "//",
//     "explanation": "Single-line comments in JavaScript start with //."
//   },
//   {
//     "category": "JavaScript",
//     "question": "Which statement is used to exit a loop in JavaScript?",
//     "options": ["exit", "return", "break", "stop"],
//     "correctAnswer": "break",
//     "explanation": "The 'break' statement immediately terminates a loop or switch statement."
//   }
// ]
