'user strict'

 // Vælg alle svar-knapperne
 const svarKnapper = document.querySelectorAll('.svarmulighed');
 const resultatKnap = document.getElementById('resultat');

 // Tilføj klik-event til hver knap
 svarKnapper.forEach(knap => {
   knap.addEventListener('click', () => {
     // Vis knappen (fjerner display: none)
     resultatKnap.style.display = 'block';

     // Lille forsinkelse, så transition kan aktiveres
     setTimeout(() => {
       resultatKnap.classList.add('show');
     }, 200);
   });
 });