/*
 * Nom : Barrel Roll !
 * Description : Il te fait tourner la tête !
 * Auteur(s) : Jérémie Brizard
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleBarrelRoll: handleBarrelRoll // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

/**
 * Lorsqu'on appelle Daffy, il répond...
 */
function handleBarrelRoll(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();
	
	// Est-ce qu'il contient une référence à Daffy ?
	if (message.includes('barrel roll')||message.includes('salto')||message.includes('roule ma poule'))
	{
		io.sockets.emit('barrel_roll');
	}
}
