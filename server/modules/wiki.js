/*
 * Nom : Wiki !
 * Description : Renvoie la page wikipédia du mot demandé
 * Auteurs : Louise Bertin & Quentin Pionnier
 */

const { table } = require('console');
const { resolve } = require('path');

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleWiki: handleWiki // permet d'appeler cette méthode dans server.js -> wiki.handleWiki(...)
}

const wiki = require('wikijs').default;
/**
 * Lorsqu'on appelle wiki, il répond en revoyant une page wikipedia
 */
function handleWiki(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();

	// Est-ce qu'il contient une référence à wiki ?
	if (message.includes('wiki'))
	{
		let words = message.split(' ', 2);

		// Vérifie qu'un mot à rechercher est bien présent
		if (words[1] != undefined) 
		{
			// Si le mot à chercher est aléatoire ou random on affiche une page aléatoir plus plus une page sur l'aléatoire sinon on cherche le mot
			if (words[1] == "random" || words[1] == "al&#233;atoire" || words[1] == "aleatoire")
			{
				sendMessage('<a target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard">Un peu de curiosité ne fait pas de mal, voici une page aléatoire.</a><br>'
						  + '<a target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/Al%C3%A9atoire">Si vous voulez en savoir plus sur l\'aléatoire, c\'est par ici.</a>'
				, io);
			}
			else
			{
				searchWiki(words[1], io);
			}
		}
		else
		{
			sendMessage(
				'Bonjour ! Je suis le Wikibot, tapez "wiki" puis le mot de votre choix, et je vous donnerai un lien vers ce que vous cherchez.'
			, io);
		}
	}
}

function searchWiki(keyword, io)
{
	let pageWikipedia = wiki({
		apiUrl: 'https://fr.wikipedia.org/w/api.php'
	})
	.page(keyword);

	pageWikipedia
	.then(page => page.summary())
	.then(function(summary)
	{
		sendMessage(
			'Voici un lien vers la page Wikipedia de ' + keyword + ' :'
			+ '<div class="article">'
			+ '<a class="encard" target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/' + keyword +'">'
			+ '<h3 class="title">' + keyword + '</h3>'
			+ '<span class="summ"><p>' + summary + '</p></span></a></div>'
		, io);
	});
}

function sendMessage(message, io)
{
	// On envoie la réponse de wiki
	io.sockets.emit('new_message',
	{
		name:'Wiki',
		message: message
	});
}