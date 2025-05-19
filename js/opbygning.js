'use strict'; // Streng tilstand for bedre fejlhåndtering

// Variabler til at holde styr på valgt knap og linje der trækkes
let selectedButton = null;
let draggingLine = null;
let mouseMoveListener = null;

// Objekt over korrekte match mellem knapper og prikker
const correctMatches = {
  btn1: 'dot1',
  btn2: 'dot2',
  btn3: 'dot3',
  btn4: 'dot4',
  btn5: 'dot5',
  btn6: 'dot6'
};

// Foruddefinerede startpunkter for linjer (ved knapperne)
const fixedStartPoints = {
  btn1: { x: 320, y: 50 },
  btn2: { x: 320, y: 230 },
  btn3: { x: 320, y: 410 },
  btn4: { x: 320, y: 590 },
  btn5: { x: 320, y: 760 },
  btn6: { x: 320, y: 940 }
};

// Foruddefinerede slutpunkter for linjer (ved prikkerne)
const fixedEndPoints = {
  dot1: { x: 705, y: 575 },
  dot2: { x: 1237, y: 72 },
  dot3: { x: 1015, y: 435 },
  dot4: { x: 1120, y: 310 },
  dot5: { x: 1298, y: 570 },
  dot6: { x: 1137, y: 830 }
};

// Brugte knapper og prikker gemmes for at forhindre genbrug
const usedButtons = new Set();
const usedDots = new Set();

// Finder midten af et element på siden
function getCenter(el) {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY
  };
}

// Event listener for klik på hver knap
document.querySelectorAll('.button-container button').forEach(button => {
  button.addEventListener('mousedown', () => {
    if (usedButtons.has(button.id)) return; // Ignorer hvis knappen allerede er brugt

    selectedButton = button;
    const start = fixedStartPoints[button.id];

    // Opret ny linje
    draggingLine = document.createElement('div');
    draggingLine.classList.add('connection-line');
    draggingLine.style.top = `${start.y}px`;
    draggingLine.style.left = `${start.x}px`;
    document.body.appendChild(draggingLine);

    // Lyt efter musebevægelse mens man trækker
    mouseMoveListener = (e) => {
      const end = { x: e.pageX, y: e.pageY };
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Opdater linjens længde og vinkel i realtid
      draggingLine.style.width = `${length}px`;
      draggingLine.style.transform = `rotate(${angle}deg)`;
    };

    document.addEventListener('mousemove', mouseMoveListener);
  });
});

// Når man slipper musen
document.addEventListener('mouseup', (e) => {
  if (!draggingLine || !selectedButton) return;

  const endPoint = { x: e.pageX, y: e.pageY };
  let matchedDot = null;

  // Find ud af om brugeren har sluppet musen over en rød prik
  document.querySelectorAll('.red-dot').forEach(dot => {
    const dotCenter = getCenter(dot);
    const radius = dot.offsetWidth / 2;
    const dx = endPoint.x - dotCenter.x;
    const dy = endPoint.y - dotCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius) {
      matchedDot = dot;
    }
  });

  // Fjern mousemove-listener
  document.removeEventListener('mousemove', mouseMoveListener);

  if (matchedDot && !usedDots.has(matchedDot.id)) {
    // Match fundet og prik ikke brugt før
    const start = fixedStartPoints[selectedButton.id];
    const end = fixedEndPoints[matchedDot.id];

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Opdater linjen til endelig placering
    draggingLine.style.width = `${length}px`;
    draggingLine.style.top = `${start.y}px`;
    draggingLine.style.left = `${start.x}px`;
    draggingLine.style.transform = `rotate(${angle}deg)`;

    // Gør linjen grøn hvis korrekt, ellers rød
    const correct = correctMatches[selectedButton.id] === matchedDot.id;
    draggingLine.style.backgroundColor = correct ? 'green' : 'red';

    // Gem brugt knap og prik
    usedButtons.add(selectedButton.id);
    usedDots.add(matchedDot.id);
  } else {
    // Hvis ingen gyldig prik – fjern linjen
    draggingLine.remove();
  }

  // Nulstil variabler
  selectedButton = null;
  draggingLine = null;
});