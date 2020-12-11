var endTimeout = null;

// Gestion des �v�nements diffus�s par le serveur
socket.on('barrel_roll', barrelRoll);

function barrelRoll()
{
	$('body').addClass('barrel-roll');
	
	clearTimeout(endTimeout);
	
	endTimeout = setTimeout(endBarrelRoll, 2000);
}

function endBarrelRoll()
{
	$('body').removeClass('barrel-roll');
}