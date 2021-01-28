/*
 * Nom : News
 * Description : Module qui vous met au courant de l'actu chaude
 * Auteur : Louis Glaunig
 */

const { query, json } = require('express');
const { parse } = require('path');
const QueryString = require('qs');
const request = require('request');

module.exports =  {
	handleNews: onNewMessage // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

var newsActif = false;


/*
* Cette fonction va détecter le mot météo. S'il y a le mot météo il va analyser si il y a une ville qui suit la commande.
* Si l'instruction est bonne on récupère un json grâce l'API WeatherStack
* On affiche une icône montrant le temps qu'il fait ainsi que la température
*/

function onNewMessage(io, message)
{
	//On déclare les variables
	var predict, jsonNews, query; 

		//Est-ce que le message envoyé contient la commande !une, si oui on débute notre fonction
	if (message.includes('!une'))
	{
	
		//Requête de 3 articles pour l'API avec en paramètres la clé et le pays
		var url = 'http://newsapi.org/v2/top-headlines?' +
        'country=fr&pageSize=5&' +
		'apiKey=7f5f8a84912d49e288d0a25fe390879d';
		
			request(url, function (error, response, body) 
				{
					//On convertit le JSON que nous mettons dans la variable jsonNews
                    jsonNews = JSON.parse(body);
					// Nous affichons une image et le titre de 3 articles. Ce texte contient l'URL de l'article original.
					predict = "<section class=\"news\"><div class=\"imgNews\"><a href=\""+jsonNews.articles[0].url+"\"><img class=\"news\" src=\""+jsonNews.articles[0].urlToImage+"\"></a></div><div class=\"texteNews\">"+ jsonNews.articles[0].title + "</div></section><br>" + "<section class=\"news\"><div class=\"imgNews\"><a href=\""+jsonNews.articles[1].url+"\"><img class=\"news\" src=\""+jsonNews.articles[1].urlToImage+"\"></a></div><div class=\"texteNews\">"+ jsonNews.articles[1].title + "</div></section><br>" + "<section class=\"news\"><div class=\"imgNews\"><a href=\""+jsonNews.articles[2].url+"\"><img class=\"news\" src=\""+jsonNews.articles[2].urlToImage+"\"></a></div><div class=\"texteNews\">"+ jsonNews.articles[2].title + "</div></section><br>";
					sendMessage(io, predict);
                   });
		}

		//Est-ce que le message envoyé contient la commande !ENune, si oui on débute notre fonction
	if (message.includes('!ENune'))
	{
	
		//Requête de 3 articles pour l'API avec en paramètres la clé et le pays
		var url = 'http://newsapi.org/v2/top-headlines?' +
        'country=us&pageSize=5&' +
		'apiKey=7f5f8a84912d49e288d0a25fe390879d';
		
			request(url, function (error, response, body) 
				{
					//On récupère le json puis on le convertit
                    jsonNews = JSON.parse(body);
					// Nous affichons une image et le titre de chaque article. Ce texte contient l'URL de l'article original.
					predict = "<section class=\"news\"><div class=\"imgNews\"><a href=\""+jsonNews.articles[0].url+"\"><img class=\"news\" src=\""+jsonNews.articles[0].urlToImage+"\"></a></div><div class=\"texteNews\">"+ jsonNews.articles[0].title + "</div></section><br>" + "<section class=\"news\"><div class=\"imgNews\"><a href=\""+jsonNews.articles[1].url+"\"><img class=\"news\" src=\""+jsonNews.articles[1].urlToImage+"\"></a></div><div class=\"texteNews\">"+ jsonNews.articles[1].title + "</div></section><br>" + "<section class=\"news\"><div class=\"imgNews\"><a href=\""+jsonNews.articles[2].url+"\"><img class=\"news\" src=\""+jsonNews.articles[2].urlToImage+"\"></a></div><div class=\"texteNews\">"+ jsonNews.articles[2].title + "</div></section><br>";
					sendMessage(io, predict);
                   });
		}

	//Est-ce que le message envoyé contient la commande !news, si oui on débute notre fonction
	if (message.includes('!news'))
	{
		// On sépare la commande en deux mots qu'on met dans un tableau
		var messageNews = message.substring(6);


		//Requête d'un article pour l'API avec en paramètres la clé, la requête et le pays
		query = messageNews;
		var url = 'http://newsapi.org/v2/everything?' +
		'q='+query+
		'&language=fr&pageSize=5&sortBy=relevancy&' +
		'apiKey=7f5f8a84912d49e288d0a25fe390879d';

			request(url, function (error, response, body) 
				{
					//On récupère le json puis on le convertit
					jsonNews = JSON.parse(body);
					// Si on a une erreur dans la requete alors le module envoie un message
					if(jsonNews.totalResults == 0 || jsonNews.status === 'error'){
						sendMessage(io, 'Désolé il n\'y a pas d\'articles à ce sujet')
					}else{
                    	// Nous affichons une image et le titre. Ce texte contient l'URL de l'article original
						predict = "<section class=\"news\"><div class=\"imgNews\"><a href=\""+jsonNews.articles[0].url+"\"><img class=\"news\" src=\""+jsonNews.articles[0].urlToImage+"\"></a></div><div class=\"texteNews\">"+ jsonNews.articles[0].title + "</div></section>";
						sendMessage(io, predict);
					}
                   });
		}

	//Est-ce que le message envoyé contient la commande !ENnews, si oui on débute notre fonction
	if (message.includes('!ENnews'))
	{
		// On conserve la requete en enlevant la commande
		var messageNews = message.substring(8);

		//Requête d'un article pour l'API avec en paramètres la clé, la requête et le pays
		query = messageNews;
		var url = 'http://newsapi.org/v2/everything?' +
		'q='+query+
		'&language=en&pageSize=5&sortBy=relevancy&' +
		'apiKey=7f5f8a84912d49e288d0a25fe390879d';

			request(url, function (error, response, body) 
				{
					//On récupère le json puis on le convertit
					jsonNews = JSON.parse(body);
					// Si on a une erreur dans la requete alors le module envoie un message
					if(jsonNews.totalResults == 0 || jsonNews.status === 'error'){
						sendMessage(io, 'Désolé il n\'y a pas d\'articles à ce sujet')
					}else{
                    	// Nous affichons une image et le titre. Ce texte contient l'URL de l'article original
						predict = "<section class=\"news\"><div class=\"imgNews\"><a href=\""+jsonNews.articles[0].url+"\"><img class=\"news\" src=\""+jsonNews.articles[0].urlToImage+"\"></a></div><div class=\"texteNews\">"+ jsonNews.articles[0].title + "</div></section>";
						sendMessage(io, predict);
					}
                   });
		}
		
}


// Fonction qui envoie le message
function sendMessage(io, message)
{
	setTimeout(function()
	{
			io.sockets.emit('new_message',
			{
				name:'news',
				message: message,
			});
	}, 700);
}
