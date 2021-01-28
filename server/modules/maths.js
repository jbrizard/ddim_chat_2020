/*
 * Nom : Maths BOT 
 * Description : Bot maths
 * Auteur(s) : Gabenj
 */

/**
 * VARIABLES 
 */
const WolframAlphaAPI= require('wolfram-alpha-node');
const waApi = WolframAlphaAPI('A6G8L9-H8957UH8U9');
var _io;

module.exports =  {
	handleMaths: handleMaths
}

/**
 * Repère le mot déclencheur (calcul), identifie et résout le calcul ou la question posée 
 * @param {*} io 
 * @param {*} message 
 */
function handleMaths(io, message)
{
    _io = io;

    if(message.includes('calcul'))
    {
        var keyword = message.substr(message.indexOf('calcul') + 7);
        waApi.getShort(keyword).then(onWolframResult).catch(onWolframError);          
    }
}

/**
 * Passe un nouveau message du bot JeSaisTout(Maths) correspondant à la reponse (res) de la fonction précédente
 * @param {*} res 
 */
function onWolframResult(res)
{
    _io.sockets.emit('new_message',
    {
        name: 'BotJeSaisTout',
        message: '<span class="BotJeSaisTout">'+res+'</span>',
        avatar:'/modules/maths/calculator.png'
    });
}

/**
 * Passe un message d'erreur du bot JeSaisTout(Maths) si le calcul ou la question posent problème
 * @param {*} data 
 */
function onWolframError(data)
{
    data = "Pas compris..."
    _io.sockets.emit('new_message',
    {
        name: 'BotJeSaisTout',
        message: '<span class="BotJeSaisTout">'+data+'</span>',
        avatar:'/modules/maths/calculator.png'
    });
}