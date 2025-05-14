'use strict';

const svarKnapper = document.querySelectorAll('.svarmulighed');
const overlayRigtigt = document.getElementById('resultat-overlay');
const overlayForkert = document.getElementById('forkert-overlay');
const korrektKnap = document.getElementById('rigtigt-svar');

svarKnapper.forEach(knap => {
  knap.addEventListener('click', () => {
    if (knap === korrektKnap) {
      overlayRigtigt.classList.add('show');
      // Afspil lyd hvis ønsket
      const lyd = document.getElementById('correctSound');
      if (lyd) lyd.play();
    } else {
      overlayForkert.classList.add('show');
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