/*
 * Nom : Wiki !
 * Description : Renvoie la page wikipédia du mot demandé
 * Auteurs : Louise Bertin & Quentin Pionnier
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleWiki: handleWiki // permet d'appeler cette méthode dans server.js -> wiki.handleWiki(...)
}

/**
 * Lorsqu'on appelle wiki, il répond...
 */
function handleWiki(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();
	
	// Est-ce qu'il contient une référence à wiki ?
	if (message.includes('wiki'))
	{
		let words = message.split(' ', 2);
		let rep;

		if (words[1] != undefined) 
		{
			if (words[1] == "random" || words[1] == "al&#233;atoire" || words[1] == "aleatoire")
			{
				rep = '<a target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard">Un peu de curiosité ne fait pas de mal, voici une page aléatoire.</a><br>';
				rep += '<a target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/' + words[1] +'">Si vous voulez en savoir plus sur l\'' + words[1] +', c\'est par ici.</a>';
			}
			else
			{
				rep = '<a target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/' + words[1] +'">Voici ce que je sais sur ' + words[1] +'.</a>';
			}
			
		}
		else
		{
			rep = 'Bonjour ! Je suis le Wikibot, tapez "wiki" puis le mot de votre choix, et je vous donnerai un lien vers ce que vous cherchez.';
		}

		// On envoie la réponse de wiki...
		io.sockets.emit('new_message',
		{
			name:'Wiki',
			message: rep
		});
	}
}
