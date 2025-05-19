'use strict'; // Gør JavaScript-strengere ved at fange fejl tidligt

// Henter alle svar-knapper med klassen 'svarmulighed'
const svarKnapper = document.querySelectorAll('.svarmulighed');

// Henter overlays for rigtigt og forkert svar
const overlayRigtigt = document.getElementById('resultat-overlay');
const overlayForkert = document.getElementById('forkert-overlay');

// Henter knappen med det korrekte svar (bruges evt. til noget andet)
const korrektKnap = document.getElementById('rigtigt-svar');

// Lytter efter klik på hver svarmulighed
svarKnapper.forEach(knap => {
  knap.addEventListener('click', () => {
    // Tjekker om det valgte svar er korrekt via data-attribut
    if (knap.dataset.korrekt === "true") {
      // Viser overlay for korrekt svar
      overlayRigtigt.classList.add('show');

      // Afspiller korrekt-lyd hvis den findes
      const lyd = document.getElementById('correctSound');
      if (lyd) lyd.play();
    } else {
      // Viser overlay for forkert svar
      overlayForkert.classList.add('show');

      // Afspiller forkert-lyd hvis den findes
      const lyd = document.getElementById('wrongSound');
      if (lyd) lyd.play();
    }
  });
});

// Gør det muligt at lukke overlays ved at klikke udenfor indholdet
[overlayRigtigt, overlayForkert].forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    // Luk kun overlay hvis man klikker direkte på baggrunden
    if (e.target === overlay) {
      overlay.classList.remove('show');
    }
  });
});