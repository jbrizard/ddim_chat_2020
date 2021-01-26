/*
 * Nom : Painter !
 * Description : Une appli de dessin... basique
 * Auteur(s) : Jérémie Brizard
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	onDrawLine: onDrawLine
}

/**
  * Lorsqu'on re�oit un nouveau trac� � dessiner ('drawLine'),
  * on le transmet en broadcast � tous les users connect�s
  */
function onDrawLine(io, data)
{
	io.sockets.emit('drawLine', data);
}