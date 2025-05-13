'use strict';


// Hent overlay og lyd
const overlay = document.getElementById("resultat-overlay");
const lyd = document.getElementById("correctSound");

// Hent alle svar-knapper
const knapper = document.querySelectorAll(".svarmulighed");

// Rigtigt svar er knappe-c
knapper.forEach(knap => {
    knap.addEventListener("click", () => {
        if (knap.classList.contains("knappe-c")) {
            lyd.play();                       // Spil lyd
            overlay.classList.add("show");    // Vis overlay
        } else {
            // Gør ingenting – forkert svar ignoreres
        }
    });
});