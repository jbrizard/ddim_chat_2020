/*
 * Nom : jukebox !
 * Description : Ce module donne la liste des participants !
 * Auteur(s) : Flavien / Amanda
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	init:init,
	addClient: addClient
}



function onNewMessage(io, message)
{
	if (message.toLowerCase().includes('participant'))
	{

	}
}

function sendMessage(io, message)
{
	setTimeout(function()
	{
			io.sockets.emit('new_message',
			{
				name:'Participant',
				message: message
			});
	}, 700);
}
