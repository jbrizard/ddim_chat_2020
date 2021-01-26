/*
 * Nom : Painter !
 * Description : Une appli de dessin... basique
 * Auteur(s) : JÃ©rÃ©mie Brizard
 */

// DÃ©finit les mÃ©thodes "publiques" (utilisation Ã  l'extÃ©rieur du module)
module.exports =  {
	onDrawLine: onDrawLine
}

/**
  * Lorsqu'on reçoit un nouveau tracé à dessiner ('drawLine'),
  * on le transmet en broadcast à tous les users connectés
  */
function onDrawLine(io, data)
{
	io.sockets.emit('drawLine', data);
}