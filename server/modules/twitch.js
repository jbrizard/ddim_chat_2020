/*
 * Nom : Twitch
 * Description : Ce module renvoit un embed de twitch en fonction du nom de la chaine donné
 * Auteur(s) : Louis Germain & Alexandre Riffault
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleTwitch: handleTwitch // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

/**
 * Lorsqu'on appelle Daffy, il répond...
 */
function handleTwitch(io, message, socket)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();
	
    // Est-ce qu'il contient une référence à twitch ?
    
    
	if (message.includes('!twitch '))
	{
		console.log('emit!');
        //var str = message;
        var channelName = message.substr(8);

		// Si oui, envoie la réponse de Daffy...
		io.sockets.emit('twitch',
		{
            channelName: channelName,
            name : socket.name
		});
	}
}