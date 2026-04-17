  const cards = document.querySelectorAll('.card');
  const detailTitle = document.getElementById('detail-title');
  const detailDescription = document.getElementById('detail-description');
  const detailCode = document.getElementById('detail-code');
  const detailMistake = document.getElementById('detail-mistake');
  const detailFix = document.getElementById('detail-fix');
  const detailPoints = document.getElementById('detail-points');
  const copyButtons = document.querySelectorAll('.copy-btn');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
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
      document.getElementById('lesson-detail').scrollIntoView({
  behavior: 'smooth'
});
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
