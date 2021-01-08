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
var donald = require('./modules/donald.js');
var barrelRoll = require('./modules/barrelRoll.js');
var emoji = require('./modules/emoji.js');
var jokes = require('./modules/jokes.js');
var giphy = require('./modules/giphy.js');
var upload = require('./modules/upload.js');

// Initialisation du serveur HTTP
var app = express();
var server = http.createServer(app);

// Initialisation du websocket
var io = ioLib.listen(server);

// Envois variable io
jokes.initJoke(io);

// Traitement des requêtes HTTP (une seule route pour l'instant = racine)
app.get('/', function(req, res)
{
	res.sendFile(path.resolve(__dirname + '/../client/chat.html'));
});

// Traitement des fichiers "statiques" situés dans le dossier <assets> qui contient css, js, images...
app.use(express.static(path.resolve(__dirname + '/../client/assets')));

// Gestion des connexions au socket
io.sockets.on('connection', function(socket)
{
	// Arrivée d'un utilisateur
	socket.on('user_enter', function(name)
	{
		// Stocke le nom de l'utilisateur dans l'objet socket
		socket.name = name;
	});
	
	// Réception d'un message
	socket.on('message', function(message)
	{
		// Par sécurité, on encode les caractères spéciaux
		message = ent.encode(message);

		// Transmet le message au module Emoji
		message = emoji.handleEmoji(io, message);
		
		// Transmet le message à tous les utilisateurs (broadcast)
		io.sockets.emit('new_message', {name:socket.name, message:message});
		
		// Transmet le message au module Daffy (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		daffy.handleDaffy(io, message);
		
		// Transmet le message au module Giphy (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		giphy.handleGiphy(io, message);
		
		// Transmet le message au module Donald (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		donald.handleDonald(io, message);
		
		// Transmet le message au module BarrelRoll
		barrelRoll.handleBarrelRoll(io, message);
		
		// Transmet le message au module Jokes (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		jokes.handlejokes(io, message);
		
	});

	//Réception d'un fichier
	socket.on('file', function(file)
	{
		// Transmet le fichier au module Upload (on lui passe aussi l'objet "io" et "socket" pour qu'il puisse envoyer des messages avec le nom de l'utilisateur)
		upload.handleUpload(file, io, socket);
	});
});

	//giphy.initiateGiphy()
// Lance le serveur sur le port 8080 (http://localhost:8080)
server.listen(8080);