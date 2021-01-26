/*
 * Nom : Avatar
 * Description : Affiche l'avatar de l'utilisateur à côté du nom de l'utilisateur
 * Auteur(s) : Jules CANNET et Léo PIAZZA
 */

//Chargement des dépendances
var fs = require('fs');	

 // Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleNewAvatar: handleNewAvatar,
	handleChangeAvatar: handleChangeAvatar,
	handleUploadAvatar: handleUploadAvatar,
}

//Est-ce que c'est un premier avatar de l'utilisateur?
var isFirst=true;
/**
 * isFirst est vrai si l'utilisateur est nouvel
 */
function handleNewAvatar(){
	isFirst= true;
}

/**
 * Change l'adresse de l'avatar
 */
function handleChangeAvatar(io, socket, nomAvatar)
{
	socket.avatar = nomAvatar;
	if (!isFirst)
	{
		var message = "a modifié son avatar";
		io.sockets.emit('new_message',{name:socket.name, message:message, avatar:socket.avatar});
	} else {
		isFirst=false;
	}
}

/**
 * Lorsqu'on envoi le fichier au module, il le créer dans le serveur
 */
function handleUploadAvatar(file, io, socket)
{
    var error = false;
    var fileType = file.fileType;
    var fileName = file.fileName;

    var regex = new RegExp("^data:" + fileType + ";base64,");
    var fileContent = file.file.replace(regex, "");
    fs.writeFile('../client/assets/modules/avatar/medias/'+fileName, fileContent , 'base64' , function (err) 
    {
        if (err) 
        {
            error = true;
            return console.log(err);
        } else {
			handleChangeAvatar(io, socket, '/modules/avatar/medias/'+fileName);
		}
    });
    if(error)
    {
        alert("une erreur est survenue lors de l'upload du fichier");
    }
}

