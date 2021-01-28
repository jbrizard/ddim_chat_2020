
// Gestion des événements diffusés par le serveur pour le plugin twitch
socket.on('twitch', twitch);
socket.on('replay', replay);
socket.on('erreurTwitch', twitchError);

/**
 * Affichage d'une fenêtre de live twitch dans un message du chat
 */
function twitch(data)
{
	// On génère un nombre aléatoire pour différencier l'embed
	var random = getRandomInt(9999);

	// On ajoute le message contenant contenant le lien du live ainsi que la div qui sera liée à l'embed
	$('#chat #messages').append(
		'<div class="message">'
            + '<span class="user">' + data.name  + '</span> ' 
            +'<a href="https://twitch.tv/'+data.channelName+'" target="_blank"s>https://twitch.tv/'+data.channelName+'</a>'
			+ '<div id="twitch-embed-'+data.channelName+"-"+random+'"> </div>'
	     + '</div>'
	);
    
    // On récupère la largeur d'un message du chat
	let message = $("#messages").innerWidth();

	// On créer un embed de live twitch sur la div du message lié
	new Twitch.Embed("twitch-embed-"+data.channelName+"-"+random, 
	{
		width: message,
		height: message*(9/16),
		channel: data.channelName,
		layout: 'video',
		autoplay: 'false'
	});
}

/**
 * Renvoi un entier entre 0 et une valeur donnée (max)
 */
function getRandomInt(max) 
{
	return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Affichage d'une fenêtre de replay twitch dans un message du chat
 */
function replay(data)
{
	// On génère un nombre aléatoire pour différencier l'embed
	var random = getRandomInt(9999);
	
	// On ajoute le message contenant contenant le lien du replay ainsi que la div qui sera liée à l'embed
	$('#chat #messages').append(
		'<div class="message">'
            + '<span class="user">' + data.name  + '</span> ' 
            +'<a href="https://twitch.tv/videos/'+data.idVideo+'" target="_blank">https://twitch.tv/videos/'+data.idVideo+'</a>'
			+ '<div id="twitch-embed-'+data.idVideo+"-"+random+'"> </div>'
	     + '</div>'
	);

	// On récupère la largeur d'un message du chat
	let message = $("#messages").innerWidth();

	// On créer un embed de replay twitch sur la div du message lié
	new Twitch.Player("twitch-embed-"+data.idVideo+"-"+random, 
	{
		video: data.idVideo,
		width: message,
		height: message*(9/16),
		autoplay: 'false'
	});
}

/**
 * Affichage de messages d'erreur dans le chat
 */
function twitchError(data)
{
	// On ajoute un message en fonction de l'erreur dans le chat 
	$('#chat #messages').append(
		'<div class="message">'
			+ '<span class="user">Twitch Bot </span>' 
			+'<span>'+data.messageError+'</span>'
	     + '</div>'
	);
}