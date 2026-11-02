// ===============================
// Фильтры известных талантливых людей
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const famousCards = document.querySelectorAll(".famous-card");
  const filterStatus = document.getElementById("filterStatus");

  const filterLabels = {
    all: "все таланты",
    sport: "спорт",
    music: "музыка",
    science: "наука",
    art: "искусство",
    technology: "технологии"
  };

  function applyFilter(filter) {
    let visibleCount = 0;

    famousCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = filter === "all" || category === filter;

      card.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (filterStatus) {
      filterStatus.textContent =
        `Показаны: ${filterLabels[filter] || filterLabels.all} (${visibleCount})`;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      if (Object.prototype.hasOwnProperty.call(filterLabels, filter)) {
        applyFilter(filter);
      }
    });
  });

  // При загрузке показываем все карточки.
  applyFilter("all");

  // ===============================
  // Интерактивный тест о талантах
  // ===============================
  const questions = [
    {
      question: "Что тебе больше нравится делать?",
      answers: [
        ["Создавать что-то красивое", "creative"],
        ["Разгадывать задачи и загадки", "logic"],
        ["Помогать и общаться с людьми", "social"],
        ["Двигаться, выступать и организовывать", "action"]
      ]
    },
    {
      question: "Какой проект ты бы выбрал(а)?",
      answers: [
        ["Сделать рисунок, видео или песню", "creative"],
        ["Собрать устройство или решить задачу", "logic"],
        ["Организовать командную работу", "social"],
        ["Провести соревнование или выступление", "action"]
      ]
    },
    {
      question: "Что приносит тебе больше радости?",
      answers: [
        ["Придумывать что-то новое", "creative"],
        ["Находить правильный ответ", "logic"],
        ["Видеть, что кому-то помог(ла)", "social"],
        ["Достигать цели и быть в движении", "action"]
      ]
    }
  ];

  const results = {
    creative: {
      title: "Творческая искра ✨",
      text: "Возможно, твоя сильная сторона — воображение и умение создавать новое. Попробуй рисование, музыку, дизайн, фотографию или видео."
    },
    logic: {
      title: "Ум исследователя 🧠",
      text: "Тебе может нравиться анализировать, искать ответы и разбираться в сложных вещах. Попробуй математику, шахматы, науку или программирование."
    },
    social: {
      title: "Сила общения 💛",
      text: "Возможно, ты умеешь понимать людей, поддерживать их и работать вместе. Попробуй волонтёрство, наставничество, дебаты или командные проекты."
    },
    action: {
      title: "Энергия лидера ⚡",
      text: "Тебе может быть близко действие, движение и организация. Попробуй спорт, сценические выступления, организацию мероприятий или лидерские проекты."
    }
  };

  let questionIndex = 0;
  const scores = { creative: 0, logic: 0, social: 0, action: 0 };

  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");
  const hint = document.getElementById("quizHint");
  const resultEl = document.getElementById("result");
  const restartButton = document.getElementById("restart");

  function renderQuestion() {
    if (!questionEl || !answersEl) return;

    const question = questions[questionIndex];
    questionEl.textContent = question.question;

    if (progressText) {
      progressText.textContent = `ВОПРОС ${questionIndex + 1} ИЗ ${questions.length}`;
    }
    if (progressBar) {
      progressBar.style.width =
        `${((questionIndex + 1) / questions.length) * 100}%`;
    }

    answersEl.innerHTML = "";
    question.answers.forEach(([label, type]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", () => chooseAnswer(type));
      answersEl.appendChild(button);
    });
  }

  function chooseAnswer(type) {
    if (!Object.prototype.hasOwnProperty.call(scores, type)) return;

    scores[type] += 1;
    questionIndex += 1;

    if (questionIndex < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    const winner = Object.keys(scores).reduce((best, type) =>
      scores[type] > scores[best] ? type : best
    , "creative");

    questionEl.hidden = true;
    answersEl.hidden = true;
    if (hint) hint.hidden = true;
    if (resultEl) resultEl.hidden = false;

    document.getElementById("resultTitle").textContent = results[winner].title;
    document.getElementById("resultText").textContent = results[winner].text;

    if (progressText) progressText.textContent = "ТВОЙ РЕЗУЛЬТАТ";
    if (progressBar) progressBar.style.width = "100%";
  }

  if (restartButton) {
    restartButton.addEventListener("click", () => {
      questionIndex = 0;
      Object.keys(scores).forEach((type) => { scores[type] = 0; });

      questionEl.hidden = false;
      answersEl.hidden = false;
      if (hint) hint.hidden = false;
      if (resultEl) resultEl.hidden = true;

      renderQuestion();
    });
  }

  renderQuestion();

  // ===============================
  // Мобильное меню
  // ===============================
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});
