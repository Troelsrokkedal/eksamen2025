'use strict';

const checkboxes = document.querySelectorAll('input[type="checkbox"][name="quiz"]');

checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        // Tæl hvor mange der er krydset af
        const checked = document.querySelectorAll('input[type="checkbox"][name="quiz"]:checked');

        // Hvis der er flere end 3 valgt – vis advarsel og fjern det seneste valg
        if (checked.length > 3) {
            cb.checked = false;
            alert("Du må kun vælge 3 udsagn.");
            return;
        }

        // Hvis præcis 3 er valgt – gå til næste side
        if (checked.length === 3) {
            setTimeout(() => {
                window.location.href = "amning3.html";
            }, 500); // 0.5 sekund forsinkelse, kan fjernes eller justeres
        }
    });
});