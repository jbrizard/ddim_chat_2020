/*
 * Nom : Emoji
 * Description : ce fichier permet de gérer l'affichage des émojis et l'insertion d'un émoji
 * Auteur(s) : Jules Cannet et Léo Piazza
 */


// Liste ...
var menuAvatarsClick = false;
$('#avatar-input').click(function()
{
    console.log("click")
	var listAvatar = ['man','woman','artist', 'batman', 'chiness', 'cooker','cowboy','DJ','dummy','fisherman','hiker','magician','poncahontas','purple','superman','vampire'];

	if(!menuAvatarsClick)
	{
		$( ".avatars-inside" ).empty();

		for (let i = 0; i < listAvatar.length; i++) 
		{
            var btn = '<img class="avatar-inside" onClick="chooseAvatar(event)" src="/modules/avatar/medias/'+listAvatar[i]+'.png" alt="'+listAvatar[i]+'"></img>';
            $('.avatars-inside').append(btn);
		}
		$('.avatars').addClass('active');
		$('.avatars-inside').addClass('active');

		menuAvatarsClick=true;
	} 
	else 
	{
		$( ".avatars-inside" ).empty();
		$(btn).removeClass('active');
		$('.avatars').removeClass('active');
		$('.avatars-inside').removeClass('active');
		menuAvatarsClick=false;
	}
});

//Permet d'écrire l'émoji sur le message en cours
function chooseAvatar(event)
{
    avatar = event.target.alt;
    socket.emit('user_avatar', avatar);
}
