  const cards = document.querySelectorAll('.card');
  const detailTitle = document.getElementById('detail-title');
  const detailDescription = document.getElementById('detail-description');
  const detailCode = document.getElementById('detail-code');
  const detailMistake = document.getElementById('detail-mistake');
  const detailFix = document.getElementById('detail-fix');
  const detailPoints = document.getElementById('detail-points');
  const copyButtons = document.querySelectorAll('.copy-btn');
  const pageNumbers = document.getElementById('page-numbers');

  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const lessonsSection = document.getElementById('lessons');

  const heroTitle = document.getElementById('hero-title');
  const heroCode = document.getElementById('hero-code');
  const heroDesc = document.getElementById('hero-desc');
  const heroCard = document.getElementById('hero-card');
  const tabButtons = document.querySelectorAll('.tab-filter');
  let activeFilter = 'all';

const showHintsBtn = document.getElementById("show-hints-btn");
const hintsList = document.getElementById("project-hints");

showHintsBtn.addEventListener("click", () => {
  hintsList.classList.toggle("hidden");

  showHintsBtn.textContent =
    hintsList.classList.contains("hidden")
      ? "Show Hints"
      : "Hide Hints";
});

const showCodeBtn = document.getElementById("show-code-btn");
const codeBlock = document.getElementById("code-block");

showCodeBtn.addEventListener("click", () => {
  codeBlock.classList.toggle("hidden");

  showCodeBtn.textContent =
    codeBlock.classList.contains("hidden")
      ? "Reveal Solution"
      : "Hide Solution";
});

  const projects = {
  tip: {
    title: "💸 Tip Splitter",
    description: "Split a bill between people with optional tip.",

    challenge: "Build a program that asks for bill amount, number of people, and tip %, then calculates how much each person should pay.",

    hints: [
      "You need to convert input into numbers",
      "Tip is a percentage → divide by 100",
      "Add tip to the total before splitting",
      "Divide total by number of people"
    ],

    code: `bill = float(input("Bill: "))
people = int(input("People: "))
tip = int(input("Tip %: "))

total = bill + (bill * tip / 100)
each = total / people

print(f"Each person pays: {round(each, 2)}")`
  },

  password: {
    title: "🔐 Password Generator",
    description: "Create a simple random password using letters and numbers.",

    challenge: "Build a program that asks for password length, then generates a random password using letters and numbers.",

    hints: [
      "Use the random module",
      "Create a string of allowed characters",
      "Use a loop to pick random characters",
      "Add each character to the password",
      "Print the final password"
    ],

    code: `import random

characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

length = int(input("Password length: "))

password = ""

for i in range(length):
    password += random.choice(characters)

print("Your password:", password)`
  },

  "secure-password": {
    title: "🛡️ Secure Password Generator",
    description: "Create a stronger password using secrets and symbols.",

    challenge: "Build a more secure password generator that uses letters, numbers, and symbols with cryptographically stronger randomness.",

    hints: [
      "Use the secrets module instead of random",
      "Include letters, numbers, and symbols",
      "Ask the user for password length",
      "Use secrets.choice() to pick each character",
      "Join all characters into one final password"
    ],

    code: `import secrets
import string

letters = string.ascii_letters
numbers = string.digits
symbols = string.punctuation

characters = letters + numbers + symbols

length = int(input("Password length: "))

password = ""

for i in range(length):
    password += secrets.choice(characters)

print("Your secure password:", password)`
  }
};

window.openProject = function (id) {
  const project = projects[id];
  if (!project) return;

  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-description").textContent = project.description;
  document.getElementById("project-challenge").textContent = project.challenge;
  document.getElementById("project-code").textContent = project.code;
  document.querySelector('.code-header span').textContent =
  project.title.toLowerCase().replace(/ /g, "_") + ".py";

  const hintsList = document.getElementById("project-hints");
  hintsList.innerHTML = "";

  project.hints.forEach(hint => {
    const li = document.createElement("li");
    li.textContent = hint;
    hintsList.appendChild(li);
  });

  document.getElementById("project-viewer").classList.remove("hidden");

  // reset states
  hintsList.classList.add("hidden");
  document.getElementById("code-block").classList.add("hidden");
};

 const heroLessons = [
  {
    title: 'Why "10" is not equal to 10',
    code: `user_input = input("Enter a number: ")

if user_input == 10:
    print("Correct")
else:
    print("Wrong")`,
    desc: `<strong style="color: var(--text);">What happened?</strong> Input returns a string, not an integer.`
  },
  {
    title: 'Why print() gets glued together',
    code: `print("Loading", end="")
print("...")`,
    desc: `<strong style="color: var(--text);">What happened?</strong> <code>end=""</code> removes the default new line.`
  },
  {
    title: 'Why modifying one list changes another',
    code: `a = [1, 2, 3]
b = a

b.append(4)

print(a)`,
    desc: `<strong style="color: var(--text);">What happened?</strong> Both variables point to the same list in memory.`
  }
];

  let heroIndex = 0;

