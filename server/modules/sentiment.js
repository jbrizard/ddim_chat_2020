/*
 * Nom : Sentiment !
 * Description : Calcule un score de négativité/bienveillance en fonction du langage utilisé
 * Auteurs : Louise Bertin & Quentin Pionnier
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports = {
	handleSentiment: handleSentiment // permet d'appeler cette méthode dans server.js -> sentiment.handleSentiment(...)
}

const Sentiment = require('sentiment');
let generalScore = 0;
let userHistory = {};

function handleSentiment(io, message, name) 
{
	// Passe le nom d'utilisateur en minuscules
	name = name.toLowerCase();
	
	// Lance l'analyse 
	let sentiment = new Sentiment();
	let result = sentiment.analyze(message, {
		language: 'fr'
	});

	// incrémente le score général du chat
	generalScore += result.score;

	
	// stockage de l'historique utilisateur
	if (!(name in userHistory))
		userHistory[name] = "";

	userHistory[name] += message + " ";
	
	// Est-ce qu'il contient une référence à analyse ?
	if (message.includes('analyse')) 
	{
		let words = message.split(' ', 2);

		// Vérifie qu'un utilisateur est indiqué
		if (words[1] != undefined) 
		{
			// Si le mot indiqué est help on affiche un message d'aide
			if (words[1] == "help") 
			{
				sendMessage('Bonjour ! <br>Je suis Sentiment, un bot qui analyse le langage en attribuant un score aux mots (négatif/positf/neutre) <br>Tapez "analyse" puis l\'utilisateur de votre choix, et je vous donnerai un score correspondant au résultat de l\'analyse de ses messages.', io);
			} else 
			{
				userAnalyze(words[1], io);
			}
		} else 
		{
			sendMessage("Le score général du chat est " + generalScore, io);
		}
	}
}

// analyze du d'un utilisateur en particulier
function userAnalyze(user, io) 
{
	let history = "";

	// analyse de l'historique de l'utilisateur
	let sentiment = new Sentiment();
	let result = sentiment.analyze(userHistory[user], {
		language: 'fr'
	});

	// recuprération du mot et de son score associé dans le tableau
	for (var i in result.calculation)
	{
		for (var word in result.calculation[i])
		{
			var score = result.calculation[i][word];
			history += word + " " + score + "<br>";
		}
	}

	// envoie du message
	sendMessage(
		"Le score de " + user + " est " + result.score + "<br>" +
		"L'historique des mots utilisés est :<br>" +
		history, io);
}

function sendMessage(message, io) 
{
	// On envoie la réponse de sentiment
	io.sockets.emit('new_message', {
		name: 'Sentiment',
		message: message
	});
}