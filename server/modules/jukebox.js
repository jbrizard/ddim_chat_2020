/*
 * Nom : jukebox !
 * Description : Ce module vous fait écouter de la musique !
 * Auteur(s) : Flavien / Amanda
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =
{
	handleMusique: handleMusique // permet d'appeler cette méthode dans server.js -> musique.handleMusique(...)
}

var discussionEngaged = false;
var yes_no = false;
var search = require('youtube-search');
 
var opts =
{
	maxResults: 1,
	key: 'AIzaSyBs2niwY2KMN3czKISTQZNJLuRjW8NvgjA'
};


/**
 * Lorsqu'on appelle jukebox, il répond...
 */

function handleMusique(io, message)
{
	//Verifie que le message inclus jukebox
	if (message.toLowerCase().includes('jukebox'))
    {
		// retire le mot jukebox de la recherche
		var keyword = message.substr(8);

		//Effectue la recherche
		search(keyword, opts, function (err, results)
        {
			//verifie les erreurs
            if  (err) return console.log(err);

            //si resultat affiche la video
			if (results.length > 0)
			{
				var itemId = results[0].id;
				sendMessage(io, '<iframe width="460" height="215" src="https://www.youtube.com/embed/'+itemId+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');	
                console.dir(results);
			}
		});
	}
}
	
function sendMessage(io, message)
{
	setTimeout(function()
	{
		io.sockets.emit('new_message',
			{
				name:'jukebox',
				avatar : '/modules/avatar/medias/jukebox.png',
				message: message
			});
	}, 700);
}