/*
 * Nom : Sentiment !
 * Description : Calcule un score de négativité/bienveillance en fonction du langage utilisé
 * Auteurs : Louise Bertin & Quentin Pionnier
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleSentiment: handleSentiment // permet d'appeler cette méthode dans server.js -> sentiment.handleSentiment(...)
}

const Sentiment = require('sentiment');
var sentiment = new Sentiment();

    var result = sentiment.analyze('Les chats sont stupides.', { language: 'fr' });
    console.dir(result);
function handleSentiment(io, message)
{
}

function sendMessage(message, io)
{
	// On envoie la réponse de sentiment
	io.sockets.emit('new_message',
	{
		name:'Sentiment',
		message: message
	});
}