/*
 * Nom : Emoji
 * Description : Ce module permet d'insérer des émojis
 * Auteur(s) : Jules CANNET et Léo PIAZZA
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
    createEmoji: createEmoji, // permet d'appeler cette méthode dans server.js -> emoji.createEmoji(...)

}


/**
 * Lorsqu'on clique sur un émoji, on l'insère dans l'input
 */
function createEmoji(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();
	
}
