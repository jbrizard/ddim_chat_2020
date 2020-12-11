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

	// On crée la variable dans laquelle on va mettre la réponse du bot
	let rep;
	
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
				rep = 'Un peu de curiosité ne fait pas de mal, voici une <a target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard">page aléatoire.</a><br>';
				rep += 'Si vous voulez en savoir plus sur ' + words[1] +', c\'est par <a target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/' + words[1] +'">ici.</a>';
			}
			else
			{
				
				wiki({
					apiUrl: 'https://fr.wikipedia.org/w/api.php'
				}).page(words[1])
					.then(page => page.summary())
					.then(function(summary){
						rep = '<a target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/wiki/' + words[1] +'">Voici ce que je sais sur ' + words[1] +'.</a>';
						rep += '<p>' + summary + '</p>';
					})
				
				
				
			}
		}
		else
		{
			rep = 'Bonjour ! Je suis le Wikibot, tapez "wiki" puis le mot de votre choix, et je vous donnerai un lien vers ce que vous cherchez.';
		}
	}

	// On envoie la réponse de wiki
	io.sockets.emit('new_message',
	{
		name:'Wiki',
		message: rep
	});
}