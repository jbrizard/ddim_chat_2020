﻿/*
 * Nom : Daffy !
 * Description : Ce module ne fait pas grand chose... quand on appelle Daffy, il répond !
 * Auteur(s) : Jérémie Brizard
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleWiki: handleWiki // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

/**
 * Lorsqu'on appelle Daffy, il répond...
 */
function handleWiki(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();
	
	// Est-ce qu'il contient une référence à Daffy ?
	if (message.includes('wiki'))
	{
		// Si oui, envoie la réponse de Daffy...
		io.sockets.emit('new_message',
		{
			name:'Wiki',
			message:'<span class="wiki">ça arrive, patiente</span>'
		});
	}
}
