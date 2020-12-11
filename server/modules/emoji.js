/*
 * Nom : Emoji !
 * Description : Il remplace le smiley tapé par le clavier
 * Auteurs : Jules Cannet et Léo Piazza
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleEmoji: handleEmoji // permet d'appeler cette méthode dans server.js -> daffy.handleEmoji(...)
}

/**
 * Lorsqu'on écrit un des émojis en clavier, il remplace le caractère
 */
function handleEmoji(io, message)
{	
    if(message.includes(':)')) 
        message = message.replace(':)', '&#128522;');

    if(message.includes(':('))
        message = message.replace(':(', '&#128543;'); 

    if(message.includes(':D'))
        message = message.replace(':D', '&#128513;');

    if(message.includes(';('))
        message = message.replace(';(', '&#128557;');

    if(message.includes(';)'))
        message = message.replace(';)', '&#128521;');

    if(message.includes(':/'))
        message = message.replace(':/', '&#128533;');

    if(message.includes(':o'))
        message = message.replace(':o', '&#128558;');

    return message;
}

