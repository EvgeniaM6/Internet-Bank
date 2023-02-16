import config from '../../data/config';
import { IQuiz } from '../../data/types';

class BuildQuiz {
  async main() {
    const main = document.querySelector('.main-container');
    const quiz = document.querySelector('.header__nav-quiz');
    if (!main || !quiz) return;

    quiz.classList.add('header__nav_active');
    main.innerHTML = `<div class="quiz-container">
      <h2 class="quiz__title">Quiz</h2>
      <div class="quiz__game">
      <p class="quiz__about">We offer you to pass a small test. Check your knowledge of financial literacy. Try to answer as much as possible questions. Good luck! To start press button:</p>
      <button class="quiz__game_button-start">Start</button>
      </div>
    </div>`;
    const questions = await this.getQuestions();
    const start = document.querySelector('.quiz__game_button-start');
    start?.addEventListener('click', () => this.game(questions));
  }

  async getQuestions() {
    const data = await (await fetch(`${config.server}/quiz`)).json();
    const questions = await data.questions;
    return questions;
  }

  async game(questions: IQuiz[], i = 0, score = 0) {
    const game = document.querySelector('.quiz__game');

    if (!game || !questions) return;

    game.innerHTML = `<h3 class="quiz__question_num"><span class="quiz__question_num-q">Question</span> <span class="quiz__question_num-n">${
      i + 1
    }</span><h3>
    <h4 class="quiz__score"><span class="quiz__score_s">Score:</span> <span class="quiz__score_n">${score}</span></h4>
    <p class="quiz__question"></p>
    <ul class="quiz__answers"></ul>
    <p class="quiz__description"></p>
    <p class="quiz__result"><p>
    <button class="quiz__game_button-next">${i + 1 === questions.length ? 'Try again' : 'Next'}</button>`;
    const question = document.querySelector('.quiz__question');
    const quizAnswers = document.querySelector('.quiz__answers');
    const description = document.querySelector('.quiz__description');
    const next = document.querySelector('.quiz__game_button-next');
    const id = questions[i].id;
    const showScore = document.querySelector('.quiz__score_n');

    if (!question || !quizAnswers || !description || !next || !showScore) return;
    {
      question.innerHTML = `${questions[i].question.en}`;
      for (let j = 0; j < questions[i].answers.en.length; j++) {
        const li = document.createElement('li');
        li.classList.add('quiz__answers_item');
        li.innerHTML = `${questions[i].answers.en[j]}`;
        quizAnswers.appendChild(li);
      }
    }

    let isAnswered = false;
    const answers = document.querySelectorAll('.quiz__answers_item');
    answers.forEach((answer) => {
      answer.addEventListener('click', async () => {
        if (isAnswered) return;
        isAnswered = true;
        const data = (
          await fetch(`${config.server}/quiz`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              answers: [
                {
                  id: id,
                  answer: answer.innerHTML,
                },
              ],
            }),
          })
        ).json();
        data.then((result) => {
          description.innerHTML = `${questions[i].desc.en}`;
          if (result.result === 1) {
            answer.classList.add('quiz__answers_item-correct');
            score++;
            showScore.innerHTML = `${score}`;
          } else answer.classList.add('quiz__answers_item-wrong');
          next.classList.add('quiz__game_button-next-active');
          i++;
          if (i === questions.length) this.showResult(score);
        });
      });
    });

    next.addEventListener('click', async () => {
      if (!next.classList.contains('quiz__game_button-next-active')) return;

      if (i !== questions.length) {
        this.game(questions, i, score);
        return;
      }
      const newQuestions = await this.getQuestions();
      this.game(newQuestions, 0, 0);
    });
  }

  showResult(score: number) {
    const result = document.querySelector('.quiz__result');
    if (!result) return;

    switch (score) {
      case 0:
        result.innerHTML = '0/5 - You a looser! A-ha-ha';
        break;
      case 1:
        result.innerHTML = '1/5 - It is better then nothing';
        break;
      case 2:
        result.innerHTML = '2/5 - Something went wrong';
        break;
      case 3:
        result.innerHTML = '3/5 - You was near';
        break;
      case 4:
        result.innerHTML = '4/5 - Nearly! Next time will be better';
        break;
      case 5:
        result.innerHTML = '5/5 - Great! Not like the rss test';
        break;
    }
  }
}

export const buildQuiz = new BuildQuiz();
