'user strict'

document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById("info-overlay");
    const knap = document.getElementById("videreKnap");

    knap.addEventListener("click", function(e) {
        e.preventDefault(); // Forhindrer evt. link-navigation
        overlay.classList.add("show");

        // Hvis du vil have den til at forsvinde igen efter et stykke tid:
        // setTimeout(() => {
        //     overlay.classList.remove("show");
        // }, 3000);
        document.addEventListener("DOMContentLoaded", function() {
            const overlay = document.getElementById("info-overlay");
        
            setTimeout(function() {
                overlay.classList.add("show");
            }, 30000); // 30.000 millisekunder = 30 sekunder
        });
    });
});