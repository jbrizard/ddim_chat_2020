// Chargement des dépendances
var express = require('express');	// Framework Express
var http = require('http');		// Serveur HTTP
var ioLib = require('socket.io');	// WebSocket
var ent = require('ent');		// Librairie pour encoder/décoder du HTML
var path = require('path');		// Gestion des chemins d'accès aux fichiers	
var fs = require('fs');			// Accès au système de fichier
var bodyParser = require('body-parser'); 

// Chargement des modules perso
var daffy = require('./modules/daffy.js');
var easterGif = require('./modules/easter_gif.js');
var donald = require('./modules/donald.js');
var barrelRoll = require('./modules/barrelRoll.js');
var emoji = require('./modules/emoji.js');
var jokes = require('./modules/jokes.js');
var giphy = require('./modules/giphy.js');
var upload = require('./modules/upload.js');
var meteo = require('./modules/meteo.js');
var musique = require('./modules/jukebox.js');
var quizz = require('./modules/quizz.js');
var wiki = require('./modules/wiki.js');
var sentiment = require('./modules/sentiment.js');
var twitch = require('./modules/twitch.js');
var basket = require('./modules/basket.js');
var painter = require('./modules/painter.js');
var avatar = require('./modules/avatar.js')
var trad = require('./modules/traduction.js');
var news = require('./modules/news.js');

// Initialisation du serveur HTTP
var app = express();
var server = http.createServer(app);

// Initialisation du websocket
var io = ioLib(server);

// Envois variable io
jokes.initJoke(io);

// Traitement des requêtes HTTP (une seule route pour l'instant = racine)
app.get('/', function(req, res)
{
	res.sendFile(path.resolve(__dirname + '/../client/chat.html'));
});

// Traitement des fichiers "statiques" situés dans le dossier <assets> qui contient css, js, images...
app.use(express.static(path.resolve(__dirname + '/../client/assets')));

// Initialisation du module Basket
basket.init(io);

// Gestion des connexions au socket
io.sockets.on('connection', function(socket)
{
	basket.addClient(socket);
	
	// Arrivée d'un utilisateur
	socket.on('user_enter', function(name)
	{
		// Stocke le nom de l'utilisateur dans l'objet socket
		socket.name = name;
		
		// Prévient au module que c'est un nouvel utilisateur
		avatar.handleNewAvatar();
	});

	// Change l'adresse de l'avatar
	socket.on('user_avatar', function(nomAvatar)
	{
		// Appel du module pour changer d'avatar
		avatar.handleChangeAvatar(io, socket, nomAvatar);
	});

	// Charge le fichier image pour l'avatar
	socket.on('new_file_avatar', function(file)
	{
		// Transmet le fichier au module Upload (on lui passe aussi l'objet "io" et "socket" pour qu'il puisse envoyer des messages avec le nom de l'utilisateur)
		avatar.handleUploadAvatar(file, io, socket);
	});

	// Réception d'un message
	socket.on('message', function(message)
	{
		// Gère le cas ou le client a envoyé un message "null" (erreur de plugin)
		if (message == null)
			return;

		// Par sécurité, on encode les caractères spéciaux
		message = ent.encode(message);
		
		// Transmet le message au module Emoji
		message = emoji.handleEmoji(io, message);
		
		// Transmet le message à tous les utilisateurs (broadcast)
		io.sockets.emit('new_message', {name:socket.name, message:message, avatar:socket.avatar});
		
		// Transmet le message au module Daffy (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		daffy.handleDaffy(io, message);

		easterGif.handleEasterGif(io, message);
		
		// Transmet le message au module Giphy (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		giphy.handleGiphy(io, message);
		
		// Transmet le message au module Donald (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		donald.handleDonald(io, message);
		
		// Transmet le message au module BarrelRoll
		barrelRoll.handleBarrelRoll(io, message);
		
		// Transmet le message au module Jokes (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		jokes.handlejokes(io, message);
		
		// Transmet le message au module Meteo
		meteo.handleMeteo(io, message);
		
		// Transmet le message au module Jukebox (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		musique.handleMusique(io, message);
		
		// Transmet le message au module Quizz (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		quizz.handleQuizz(io, message ,socket.name, socket);
		trad.handleTranslate(io, message ,socket);

		// Transmet le message au module Wiki (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		wiki.handleWiki(io, message);
		
		// Transmet le message au module Sentiment (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		sentiment.handleSentiment(io, message, socket.name);
		
		twitch.handleTwitch(io, message, socket);
		
		news.handleNews(io, message);
	});

	//Réception d'un fichier
	socket.on('file', function(file)
	{
		// Transmet le fichier au module Upload (on lui passe aussi l'objet "io" et "socket" pour qu'il puisse envoyer des messages avec le nom de l'utilisateur)
		upload.handleUpload(file, io, socket);
	});
	
	// Dessing
	socket.on('drawLine', function(data)
	{
		// Transmet le fichier au module Upload (on lui passe aussi l'objet "io" et "socket" pour qu'il puisse envoyer des messages avec le nom de l'utilisateur)
		painter.onDrawLine(io, data);
	});

	
});

	//giphy.initiateGiphy()
// Lance le serveur sur le port 8080 (http://localhost:8080)
server.listen(8080);