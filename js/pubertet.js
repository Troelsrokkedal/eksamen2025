'use strict';

const svarKnapper = document.querySelectorAll('.svarmulighed');
const overlayRigtigt = document.getElementById('resultat-overlay');
const overlayForkert = document.getElementById('forkert-overlay');
const korrektKnap = document.getElementById('rigtigt-svar');

svarKnapper.forEach(knap => {
  knap.addEventListener('click', () => {
    if (knap.dataset.korrekt === "true") {
        overlayRigtigt.classList.add('show');
        const lyd = document.getElementById('correctSound');
        if (lyd) lyd.play();
      } else {
        overlayForkert.classList.add('show');
        const lyd = document.getElementById('wrongSound');
        if (lyd) lyd.play();
      }
  });
});

// Klik udenfor for at lukke overlays
[overlayRigtigt, overlayForkert].forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
    }
  });
});