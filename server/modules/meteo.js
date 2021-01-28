/*
 * Nom : Meteo
 * Description : Module qui indique la météo
 * Auteur(s) : Louis Glaunig
 */

const { query } = require('express');
const { parse } = require('path');
const QueryString = require('qs');
const request = require('request');

module.exports =  {
	handleMeteo: onNewMessage // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

var meteoActif = false;


/*
* Cette fonction va détecter le mot météo. S'il y a le mot météo il va analyser si il y a une ville qui suit la commande.
* Si l'instruction est bonne on récupère un json grâce l'API WeatherStack
* On affiche une icône montrant le temps qu'il fait ainsi que la température
*/

function onNewMessage(io, message)
{
	//On déclare les variables
	var predict, json, query; 

	//On regarde si le message contient le mot météo
	if (message.includes('!meteo'))
	{
		// On sépare la commande en deux mots qu'on met dans un tableau
		var messageMeteo = message.split(' ', 2);

		//On met la partie qui contient la ville dans la variqble query qui sera utiliser dans l'URL d'API par la suite
		query = messageMeteo[1];
		var url = 'http://api.weatherstack.com/current?access_key=2b6c2a1a186f04ccf8ec548e19aff4a5&query='+ query;



		if(messageMeteo[1] == null)
		{
			sendMessage(io, 'Vous devez saisir une ville après le mot météo : !meteo (ville)');
		}
		else
			{
				request(url, function (error, response, body) 
					{
						//On récupère le json puis on le parse
						json = JSON.parse(body);

						if(json.success == false)
						{
							// On regarde d'abord si la recherche est réussie
							sendMessage(io, 'Votre recherche a échoué');
						}
						else
							{
							//On envoie notre prévision dans le chat
							predict = "<section><img src=\'"+ json.current.weather_icons + "\' class=\'imgMeteo\'> <h3> A " + json.location.name + " il fait " + json.current.temperature + " °C. </h3> </section>";
							sendMessage(io, predict);	
							}		
					});
			}		
		}
}


// Fonction qui envoie le message
function sendMessage(io, message)
{
	setTimeout(function()
	{
			io.sockets.emit('new_message',
			{
				name:'BotMeteo',
				avatar : '/modules/avatar/medias/meteo.jpg',
				message: message
			});
	}, 700);
}
