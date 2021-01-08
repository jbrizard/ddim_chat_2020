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
	var listAvatar = ['artist', 'batman', 'chiness', 'cooker','cowboy','DJ','dummy','fisherman','hiker','magician','man','poncahontas','purple','superman','vampire','woman'];

	if(!menuAvatarsClick)
	{
		$( ".avatars-inside" ).empty();

		for (let i = 0; i < listAvatar.length; i++) 
		{
            var btn = '<img class="avatar-inside" onClick="chooseAvatar()" src="/modules/avatar/medias/'+listAvatar[i]+'.png"></img>';
            $('.avatars-inside').append(btn);
		}
		$(parent).addClass('active');
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
function chooseAvatar()
{
    //var value =  event.target.defaultValue;
    console.log("click");
}
