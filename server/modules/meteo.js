/*
 * Nom : Meteo
 * Description : Module qui indique la météo
 * Auteur(s) : Louis Glaunig
 */

module.exports =  {
	handleMeteo: handleMeteo // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

/**
 * Appel de la fonction météo dans le tchat
 */
function handleMeteo()
{

	// Est-ce qu'il contient une référence à Daffy ?
	if (message.includes('meteo'))
	{
		// Si oui, envoie la réponse de Daffy...
		io.sockets.emit('new_message',
		{
			name:'Daffy!!',
			message:'<span class="daffy">Coin Coin !</span>'
		});
	}
}
