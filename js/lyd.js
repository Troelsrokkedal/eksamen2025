'use strict';


document.addEventListener("DOMContentLoaded", function () {
    // Hent alle svarmuligheder
    const svarmuligheder = document.querySelectorAll(".svarmulighed");

    // Hent lydfilene
    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");

    // Lyt til klik på svarmulighederne
    svarmuligheder.forEach(function (svar) {
        svar.addEventListener("click", function () {
            // Tjek om det er det rigtige svar (hvis data-korrekt="true")
            if (svar.getAttribute("data-korrekt") === "true") {
                // Afspil den rigtige lyd
                correctSound.play();

                // Vis resultatet
                document.getElementById("resultat-overlay").style.display = "block";
            } else {
                // Afspil den forkerte lyd
                wrongSound.play();
            }
        });
    });
});
