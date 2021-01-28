/*
 * Nom : Giphy 
 * Description : Ce module permet d'envoyer des GIF
 * Auteur(s) : Gabin LUCAS, Benjamin CLAVERIE
 */

 /**
 * VARIABLES 
 */
var giphy = require('giphy-api')('7FABZJWiNiXJ87pltWhbh8J9wLVv8Owc');
var _io;

module.exports =  {
	handleGiphy: handleGiphy // permet d'appeler cette méthode dans server.js 
}
/**
 * Repère le mot déclencheur (gif) et identifie le mot clé qui va faire apparaitre le gif dans le chat
 */

function handleGiphy(io, message)
{  
    _io = io;
    message = message.toLowerCase();

    if (message.includes('gif'))
    {
        var keyword = message.substr(message.indexOf('gif') + 4);

        giphy.random(keyword, onGiphyResult);        
    }
}

/**
 * Passe un nouveau message du bot gif, ici une image avec comme source url du gif
 * @param {*} err 
 * @param {*} res 
 */
function onGiphyResult(err, res)
{
    /** 
     * Si l'API ne renvoie pas d'url () elle renvoie un message d'erreur
    */
    try
    {
        let urlLink = res.data.images.fixed_height.url;
        console.log(urlLink);
        _io.sockets.emit('new_message',
        {
            name: 'Gif',
            message: '<img class="gif" src="'+urlLink+'">',
            avatar:'/modules/giphy/giphy.png'
    });  
    }catch(err)
    {
        err = "Le gif a bugué (cheh) ressaisi un gif"
        _io.sockets.emit('new_message',
        {
        name: 'Gif',
        message: err,
        avatar:'/modules/giphy/giphy.png'
        });
    } 
}