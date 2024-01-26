document.addEventListener('DOMContentLoaded', () => {
  const questionContainer = document.getElementById('question-container');
  const answerInput = document.getElementById('answer-input');
  const submitBtn = document.getElementById('submit-btn');
  const scoreContainer = document.getElementById('score-container');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  let timerElement = document.getElementById('timer');
  let currentQuestion = null; // Store the current question and its answer

  const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateQuestion = () => {
    const num1 = generateRandomNumber(1, 1000);
    const num2 = generateRandomNumber(1, 1000);
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const question = `${num1} ${operator} ${num2}`;
    const answer = eval(question);
    return { question, answer };
  };

  let currentQuestionIndex = 0;
  let score = 0;
  let timer;

  const displayQuestion = () => {
    currentQuestion = generateQuestion(); // Store the current question and its answer
    const { question } = currentQuestion;
    questionContainer.textContent = `Question ${currentQuestionIndex + 1}: ${question}`;
    answerInput.value = '';
    answerInput.focus();
    startTimer();

    // Disable submit button initially
    submitBtn.disabled = true;

    // Enable submit button only when answerInput has a valid number
    answerInput.addEventListener('input', () => {
      submitBtn.disabled = isNaN(parseFloat(answerInput.value));
    });
  };

  const startTimer = () => {
    let timeLeft = 60;
    updateTimer(timeLeft);
    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft >= 0) {
        updateTimer(timeLeft);
      } else {
        clearInterval(timer);
        checkAnswer(null); // Time's up, check answer with null value
      }
    }, 1000);
  };

  const updateTimer = (timeLeft) => {
    if (!timerElement) {
      timerElement = document.getElementById('timer');
    }
    if (timerElement) {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  };

  const checkAnswer = (userAnswer) => {
    clearInterval(timer);
    const { answer } = currentQuestion; // Use the current question and its answer
    if (userAnswer === answer) {
      score += 1;
    }
    currentQuestionIndex += 1;
    displayNextQuestionOrEndQuiz();
  };


  const endQuiz = () => {
    questionContainer.textContent = '';
    answerInput.style.display = 'none';
    submitBtn.style.display = 'none';
    timerElement.textContent = '';
    const totalQuestions = 20; // Update with the total number of questions
    scoreContainer.textContent = `Your score is ${score} out of ${totalQuestions}`; // Display user's score out of total questions
  };

  const displayNextQuestionOrEndQuiz = () => {
    if (currentQuestionIndex < 2) { 
      displayQuestion();
    } else {
      endQuiz();
    }
  };

  submitBtn.addEventListener('click', () => {
    const userAnswer = parseFloat(answerInput.value);
    checkAnswer(userAnswer);
  });

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Toggle the 'dark-mode' class on the body
  });

  // Initial display of the first question
  displayQuestion();
});
