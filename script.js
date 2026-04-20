const cards = document.querySelectorAll('.card');
const detailTitle = document.getElementById('detail-title');
const detailDescription = document.getElementById('detail-description');
const detailCode = document.getElementById('detail-code');
const detailMistake = document.getElementById('detail-mistake');
const detailFix = document.getElementById('detail-fix');
const detailPoints = document.getElementById('detail-points');
const copyButtons = document.querySelectorAll('.copy-btn');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageInfo = document.getElementById('page-info');
const lessonsSection = document.getElementById('lessons');

const cardsPerPage = 6;
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
    const y = lessonDetail.getBoundingClientRect().top + window.pageYOffset - navHeight - extraGap;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}


function showPage(page) {
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  let firstVisibleCard = null;

  cards.forEach((card, index) => {
    const isVisible = index >= start && index < end;
    card.style.display = isVisible ? 'block' : 'none';
    card.classList.remove('active');

    if (isVisible && !firstVisibleCard) {
      firstVisibleCard = card;
    }
  });

  if (pageInfo) {
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
  }

  if (prevBtn) {
    prevBtn.disabled = page === 1;
  }

  if (nextBtn) {
    nextBtn.disabled = page === totalPages;
  }

  loadCardDetails(firstVisibleCard, false);
}

function changePage(newPage) {
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  if (newPage < 1 || newPage > totalPages) return;

  currentPage = newPage;
  showPage(currentPage);

  const nav = document.querySelector('.nav');

if (lessonsSection) {
  const navHeight = nav ? nav.offsetHeight : 0;
  const extraGap = 10;
  const y = lessonsSection.getBoundingClientRect().top + window.pageYOffset - navHeight - extraGap;

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

showPage(currentPage);
