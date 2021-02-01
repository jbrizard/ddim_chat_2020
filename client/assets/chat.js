// Connexion au socket
var socket = io.connect('http://localhost:8080');

// Demande un pseudo et envoie l'info au serveur
var name = prompt('Quel est votre pseudo ?', 'Anonyme ' + new Date().getTime().toString().substr(-5));
socket.emit('user_enter', name);

// Gestion des événements diffusés par le serveur
socket.on('new_message', receiveMessage);
socket.on('update_list_participants', updateListParticipants);

// Action quand on clique sur le bouton "Envoyer"
$('#send-message').click(sendMessage);

// Action quand on appuye sur la touche [Entrée] dans le champ de message (= comme Envoyer)
$('#message-input').keyup(function (evt)
{
	if (evt.keyCode == 13) // 13 = touche Entrée
		sendMessage();
});


/**
 * Envoi d'un message au serveur
 */
function sendMessage() {
	// Récupère le message, puis vide le champ texte
	var input = $('#message-input');
	var message = input.val();
	input.val('');

	// On n'envoie pas un message vide
	if (message == '')
		return;
	
	// Injecte les balises de formatage
	message = injectStyling(message);
	
	// Envoi le message au serveur pour broadcast
	socket.emit('message', message);
}

/**
 * Affichage d'un message reçu par le serveur
 */
function receiveMessage(data)
{
	// Suis-je l'auteur du message?
	var isMe = typeof(data.isMe) != 'undefined' ? data.isMe : false;
	log(isMe);
	
	// Remplace les balises de formatage
	data.message = replaceStyling(data.message);
	
	// Plugin Switch Mode
	handleSwitchMode(data.message);

	// Ajoute le message au chat
	$('#chat #messages').append(
		'<div class="message">'
			+ '<img class="avatar" src="'+data.avatar+'"></img>'
			+ '<span class="user">' + data.name  + '</span> ' 
			+ data.message 
	     + '</div>'
	)
	.scrollTop(function () { return this.scrollHeight });  // scrolle en bas du conteneur
}

/**
 * Met à jour et affiche la liste des participants 
 */
function updateListParticipants(participants)
{
    $('#participants-online').empty();
	for (var i in participants)
    {
		$('#participants-online').append(
            '<div class="online">'
			+ '<li>' + '<img src="modules/participants/icon-utilisateur.png">' + participants[i] + '</li>'
            + '</div>'
        );
    }
}