/*
 * Nom : Twitch
 * Description : Ce module renvoit un embed de twitch en fonction du nom de la chaine donné
 * Auteur(s) : Louis Germain & Alexandre Riffault
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports = {
	handleTwitch: handleTwitch
}
// Instancie le module permettant d'effectuer des requetes
const request = require('request');

var channelID;

/**
 * Traitement des messages envoyé au bot twitch
 */
function handleTwitch(io, message, socket)
{
	// Passe le message en minuscules
	message = message.toLowerCase();

	// Est-ce que le message contient une référence à twitch ?
	if (message.includes('!twitch '))
	{
		// Envoi les données io, message et socket à la fonction handleStream
		handleStream(io, message, socket);
	}
	// Si non, est-ce que le message contient une référence à replay ?
	else if (message.includes('!replay '))
	{
		// Envoi les données io, message et socket à la fonction handleReplay
		handleReplay(io, message, socket);
	}
}

/**
 * Effectue une requête de recherche de chaine pour les live
 */
function handleStream(io, message, socket)
{
	// Permet de supprimer le !twitch avant le nom d'utilisateur de la chaine désiré
	var channelName = message.substr(8);

	// On insère les différentes options utiliser dans la requête dans un tableau
	const options = {
		url: 'https://api.twitch.tv/kraken/search/channels?query=' + channelName + '&limit=1',
		method: 'GET',
		headers: {
			'Client-ID': '1bshaoerlptqm12anm5fhjf4w2yalp',
			'Accept': 'application/vnd.twitchtv.v5+json'
		}
	};

	// On execute la requête et on envoi les données dans la fonction onChannelResult
	request(options, function(error, response, body)
	{	
		// On passe en paramètre statut = 1 afin d'indiquer que la requête à été effectuée pour un live
		onChannelResult(error, response, body, io, socket, statut = 1);
	});
}

/**
 * Effectue une requête de recherche de chaine pour les replays
 */
function handleReplay(io, message, socket)
{
	// Soustrait le !replay avant le nom d'utilisateur de la chaine
	var channelName = message.substr(8);
	
	// On insère les différentes options utiliser dans la requête dans un tableau
	const options = {
		url: 'https://api.twitch.tv/kraken/search/channels?query=' + channelName + '&limit=1',
		method: 'GET',
		headers: {
			'Client-ID': '1bshaoerlptqm12anm5fhjf4w2yalp',
			'Accept': 'application/vnd.twitchtv.v5+json'
		}
	};

	// On execute la requête et on envoi les données dans la fonction onChannelResult
	request(options, function(error, response, body)
	{	
		// On passe en paramètre statut = 2 afin d'indiquer que la requête à été effectuée pour un replay
		onChannelResult(error, response, body, io, socket, statut = 2);
	});
}

/**
 * Traitement de la requête de recherche de chaine twitch
 */
function onChannelResult(error, response, body, io, socket, statut)
{
	// Est-ce que la requete est valide et ne renvoi pas d'erreur ?
	if (!error && response.statusCode == 200)
	{
		// Traite le JSON
		const info = JSON.parse(body);

		// Est-ce que la requête renvoi une chaine twitch ?
		if(info.channels[0] != undefined)
		{
			// Est-ce que la requête a été envoyé par rapport à un live ?
			if(statut == 2)
			{
				// On récupère l'id de la chaine et on appel la fonction de recherche de replay
				channelID = info.channels[0]._id;
				searchReplay(channelID, io, socket);
			}
			
			// Si non, est-ce que la requête a été envoyé par rapport à un replay ?
			else if(statut == 1)
			{
				// On envoi le nom de la chaine côté client
				io.sockets.emit('twitch',
				{
					name: socket.name,
					channelName: info.channels[0].name,
					avatar : 'modules/twitch/avatar.png'
				});
			}
		}
		// Si non, on envoi un message d'erreur
		else{
			io.sockets.emit('erreurTwitch',
			{
				name: socket.name,
				messageError: "L'utilisateur n'existe pas !",
				avatar : 'modules/twitch/avatar.png'
			});
		}	
	}
	// Si non, on envoi un message d'erreur
	else
	{
		io.sockets.emit('erreurTwitch',
		{
			name: socket.name,
			messageError: "Une erreur est survenue lors de la requête",
			avatar : 'modules/twitch/avatar.png'
		});
	}
}

/**
 * Effectue une requête de recherche de replay à partir de l'ID de la chaine twitch
 */
function searchReplay(channelID, io, socket)
{
	// On insère les différentes options utiliser dans la requête dans un tableau
	const options = {
		url: 'https://api.twitch.tv/kraken/channels/'+channelID+'/videos?limit=1&client_id=1bshaoerlptqm12anm5fhjf4w2yalp',
		method: 'GET',
		headers: {
			'Client-ID': '1bshaoerlptqm12anm5fhjf4w2yalp',
			'Accept': 'application/vnd.twitchtv.v5+json'
		}
	}
	
	// On execute la requête et on envoi les données dans la fonction onReplayResult
	request(options, function(error, response, body)
	{
		onReplayResult(error, response, body, io, socket);
	});
};

/**
 * Traitement de la requête de recherche de replay
 */
function onReplayResult(error, response, body, io, socket)
{
	if (!error && response.statusCode == 200) 
	{
		// On converti les données en JSON et on l'insère dans la variable infoVideo
		const infoVideo = JSON.parse(body);

		// Est-ce que l'utilisateur à des replays ?
		if(infoVideo.videos[0] != undefined)
		{
			// On recupere l'id de la vidéo depuis le résultat de la requete
			infoVideos = infoVideo.videos[0]._id;
			
			// On soustrait le premier caractère de la chaine pour avoir l'id de la video et on le converti en entier
			infoVideos = parseInt(infoVideos.substr(1));
			
			// Envoi différentes informations côté client
			io.sockets.emit('replay',
			{
				// Envoi l'id du channel , le nom de l'utilisateur et l'id de la video
				channelID: channelID,
				name: socket.name,
				idVideo : infoVideos,
				avatar : 'modules/twitch/avatar.png'
			});
		}
		// Si non, cela veut dire que l'utilisateur n'a pas de replay et on envoi un message d'erreur
		else
		{
			// Envoie une erreur dans le tchat si l'utilisateur n'a pas de replay
			io.sockets.emit('erreurTwitch',
			{
				// Envoi le nom de la personne ayant fait la requete ainsi qu'un message d'erreur
				name: socket.name,
				messageError: "L'utilisateur n'a aucun replay",
				avatar : 'modules/twitch/avatar.png'
			});
		}
		
	}
	else 
	{
		// Envoie une erreur dans le tchat avertissant une erreur lors de l'envoie de la requete
		io.sockets.emit('erreurTwitch',
		{
			// Envoi le nom de la personne ayant fait la requete ainsi qu'un message d'erreur
			name: socket.name,
			messageError: "Une erreur est survenue lors de la requête",
			avatar : 'modules/twitch/avatar.png'
		});
	}
}