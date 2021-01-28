/*
* Nom : Emoji
* Description : ce fichier permet de gérer l'affichage des émojis et l'insertion d'un émoji
* Auteur(s) : Jules Cannet et Léo Piazza
*/

// Initialisation de l'avatar de l'utilisateur
var modalAvatarsClick = false; //est-ce que la fenêtre des avatars est ouverte ?
this.printModalAvatar();
$('.avatars').addClass('first-avatar');

/**
 * Fonction permettant de gérer l'ouverture ou la fermeture de la fenêtre des avatars
 */
$('#avatar-input').click(function()
{
	if(!modalAvatarsClick)
	{
		printModalAvatar();
		modalAvatarsClick = true;
	} 
	else 
	{
		hideModalAvatar();
		modalAvatarsClick = false;
	}
});

/**
 * Fonction permettant de créer la fenêtre des avatars
 */
function printModalAvatar()
{
	//liste des avatars
	var listAvatar = ['man','woman','artist', 'batman', 'chiness', 'cooker','cowboy','DJ','dummy','fisherman','hiker','magician','poncahontas','purple','superman','vampire'];
	$(".avatars-inside").empty();
	
	for (let i = 0; i < listAvatar.length; i++) 
	{
		var btn = '<img class="avatar-inside" onClick="chooseAvatar(event)" src="/modules/avatar/medias/' + listAvatar[i] + '.png" alt="' + listAvatar[i] + '"></img>';
		$('.avatars-inside').append(btn);
	}

	$('.avatars-inside').append('<input class="file-upload-input" type=\'file\' onchange="uploadImage(this);" accept="image/*"/>');
	$('.avatars').addClass('active');
	$('.avatars-inside').addClass('active');
}

/**
 * Fonction permettant de supprimer la fenêtre de sélection d'avatars
 */
function hideModalAvatar()
{
	$(".avatars-inside").empty();
	$('.avatars').removeClass('active');
	$('.avatars-inside').removeClass('active');
}

/**
 * Fonction permettant d'écrire l'émoji sur le message en cours
 */
function chooseAvatar(event)
{
	avatar = event.target.src;
	socket.emit('user_avatar', avatar);
	this.hideModalAvatar();
	modalAvatarsClick = false;
	$('.avatars').removeClass('first-avatar');
}

/**
 * Fonction permettant de charger et stocker l'image
 */
function uploadImage(input)
{
	var tabType = ["image/jpeg", "image/png", "image/jpg"];
	var files = input.files;
	if (files.length === 0) 
	{
		return;
	}
	var reader = new FileReader();
	reader.onload = function (event) 
	{
		fileType = files[0].type;
		if (tabType.includes(fileType)) 
		{
			var tab = { "file": event.target.result, 'fileName': files[0].name, 'fileType': fileType };
			socket.emit('new_file_avatar', tab);
		}
		else 
		{
			alert('Type de fichier non autorisé');
		}
	};
	reader.readAsDataURL(files[0]);

	// fermeture de la fenêtre 
	this.hideModalAvatar();
	modalAvatarsClick = false;
	$('.avatars').removeClass('first-avatar');
}