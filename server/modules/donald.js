/*
 * Nom : Donald Bot
 * Description : Un bot conversationnel
 * Auteur(s) : Jérémie
 */
 
 // Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleDonald: onNewMessage
}

var discussionEngaged = false;

/**
 * Fonction appelée lorsqu'on reçoit un nouveau message
 */
function onNewMessage(io, message)
{
	if (message.toLowerCase().includes('hey donald'))
	{
		sendMessage(io, 'Hey, tu m\'as parlé ?');
		discussionEngaged = true;
	}
	
	if (discussionEngaged && message.toLowerCase().includes('comment &#231;a va?'))
	{
		sendMessage(io, 'Tout baigne et toi ?!');
	}
	
	if (discussionEngaged && message.toLowerCase().includes('comment se passent les &#233;lections?'))
	{
		sendMessage(io, '<img class="donald-gif" src="/modules/donald/good.gif">');
	}
	
	if (discussionEngaged && message.toLowerCase().includes('bye donald'))
	{
		sendMessage(io, 'A+ gros');
		discussionEngaged = false;
	}
}

function sendMessage(io, message)
{
	setTimeout(function()
	{
			io.sockets.emit('new_message',
			{
				name:'Donald',
				avatar: 'donald',
				message: message
			});
	}, 700);
}