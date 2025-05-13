'use strict';

const svarKnapper = document.querySelectorAll('.svarmulighed');
const overlay = document.getElementById('resultat-overlay');

svarKnapper.forEach(knap => {
  knap.addEventListener('click', () => {
    overlay.classList.add('show');
  });
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('show');
  }
});