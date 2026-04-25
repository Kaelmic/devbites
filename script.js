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
    button.addEventListener('click', async () => {
      const targetId = button.dataset.copy || button.dataset.copyTarget;
      const target = document.getElementById(targetId);

      if (!target) return;

      try {
        await navigator.clipboard.writeText(target.textContent);
        const originalText = button.textContent;
        button.textContent = 'Copied!';

        setTimeout(() => {
          button.textContent = originalText;
        }, 1200);
      } catch (error) {
        button.textContent = 'Failed';

        setTimeout(() => {
          button.textContent = 'Copy';
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
