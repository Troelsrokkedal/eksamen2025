'use strict';

let selectedButton = null;
let draggingLine = null;
let mouseMoveListener = null;

const correctMatches = {
  btn1: 'dot1',
  btn2: 'dot2',
  btn3: 'dot3',
  btn4: 'dot4',
  btn5: 'dot5',
  btn6: 'dot6'
};

const usedButtons = new Set();
const usedDots = new Set();

document.querySelectorAll('.button-container button').forEach(button => {
  button.addEventListener('mousedown', (e) => {
    if (usedButtons.has(button.id)) return;

    selectedButton = button;

    // Get button position
    const rect = button.getBoundingClientRect();
    const startX = rect.right;
    const startY = rect.top + rect.height / 2;

    // Create the line element
    draggingLine = document.createElement('div');
    draggingLine.classList.add('connection-line');
    draggingLine.style.top = `${startY}px`;
    draggingLine.style.left = `${startX}px`;
    document.body.appendChild(draggingLine);

    // Listen for mouse move
    mouseMoveListener = (event) => {
      const endX = event.clientX;
      const endY = event.clientY;

      const dx = endX - startX;
      const dy = endY - startY;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      draggingLine.style.width = `${length}px`;
      draggingLine.style.transform = `rotate(${angle}deg)`;
    };

    document.addEventListener('mousemove', mouseMoveListener);
  });
});

document.addEventListener('mouseup', (event) => {
  if (!draggingLine || !selectedButton) return;

  const endX = event.clientX;
  const endY = event.clientY;

  let droppedOnDot = null;

  document.querySelectorAll('.red-dot').forEach(dot => {
    const rect = dot.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2;

    const dx = endX - centerX;
    const dy = endY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius) {
      droppedOnDot = dot;
    }
  });

  document.removeEventListener('mousemove', mouseMoveListener);

  if (droppedOnDot && !usedDots.has(droppedOnDot.id)) {
    // Recalculate final line from button to dot center
    const buttonRect = selectedButton.getBoundingClientRect();
    const dotRect = droppedOnDot.getBoundingClientRect();

    const startX = buttonRect.right;
    const startY = buttonRect.top + buttonRect.height / 2;
    const endX = dotRect.left + dotRect.width / 2;
    const endY = dotRect.top + dotRect.height / 2;

    const dx = endX - startX;
    const dy = endY - startY;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    draggingLine.style.width = `${length}px`;
    draggingLine.style.top = `${startY}px`;
    draggingLine.style.left = `${startX}px`;
    draggingLine.style.transform = `rotate(${angle}deg)`;

    // Color it based on correctness
    const correct = correctMatches[selectedButton.id] === droppedOnDot.id;
    draggingLine.style.backgroundColor = correct ? 'green' : 'red';

    // Mark used
    usedButtons.add(selectedButton.id);
    usedDots.add(droppedOnDot.id);
  } else {
    // Not dropped on a valid dot — remove the line
    draggingLine.remove();
  }

  // Reset
  selectedButton = null;
  draggingLine = null;
});
