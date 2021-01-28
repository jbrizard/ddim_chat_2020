/*
 * Nom : Emoji
 * Description : ce fichier permet de gérer l'affichage des émojis et l'insertion d'un émoji
 * Auteur(s) : Jules Cannet et Léo Piazza
 */

// Tableau d'initialisation des boutons émojis
var emojiClick = [false, false, false, false, false];

/**
 * Création de la liste des émojis de type visage
 */
$('#emoji-input-faces').click(function()
{
	var facesList = ['😀','😃','😄','😁','😆','😅','😂','🤣','😇','😉','😊','🙂',
	'🙃','😋','😌','😗','😙','😚','🤪','😜','😝','😛','🤑','😎','🤓','🧐','🤠','🥳','🤗',
	'😏','😶','😐','😑','😒','🙄','🤨',	'🤔','🤫','🤭','🤥','😳','😞','😟','😠','😡',
	'🤬','😔','😕','🙁','😬','🥺','😣','😖','😫','😩','🥱','😤','😮','😱','😨','😰','😯',
	'😦','😧','😢','😥','😪','🤤','😓','😭'];

	generateEmojis('#emoji-input-faces', facesList, 1);
});

/**
 * Création de la liste des émojis de type gestes
 */
$('#emoji-input-gestures').click(function()
{
	var gesturesList = ['👍','👎','👊','✊','🤛','🤜','🤞','✌','🤘','🤟','👌','🤏','👈','👉','👆','👇','☝','✋','🤚','🖐','🖖','👋','🤙','💪','🖕','✍','🦵','🦶','👐','🤲','🙌','👏','🙏','🤝'];

	generateEmojis('#emoji-input-gestures', gesturesList, 2);
});

/**
 * Création de la liste des émojis de type coeur
 */
$('#emoji-input-love').click(function()
{
	var loveList = ['❤️','❤','🧡','💛','💚','💙','💜','🤎','🖤','🤍','💔','❣','💕','💞','💓','💗','💖','💘','💝'];

	generateEmojis('#emoji-input-love', loveList, 3);
});

/**
 * Création de la liste des émojis de type animaux
 */
$('#emoji-input-animals').click(function()
{
	var animalsList = ['🐶','🐱','🐭','🐹','🐰','🐻','🧸','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐔','🐤','🐺','🦊','🦝','🐗','🐴','🦓','🦒','🦄','🦋','🐞'];

	generateEmojis('#emoji-input-animals', animalsList, 4);
});

/**
 * Création de la liste des émojis de type plantes
 */
$('#emoji-input-plants').click(function()
{
	var plantsList = ['🌑','🌵','🌲','🌴','🍀','🍂','🍁','🌾','🌺','🌻','🌹','🌷','🥀','🌼','🌸','💐','🍄','🌰'];
	generateEmojis('#emoji-input-plants', plantsList, 5);
});

/**
 * Fonction permettant de générer/supprimer des boutons émojis en fonction de paramètres donnés
 */
function generateEmojis(parent, list, i)
{
	var bool = emojiClick[i];
	if(!bool)
	{
		$( ".emojis-inside" ).empty();
		emojiClick = [false, false, false, false, false];

		for (let i = 0; i < list.length; i++) 
		{
			var btn = '<input type="button" class="emoji" onClick="sendEmoji(event)" value="' + list[i] + '">';
			$('.emojis-inside').append(btn);
		}
		$(parent).addClass('active');
		$('.emojis').addClass('active');
		$('.emojis-inside').addClass('active');
		bool = true;
	} 
	else 
	{
		$(".emojis-inside").empty();
		$(btn).removeClass('active');
		$('.emojis').removeClass('active');
		$('.emojis-inside').removeClass('active');
		bool = false;
	}
	emojiClick[i] = bool;
}

/**
 * Fonction permettant d'écrire l'émoji sur le message en cours
 */
function sendEmoji(event)
{
	var value = event.target.defaultValue;
	var input = $('#message-input');
	var text= input.val();
	input.val(text + value);
	$(".emojis-inside").empty();
	emojiClick = [false, false, false, false, false];
	$('.emojis').removeClass('active');
	$('.emojis-inside').removeClass('active');
}
