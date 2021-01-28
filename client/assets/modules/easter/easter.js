/*
* Nom : Trouve le Petit cercle Bot
* Description : Ce module te fais chercher un point caché sur l'écran, sauras-tu le retrouver ?
* Auteur(s) : Romain-Maxime
 */

 // Créer la div pt pour positionner le point
$('body').append($('<div id="pt"></div>'));
$('body').click(checkEasterPosition);

// On créer la variable qui servira pour récupérer les coordonnées du point
var easterPos = null;

// On défini une variable pour appeller notre musique
var music = new Audio('modules/easter/src/popopo.mp3');

// On appelle la fonction (pos) pour récupérer les coordonnées du point en fonction de la taille de notre fenêtre
socket.on('easter_pos', function(pos)
{
    easterPos = {
        x: pos.x * $(window).width(),
        y: pos.y * $(window).height()
    };
    
    
    $('#pt').css('left', easterPos.x);
    $('#pt').css('top', easterPos.y);
});

/**
 * On récupère les coordonnées du cercle 
 */
function checkEasterPosition(evt)
{
    if (easterPos == null)
            return;

    var x = evt.clientX;
    var y = evt.clientY;


    // Calcul distance entre les coordonnées du clic et du cercle = pythagore
    var distX = easterPos.x - x;
    var distY = easterPos.y - y;
    var distance = Math.sqrt(distX * distX + distY * distY);

    
    // gestion des clicks et des indices 
    if (distance < 50)
    {
        // Dès que le client trouve le point on envois un message
        socket.emit('easter_end');
        //lancement de la musique lorsque l'easter egg est trouvé
        music.volume = 0.1;
        music.play();

        // On réinitialise la position du cercle
		easterPos = null;
        
    }
    else if (distance < 100)
    receiveMessage({name: 'Easter', message:'brulant'});

    else if (distance < 200)
    receiveMessage({name: 'Easter', message:'chaud'});

    else if (distance < 300)
     receiveMessage({name: 'Easter', message:'ca chauffe'});

    else if (distance < 400)
    receiveMessage({name: 'Easter', message:'froid'});

    else if (distance < 1600)
    receiveMessage({name: 'Easter', message:'glacial'});

}