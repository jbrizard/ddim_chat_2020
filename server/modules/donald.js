/*
 * Nom : Donald bot 
 * Description : Bot conversationnel
 * Auteur(s) : Prof
 */

module.exports =  {
	handleDonald: onNewMessage
}

var discussionEngaged = false;

function onNewMessage(io, message)
{
    if(message.toLowerCase().includes('hey donald'))
    {
        sendMessage(io, 'Hey, tu m\'as parlé?');
        discussionEngaged = true;
    }

    if(discussionEngaged && message.toLowerCase().includes('comment ca va ?'))
    {
        sendMessage(io, 'OKLM et toi ?');
    }

    if(discussionEngaged && message.toLowerCase().includes('comment ca va les elections ?'))
    {
        sendMessage(io, '<img class="donald-gif" src="/modules/donald/good.gif"');
    }

    if(discussionEngaged && message.toLowerCase().includes('bye donald'))
    {
        sendMessage(io, 'salam mgl');
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
            message: message
        });

    }, 700);


}