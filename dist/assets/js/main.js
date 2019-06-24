$(document).ready(function() {

    /* Ouverture Fermeture navigation*/ 
    var navClick = $('.nav a');
    var navToggle = $('.itemsMenu');

    navClick.on('click', function() {
        navToggle.toggleClass('itemsMenuOpen');
    })
})