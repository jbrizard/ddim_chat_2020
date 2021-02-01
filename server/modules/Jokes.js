/*
* Nom : Jokes Bot
* Description : Ce module te raconte les meilleurs blagues de ta vie, plutôt beau gosse n'est ce pas ?
* Auteur(s) : Romain-Maxime
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
    handlejokes: onNewMessage, // permet d'appeler cette méthode dans server.js -> jokes.handlejokes
    initJoke: initJoke // permet d'appeler cette méthode dans server.js -> jokes.initJoke
}

// Crée et initialise un tableau à 2 dimensions que l'on remplit de blagues. Il servira à la fonction sendJoke qui choisira une blague au hasard dans le tableau
var tabjokes = [
    ["C\'est l'histoire du nain au 26 enfants.", "Elle est courte mais elle est Bonne."],
    ["C'est l'histoire du pinguin qui respire par le cul.", "un jour il s'assoit et il meurt."],
    ["C'est quoi un rat sans queue ?", "Un raccourcit."],
    ["C'est quoi le plus dur à mixer dans un légume.", "Le fauteuil roulant."],
    ["Qu'est-ce qui est plus horrible qu'un bebe dans une poubelle ?", "Un bebe dans 2 poubelles.."],
    ["Un jour Dieu demanda à David de guetter.", "Depuis ce jour David Guetta."],
    ["Qu'est-ce qui est jaune et qui fait crac crac ?", "Un poussin sous ma botte."],
    ["Hiroshima 45, Tchernobyl 86.", "Windows 98"],
    ["Comment un informaticien tente-t-il de réparer sa voiture lorsqu’elle a un problème ?", "Il sort de la voiture, ferme toutes les fenêtres, retourne dans la voiture, et essaie de redémarrer."],
    ["Quelle est la différence entre un virus est windows Vista ?", "Le virus est gratuit."],
    
];

/**
 * Fonction qui envois une joke toute les x secondes, qui se déclenche x secondes après l'arrivé sur le chat. (ici x = 60)
 */
function initJoke(io)
{
    setInterval(function(){ sendJoke(io); }, 120000);
}

/**
 * Fonction appelée lorsqu'on reçoit un nouveau message
 */
function onNewMessage(io, message)
{
    if(message.toLowerCase().includes('hey bg'))
    {
        sendMessage(io, 'Non c\'est toi le BG');
    }

    if (message.toLowerCase().includes('dis moi une blague bg') || message.includes('joke') || message.includes('fais moi rire') || message.toLowerCase().includes('blague') )
    {          
        sendJoke(io);
    }
}

/**
 * Fonction qui envoi une blague random en 2 temps
 */
function sendJoke(io)
{
    var rdm = Math.random() * tabjokes.length;
    rdm = Math.floor(rdm);
                
    var joke = tabjokes[rdm];

    sendMessage(io, joke[0]);
        
    setTimeout(function()
    {
        sendMessage(io, joke[1]); 
    }, 5000);
}

/**
 * Fonction qui envoi un message
 */
function sendMessage(io, message)
{
    setTimeout(function()
    {
        io.sockets.emit('new_message',
        {
            name:'BG',
            message: message
        });
    }, 700);
}