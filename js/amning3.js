'use strict';

document.addEventListener("DOMContentLoaded", function () {
    // Find overlay-elementet (brystet)
    const overlay = document.getElementById("resultat");

    // Vis overlayen (brystet) efter 30 sekunder
    setTimeout(function () {
        overlay.classList.add("show");
    }, 30000); // 30.000 millisekunder = 30 sekunder

    // Klik udenfor knappen lukker overlayen igen
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            overlay.classList.remove("show");
        }
    });
});