function updateHeroLesson() {
  if (!heroTitle || !heroCode || !heroDesc) return;

  const lesson = heroLessons[heroIndex];

  heroTitle.textContent = lesson.title;
  heroCode.textContent = lesson.code;
  heroDesc.innerHTML = lesson.desc;
}


  function autoSlideHero() {
  const heroInner = document.getElementById('hero-inner');

  if (!heroInner) return;

  heroInner.classList.add('fade-out');

  setTimeout(() => {
    heroIndex = (heroIndex + 1) % heroLessons.length;
    updateHeroLesson();
    heroInner.classList.remove('fade-out');
  }, 600);
}

  const cardsPerPage = 8;
  let currentPage = 1;

  function loadCardDetails(card, shouldScroll = false) {
    if (!card) return;

    cards.forEach((c) => c.classList.remove('active'));
    card.classList.add('active');

    detailTitle.textContent = card.dataset.title || '';
    detailDescription.textContent = card.dataset.description || '';
    detailCode.textContent = (card.dataset.code || '').replace(/\\n/g, '\n');
    detailMistake.textContent = card.dataset.mistake || '';
    detailFix.textContent = (card.dataset.fix || '').replace(/\\n/g, '\n');

    detailPoints.innerHTML = '';

    (card.dataset.points || '').split('|').forEach((point) => {
      if (point.trim()) {
        const li = document.createElement('li');
        li.textContent = point.trim();
        detailPoints.appendChild(li);
      }
    });

    const lessonDetail = document.getElementById('lesson-detail');
    const nav = document.querySelector('.nav');

    if (shouldScroll && lessonDetail) {
      const navHeight = nav ? nav.offsetHeight : 0;
      const extraGap = 10;
      const y =
        lessonDetail.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight -
        extraGap;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }

  function getFilteredCards() {
    return Array.from(cards).filter((card) => {
      return activeFilter === 'all' || card.dataset.category === activeFilter;
    });
  }

  function showPage(page) {
    const filteredCards = getFilteredCards();

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    let firstVisibleCard = null;

    cards.forEach((card) => {
      card.style.display = 'none';
      card.classList.remove('active');
    });

    filteredCards.forEach((card, index) => {
      const isVisible = index >= start && index < end;

      if (isVisible) {
        card.style.display = 'block';

        if (!firstVisibleCard) {
          firstVisibleCard = card;
        }
      }
    });

    if (prevBtn) {
      prevBtn.disabled = page === 1;
    }

    if (nextBtn) {
      nextBtn.disabled = page === totalPages || totalPages === 0;
    }

    renderPageNumbers(totalPages);

    if (firstVisibleCard) {
      loadCardDetails(firstVisibleCard, false);
    } else {
      detailTitle.textContent = 'No lessons yet';
      detailDescription.textContent = 'No lessons found for this category.';
      detailCode.textContent = '';
      detailMistake.textContent = '';
      detailFix.textContent = '';
      detailPoints.innerHTML = '';
    }
  }

  function changePage(newPage) {
    const totalPages = Math.ceil(getFilteredCards().length / cardsPerPage);

    if (newPage < 1 || newPage > totalPages) return;

    currentPage = newPage;
    showPage(currentPage);

    const nav = document.querySelector('.nav');

    if (lessonsSection) {
      const navHeight = nav ? nav.offsetHeight : 0;
      const extraGap = 10;
      const y =
        lessonsSection.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight -
        extraGap;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }
  function renderPageNumbers(totalPages) {
    if (!pageNumbers) return;

    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;

      if (i === currentPage) {
        pageBtn.classList.add('active-page');
      }

      pageBtn.addEventListener('click', () => {
        changePage(i);
      });

      pageNumbers.appendChild(pageBtn);
    }
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      changePage(currentPage - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      changePage(currentPage + 1);
    });
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      loadCardDetails(card, true);
    });
  });

  copyButtons.forEach((button) => {
    document.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('copy-btn')) return;

  const targetId = e.target.dataset.copy || e.target.dataset.copyTarget;
  const target = document.getElementById(targetId);

  if (!target) return;

  try {
    await navigator.clipboard.writeText(target.textContent);

    const originalText = e.target.textContent;
    e.target.textContent = 'Copied!';

    setTimeout(() => {
      e.target.textContent = originalText;
    }, 1200);
  } catch (error) {
    e.target.textContent = 'Failed';

    setTimeout(() => {
      e.target.textContent = 'Copy';
    }, 1200);
  }
});
  });

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((btn) => btn.classList.remove('active-tab'));
      button.classList.add('active-tab');

      activeFilter = button.dataset.filter;
      currentPage = 1;

      showPage(currentPage);
    });
  });

  updateHeroLesson();
setInterval(autoSlideHero, 8000);

showPage(currentPage);
