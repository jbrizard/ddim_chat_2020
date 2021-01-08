/*
 * Nom : Files and Messages !
 * Description : Ce module permet d'ajouter des images et des fichiers au chat
 * Auteur(s) : riffault-germain
 */

// Chargement des dépendances
var fs = require('fs');	

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleUpload: handleUpload // permet d'appeler cette méthode dans server.js -> upload.handleUpload(...)
}

/**
 * Lorsqu'on envoi le fichier au module il le créer dans le serveur
 */
function handleUpload(file, io, socket)
{
    var error = false;
    var fileType = file.fileType;
    var fileName = file.fileName;

    //On créer une nouvelle expression régulière contenant le type du fichier
    var regex = new RegExp("^data:" + fileType + ";base64,");
    
    //On récupère les données brutes du fichier
    var fileContent = file.file.replace(regex, "");

    // On créer le fichier en indiquant le path, son nom, son encodage et une fonction d'erreur
    fs.writeFile('../client/assets/modules/upload/files/'+fileName, fileContent , 'base64' , function (err) 
    {
        // Est-ce qu'il y a eu des erreurs lors de la création du fichier ?
        if (err) 
        {
            // Si oui on passe error à true et on renvoi l'erreur
            error = true;
            return console.log(err);
        }
    });
    // Est-ce que la variable erreur est à false ?
    if(!error)
    {
        // Si oui, on appele la fonction pour envoyer un message en lui passant le nom et le type du fichier, l'objet "io" et "socket"
        sendMessage(fileName, io, socket, fileType);
    }
    else
    {
        // Si non, on affiche à l'utilisateur un message d'erreur
        alert("une erreur est survenue lors de l'upload du fichier");
    }
}

/**
 * Créer l'image ou le fichier dans le chat avec le nom de l'utilisateur
 */
function sendMessage(fileName, io, socket, fileType)
{
    // Est-ce que le fichier est une image ?
    if(fileType == "image/jpeg" || fileType == "image/png" || fileType == "image/gif")
    {
        // Si oui on l'affiche directement
        io.sockets.emit('new_message',
		{
			name: socket.name,
			message:'<img src="/modules/upload/files/'+fileName+'"/>'
		});
    }
    else
    {
        // Si non, on affiche un lien pour télécharger le fichier
        io.sockets.emit('new_message',
		{
			name: socket.name,
			message:'<a href="/modules/upload/files/'+fileName+'">'+fileName+'</a>'
		});
    }
		
}

