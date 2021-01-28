/*
 * Nom : Giphy 
 * Description : Ce module permet d'envoyer des GIF
 * Auteur(s) : Gabin LUCAS, Benjamin CLAVERIE
 */

var giphy = require('giphy-api')('7FABZJWiNiXJ87pltWhbh8J9wLVv8Owc');
var _io;

module.exports =  {
	handleGiphy: handleGiphy // permet d'appeler cette méthode dans server.js 
}

function handleGiphy(io, message)
{  
    _io = io;
    message = message.toLowerCase();

    if(message.includes('gif'))
    {
        var keyword = message.substr(message.indexOf('gif') + 4);

        giphy.random(keyword, onGiphyResult);        
    }
}

/**
 * 
 */
function onGiphyResult(err, res)
{
    
    let url = res.data.images.fixed_height.url;
    _io.sockets.emit('new_message',
    {
        name: 'Gif',
		avatar : '/modules/avatar/medias/gif.png',
        message: '<img class="gif" src="'+url+'">'
    });
}