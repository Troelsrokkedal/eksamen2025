'use strict'; // Gør JavaScript-strengere ved at fange fejl tidligt

document.addEventListener("DOMContentLoaded", function () {
    // Når hele dokumentet er indlæst, køres denne funktion

    // Hent alle elementer med klassen 'svarmulighed' (knapper eller lignende)
    const svarmuligheder = document.querySelectorAll(".svarmulighed");

    // Hent lydfilerne til korrekt og forkert svar
    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");

    // Tilføj klik-event til hver svarmulighed
    svarmuligheder.forEach(function (svar) {
        svar.addEventListener("click", function () {
            // Tjek om svaret er korrekt via attributten 'data-korrekt'
            if (svar.getAttribute("data-korrekt") === "true") {
                // Afspil korrekt lyd
                correctSound.play();

                // Vis overlay med resultat
                document.getElementById("resultat-overlay").style.display = "block";
            } else {
                // Afspil forkert lyd
                wrongSound.play();
            }
        });
    });
});