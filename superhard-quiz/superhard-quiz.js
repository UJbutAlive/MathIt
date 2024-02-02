document.addEventListener('DOMContentLoaded', () => {
  const questionContainer = document.getElementById('question-container');
  const answerInput = document.getElementById('answer-input');
  const submitBtn = document.getElementById('submit-btn');
  const scoreContainer = document.getElementById('score-container');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const homeBtn = document.getElementById('home-btn');
  let timerElement = document.getElementById('timer');
  let currentQuestion = null; // Store the current question and its answer
  const incorrectAnswers = []; // Array to store incorrect answers

  const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateQuestion = () => {
    const num1 = generateRandomNumber(1, 1000);
    const num2 = generateRandomNumber(1, 1000);
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let question, answer;

    if (operator === '/') {
      // Generate a division question with limited decimal places
      const dividend = generateRandomNumber(1, 1000);
      const divisor = generateRandomNumber(1, 10); // Limiting divisor to 2 digits for simplicity
      question = `${dividend} ${operator} ${divisor}`;
      answer = (dividend / divisor).toFixed(2); // Limiting answer to 2 decimal places
    } else {
      // Generate other types of questions
      question = `${num1} ${operator} ${num2}`;
      answer = eval(question);
    }

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
    let timeLeft = 30;
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
      timerElement.textContent = `${timeLeft < 10 ? '0' : ''}${timeLeft}`;
    }
  };

  const checkAnswer = (userAnswer) => {
    clearInterval(timer);
    const { question, answer } = currentQuestion; // Use the current question and its answer
    if (userAnswer === answer) {
      score += 1;
    } else {
      incorrectAnswers.push({ question, userAnswer, correctAnswer: answer });
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

    if (incorrectAnswers.length > 0) {
      const incorrectAnswersList = document.createElement('div');
      incorrectAnswersList.innerHTML = '<h3 class="incorrect-title">Incorrect Answers:</h3>'; // Apply class to incorrect title
      incorrectAnswers.forEach((incorrect) => {
        const { question, userAnswer, correctAnswer } = incorrect;
        const listItem = document.createElement('p');
        listItem.textContent = `${question} | Your Answer: ${userAnswer !== null ? userAnswer : 'Not attempted'} | Correct Answer: ${correctAnswer}`;
        incorrectAnswersList.appendChild(listItem);
      });
      scoreContainer.appendChild(incorrectAnswersList);
    }

    // Show home button
    homeBtn.style.display = 'block';
  };

  const displayNextQuestionOrEndQuiz = () => {
    if (currentQuestionIndex < 20) {
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

  homeBtn.addEventListener('click', () => {
    // Redirect to home page
    window.location.href = '../index.html';
  });

  // Initial display of the first question
  displayQuestion();
});
