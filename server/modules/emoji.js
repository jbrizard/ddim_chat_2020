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
    console.log(message);
    if(message.includes(':)'))
    {
        message = message.replace(':)', '&#128522;');
    }
    else if(message.includes(':('))
    {
        message = message.replace(':(', '&#128543;');
    } 
    else if(message.includes(':D'))
    {
        message = message.replace(':D', '&#128513;');
    }
    else if(message.includes(';('))
    {
        message = message.replace(';(', '&#128557;');
    }
    else if(message.includes(';)'))
    {
        message = message.replace(';)', '&#128521;');
    }
    else if(message.includes(':/'))
    {
        message = message.replace(':/', '&#128533;');
    }
    else if(message.includes(':o'))
    {
        message = message.replace(':o', '&#128558;');
    }
    return message;
}

