'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("resultat");

    // Vis overlay når brugeren klikker første gang
    document.body.addEventListener("click", function () {
        overlay.classList.add("show");
    }, { once: true });

    // Luk overlay hvis der klikkes udenfor brystet (knappen)
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            overlay.classList.remove("show");
        }
    });
});