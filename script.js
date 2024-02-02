function startGame(difficulty) {
  // Redirects to levels
  switch (difficulty) {
    case 'easy':
      window.location.href = 'easy-quiz/easy-quiz.html?difficulty=easy';
      break;
    case 'medium':
      window.location.href = 'medium-quiz/medium-quiz.html?difficulty=medium';
      break;
    case 'hard':
      window.location.href = 'hard-quiz/hard-quiz.html?difficulty=hard';
      break;
    case 'superhard':
      window.location.href = 'superhard-quiz/superhard-quiz.html?difficulty=superhard';
    default:
      break;
  }
}
