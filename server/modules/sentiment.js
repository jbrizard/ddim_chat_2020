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
let score = 0;
	
function handleSentiment(io, words)
{
	let sentiment = new Sentiment();
	let result = sentiment.analyze(words, { language: 'fr' });

	//console.log(socket.name + " " + result);

	score += result.score;

	sendMessage("Le score général du chat est " + score, io);
} 

function sendMessage(message, io)
{
	// On envoie la réponse de sentiment
	io.sockets.emit('new_message',
	{
		name:'Sentiment',
		avatar : '/modules/avatar/medias/sentiment.jpg',
		message: message
	});
}