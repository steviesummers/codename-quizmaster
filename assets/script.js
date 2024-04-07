const questions = [
    {
      question: "What is the result of 2 + 2?",
      answers: ["3", "4", "5", "6"],
      correctAnswer: "4"
    },
    {
      question: "What does CSS stand for?",
      answers: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
      correctAnswer: "Cascading Style Sheets"
    },
    {
      question: "What does HTML stand for?",
      answers: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language", "Hyperlink Markup Language"],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "A ___ is a data type that can only have values of True of False",
        answers: ["Integer", "Floating Point", "String", "Boolean"],
        correctAnswer: "Boolean"
      },
    {
      question: "What does JS stand for?",
      answers: ["Java Style", "JavaScript", "Just Saying", "Jolly Script"],
      correctAnswer: "JavaScript"
    },
    {
        question: "What Git command is needed for commiting from the terminal?",
        answers: ["git -m", "git clone", "git add -A", "save"],
        correctAnswer: "git add -A"
      },
      {
        question: "String values must be held within ___ when being assigned value.",
        answers: ["Quotation Marks", "Curly Brackets", "Your hand", "Single Quotation Marks"],
        correctAnswer: "Curly Brackets"
      },
      {
        question: "____ is traditionally a sequence of characters, either as a literal constant or as some kind of variable. .",
        answers: ["A string", "An array", "Javascript", "Ancient Summarian"],
        correctAnswer: "A string"
      }
      
  ];
  
  const quizContainer = document.getElementById('quiz-container');
  const questionContainer = document.getElementById('question-container');
  const startBtn = document.getElementById('start-btn');
  const timeLeftDisplay = document.getElementById('time-left');
  const feedbackDisplay = document.getElementById('feedback');
  
  let currentQuestionIndex = 0;
  let timeLeft = 60;
  let correctAnswers = 0;
  let timer;
  
  function startQuiz() {
    // Start timer
    timer = setInterval(() => {
      timeLeft--;
      timeLeftDisplay.textContent = timeLeft;
  
      if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  
    displayQuestion();
  }
  
  function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
      <h2>${question.question}</h2>
      <ul id="answer-list">
        ${question.answers.map(answer => `<li>${answer}</li>`).join('')}
      </ul>
    `;
  }
  
  function handleAnswer(event) {
    if (event.target.tagName === 'LI') {
      const selectedAnswer = event.target.textContent;
      const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  
      if (selectedAnswer === correctAnswer) {
        feedbackDisplay.textContent = 'Correct!';
        correctAnswers++;
      } else {
        // Handle incorrect answer
        feedbackDisplay.textContent = 'Incorrect!';
        deductTime(); // Deduct time for incorrect answer
      }
  
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }
  }
  
  function deductTime() {
    timeLeft -= 10; // Deduct 10 seconds for incorrect answer
    if (timeLeft < 0) {
      timeLeft = 0; 
    }
    timeLeftDisplay.textContent = timeLeft;
  }
  
  function endQuiz() {
    const score = (correctAnswers / questions.length) * 100;
    alert(`Quiz ended! Your score: ${score.toFixed(2)}%`);
  }
  

  startBtn.addEventListener('click', startQuiz);
  questionContainer.addEventListener('click', handleAnswer);
  