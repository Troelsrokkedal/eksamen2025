'use strict'; 


// koden nedenfor holder styr på hvilken knap der er valgt og hvilken linje der er ved at blive trukket samt musens bevægelse//

let selectedButton = null;
let draggingLine = null;
let mouseMoveListener = null;

// knapperne og prikkerne er defineret herunder, så de kan bruges i koden nedenfor.//
const correctMatches = {
  btn1: 'dot1',
  btn2: 'dot2',
  btn3: 'dot3',
  btn4: 'dot4',
  btn5: 'dot5',
  btn6: 'dot6'
};

// hver knap og prik får tildelt faste kordinater hvor linjen skal starte og slutte.//
const fixedStartPoints = {
  btn1: { x: 320, y: 50 },
  btn2: { x: 320, y: 230 },
  btn3: { x: 320, y: 410 },
  btn4: { x: 320, y: 590 },
  btn5: { x: 320, y: 760 },
  btn6: { x: 320, y: 940 }
};


const fixedEndPoints = {
  dot1: { x: 705, y: 575 },
  dot2: { x: 1237, y: 72 },
  dot3: { x: 1015, y: 435 },
  dot4: { x: 1120, y: 310 },
  dot5: { x: 1298, y: 570 },
  dot6: { x: 1137, y: 830 }
};

// holder styr på hvilke knapper og prikker der allerede er blevet brugt, så de ikke kan bruges igen.//
const usedButtons = new Set();
const usedDots = new Set();

// finder præcise center af html siden. Window.scrollX og window.scrollY bruges til at tage højde for scrollbars og zoom.//
function getCenter(el) {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY
  };
}

//Starter træklinje process når brugeren trykker på en knap. Først tjekkes der om knappen er brugt, derefter en div som er vores linje som positioneres rigtigt i forhold til kassen. Til sidst starter en mousemovelistner som opdateres som man bevæger musen.//
document.querySelectorAll('.button-container button').forEach(button => {
  button.addEventListener('mousedown', () => {
    //tjekker om knap allerede er brugt og stopper funktionen hvis den er.//
    if (usedButtons.has(button.id)) return;

    //gemmer valgte knap og finder start punkt for knappen.//
     selectedButton = button;
    const start = fixedStartPoints[button.id];

    //opretter nyt HTML element som bliver linje og styler dette element. Start punkt for venstre ende af linje//
    draggingLine = document.createElement('div');
    draggingLine.classList.add('connection-line');
    draggingLine.style.top = `${start.y}px`;
    draggingLine.style.left = `${start.x}px`;
    document.body.appendChild(draggingLine);

    //Finder musens aktuelle position og bestemmer hvad der skal ske når musen bevæges.//
    mouseMoveListener = (e) => {
      const end = { x: e.pageX, y: e.pageY };
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      //styrer linjens længde og roterer den i forhold til musens position.//
      draggingLine.style.width = `${length}px`;
      draggingLine.style.transform = `rotate(${angle}deg)`;
    };
    //tilføjer mousemove event listener til dokumentet så linjen følger musen.//
    document.addEventListener('mousemove', mouseMoveListener);
  });
});

document.addEventListener('mouseup', (e) => {
  //stopper funktionen hvis der ikke er nogen linje der bliver trukket eller ingen knap valgt.//
  if (!draggingLine || !selectedButton) return;

  const endPoint = { x: e.pageX, y: e.pageY };
  let matchedDot = null;

  //gemmer musens position og finder center af prikkerne.//
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

 //fjerner mousemove event listener og tjekker om der er fundet en prik hvis der ikke er fundet en prik, fjernes linjen.//

  document.removeEventListener('mousemove', mouseMoveListener);

  if (matchedDot && !usedDots.has(matchedDot.id)) {
    
    const start = fixedStartPoints[selectedButton.id];
    const end = fixedEndPoints[matchedDot.id];

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);


    draggingLine.style.width = `${length}px`;
    draggingLine.style.top = `${start.y}px`;
    draggingLine.style.left = `${start.x}px`;
    draggingLine.style.transform = `rotate(${angle}deg)`;

    //tjekker om knappen og prikken matcher og farver linjen grøn hvis ja eller rød hvis nej.//
    const correct = correctMatches[selectedButton.id] === matchedDot.id;
    draggingLine.style.backgroundColor = correct ? 'green' : 'red';

    //markerede knappen og prikken som brugt så de ikke kan bruges igen.//
    usedButtons.add(selectedButton.id);
    usedDots.add(matchedDot.id);
  } else {
    // hvis der ikke er fundet en prik, fjernes linjen og knappen nulstilles.//
    draggingLine.remove();
  }

  // nulstiller knappen og linjen.//
  selectedButton = null;
  draggingLine = null;
});