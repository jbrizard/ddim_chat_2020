/*
 * Nom : Barrel Roll !
 * Description : Il te fait tourner la t�te !
 * Auteur(s) : J�r�mie Brizard
 */

// D�finit les m�thodes "publiques" (utilisation � l'ext�rieur du module)
module.exports =  {
	handleBarrelRoll: handleBarrelRoll // permet d'appeler cette m�thode dans server.js -> barrelRoll.handleBarrelRoll(...)
}


function handleBarrelRoll(io, message)
{
	// Passe le message en minuscules (recherche insensible � la casse)
	message = message.toLowerCase();
	
	// Est-ce qu'il contient une r�f�rence � BarrelRoll
	if (message.includes('barrel roll') || message.includes('salto') || message.includes('roule ma poule'))
	{
		io.sockets.emit('barrel_roll');
	}
}
