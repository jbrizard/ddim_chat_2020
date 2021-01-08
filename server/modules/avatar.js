/*
 * Nom : Avatar
 * Description : ...
 * Auteur(s) : ...
 */
 
 // Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleChangeAvatar: handleChangeAvatar
}


/**
 * ...
 */
function handleChangeAvatar(io, socket, nomAvatar)
{
	var isFirst = socket.avatar == 'undefined';
	socket.avatar = nomAvatar;
	if (!isFirst)
	{
		var message = socket.name+" a modifié son avatar";
		io.sockets.emit('new_message',{name:socket.name, message:message, avatar:socket.avatar});
	}
	console.log("changement effectué", socket.avatar, nomAvatar);
}
