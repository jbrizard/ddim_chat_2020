/*
 * Nom : easterGif !
 * Description : Ce module fait apparaitre des gifs en fonction de certains messages envoyés
 * Auteur(s) : Enzo GALLINA et Hugo Beltramo
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleEasterGif: handleEasterGif 
}

function handleEasterGif(io, message)
{
	if(message == "OK." || message == "ok." || message == "Ok.")
	{
		io.sockets.emit('new_message',
		{
			name: '(-',
			message:'<img class="ok" height="100px" width="100px" src="https://media.giphy.com/media/5YngTgT41LkX6MgOnY/giphy.gif" />'
		});
	}
}
