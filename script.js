    const cards = document.querySelectorAll('.card');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const detailCode = document.getElementById('detail-code');
    const detailMistake = document.getElementById('detail-mistake');
    const detailFix = document.getElementById('detail-fix');
    const detailPoints = document.getElementById('detail-points');

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        cards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');

        detailTitle.textContent = card.dataset.title;
        detailDescription.textContent = card.dataset.description;
        detailCode.textContent = card.dataset.code;
        detailMistake.textContent = card.dataset.mistake;
        detailFix.textContent = card.dataset.fix;

        detailPoints.innerHTML = '';
        card.dataset.points.split('|').forEach((point) => {
          const li = document.createElement('li');
          li.textContent = point;
          detailPoints.appendChild(li);
        });
      });
    });