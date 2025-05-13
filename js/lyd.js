'use strict';


document.addEventListener("DOMContentLoaded", () => {
    const korrektKnap = document.getElementById("rigtigt-svar");
    const lyd = document.getElementById("correctSound");
  
    korrektKnap.addEventListener("click", () => {
      lyd.play().then(() => {
        console.log("✅ Lyd afspilles");
      }).catch((err) => {
        console.error("❌ Fejl ved afspilning:", err);
      });
  
      // Vis overlay
      const overlay = document.getElementById("resultat-overlay");
      overlay.classList.add("show");
    });
  });
  