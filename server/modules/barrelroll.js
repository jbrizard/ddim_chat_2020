/*
 * Nom : Barrel Roll !
 * Description : ca tourne
 * Auteur(s) : Jérémie Brizard
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleBarrelRoll: handleBarrelRoll 
}

function handleBarrelRoll(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();
	
	// Est-ce qu'il contient une référence à Daffy ?
	if (message.includes('barrel roll') || message.includes('salto') || message.includes('gabenj c est trop des bg'))
	{
		// Si oui, envoie la réponse de Daffy...
		io.sockets.emit('barrel_roll');
	}
}
