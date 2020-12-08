/*
 * Nom : Wiki !
 * Description : Renvoie la page wikipédia du mot demandé
 * Auteurs : Louise Bertin & Quentin Pionnier
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleWiki: handleWiki // permet d'appeler cette méthode dans server.js -> wiki.handleWiki(...)
}

/**
 * Lorsqu'on appelle wiki, il répond...
 */
function handleWiki(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();
	
	// Est-ce qu'il contient une référence à wiki ?
	if (message.includes('wiki') || message.includes('wikipedia'))
	{
		let words = message.split(' ');
		// Si oui, envoie la réponse de wiki...
		io.sockets.emit('new_message',
		{
			name:'Wiki',
			message:'<a target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/' + words[1] +'">Ma page sur ' + words[1] +'</a>'
		});
	}
}
