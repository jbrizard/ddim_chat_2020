// Variables courantes
var brush = null;
var isPainting = false;
var lastMousePos = {x:0, y:0};
var windowWidth, windowHeight;

// Initialisation du canvas
var canvas = document.getElementById("paint");
var ctx = canvas.getContext("2d");

// Gestion du redimensionnement de la page
$(window).resize(onWindowResize);
onWindowResize();

// Écoute l'événement drawLine envoyé par node
socket.on('drawLine', onDrawLine);

// Gère les clics sur les brush
$('#brushes .brush').click(function()
{
	$('.brush,.nobrush').removeClass('active');
	$(this).addClass('active');
	
	brush = $(this).data('color');
});

// Gère le clic sur nobrush (arrête la peinture)
$('#brushes .nobrush').click(function()
{
	$('.brush,.nobrush').removeClass('active');
	$(this).addClass('active');
	
	brush = null;
});

/**
  * Gère le redimensionnement de la page
  */
function onWindowResize()
{
	canvas.width = windowWidth = $(this).width();
	canvas.height = windowHeight = $(this).height();
}

/**
  * Lorsqu'on enfonce le bouton de la souris
  */
$(document).mousedown(function(e)
{
	if ($(e.target).is('.brush, .nobrush'))
		return;
	
	if (brush != null)
	{
		// Passe le booléen à true pour indiquer qu'on est en train de peindre
		isPainting = true;
		
		// Ajoute une classe à body pour empêcher les autres actions de souris quand on peint
		$('body').addClass('painting');
		
		// Enregistre la position actuelle de la souris
		lastMousePos = {x: e.clientX, y: e.clientY};
	}
});

/**
  * Lorsqu'on relâche le bouton de la souris
  */
$(document).mouseup(function()
{
	// Remet à zéro les variables
	isPainting = false;
	
	$('body').removeClass('painting');
	
	lastMousePos = null;
});

/**
  * Lorsqu'on bouge la souris
  */
$(document).mousemove(function(e)
{
	// Si on n'est pas en train de peindre, on ne fait rien ici
	if (!isPainting)
		return;
	
	// Envoie à node les données pour dessiner la ligne
	socket.emit('drawLine', {
		color: brush,						// Couleur de la brush
		width:5,							// Taille de la brush
		x: e.clientX / windowWidth,			// Position actuelle (X)
		y: e.clientY / windowHeight,			// Position actuelle (Y)
		prevX: lastMousePos.x / windowWidth,	// Position précédente (X)
		prevY: lastMousePos.y / windowHeight	// Position précédente (Y)
	});
	
	// Enregistre la position pour la prochaine "ligne"
	lastMousePos = {x: e.clientX, y: e.clientY};
});

/**
  * Lorsqu'on reçoit un événement de node pour dessiner une "ligne"
  */
function onDrawLine(data)
{
	// Nouveau tracé sur le canvas
        ctx.beginPath();
	
	// Styles du tracé
	ctx.strokeStyle = data.color;
	ctx.lineWidth = data.width;
	
	// Déplace le pointer au point précédent (début de la ligne)
	ctx.moveTo(
		data.prevX * windowWidth,
		data.prevY * windowHeight
	);
	
	// Dessine une ligne jusqu'au point actuel
	ctx.lineTo(
		data.x * windowWidth,
		data.y * windowHeight
	);
	
	// Termine le tracé
	ctx.stroke();
}