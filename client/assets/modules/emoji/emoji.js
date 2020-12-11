/*
 * Nom : Emoji
 * Description : ce fichier permet de gérer l'affichage des émojis et l'insertion d'un émoji
 * Auteur(s) : Jules Cannet et Léo Piazza
 */

//Actions quand on clique un des trois boutons (emojis)
var emojiClick = [false, false, false, false, false];
$('#emoji-input-faces').click(function(){
	var facesList = ['😀', '😄', '😅', '😍', '😜', '😞', '😟', '😭', '😱', '😡'];
	generateEmojis('#emoji-input-faces', facesList, 1);

});

$('#emoji-input-gestures').click(function(){
	var gesturesList = ['👍', '👎', '👋', '🤚', '🖐', '🖖', '👌', '🤏', '✌️', '🤟'];
	generateEmojis('#emoji-input-gestures', gesturesList, 2);
});

$('#emoji-input-love').click(function(){
	var loveList = ['❤️', '💔', '😘', '🥰', '💓', '💖','💋', '💎','💙', '🖤'];
	generateEmojis('#emoji-input-love', loveList, 3);
});

$('#emoji-input-animals').click(function(){
	var animalsList = ['🐺', '🐱', '🐭', '🐹', '🐸', '🐯', '🐨', '🐻', '🐒', '🐴'];
	generateEmojis('#emoji-input-animals', animalsList, 4);

});

$('#emoji-input-plants').click(function(){
	var plantsList = ['💐', '🌸', '🌷', '🍀', '🌹', '🌻', '🌺', '🍁', '🍃', '🍂'];
	generateEmojis('#emoji-input-plants', plantsList, 5);
});



//cette fonction génère/supprime des boutons émojis en fonction des paramètres
function generateEmojis(parent, list, i){
	var bool = emojiClick[i];
	if(!bool){
		$( ".emojis" ).empty();
		emojiClick = [false, false, false, false, false];

		for (let i = 0; i < list.length; i++) {
			var btn = '<input type="button" class="emoji" onClick="sendEmoji(event)" value="'+list[i]+'">';
			$('.emojis').append(btn);
		}
		$(parent).addClass('active');
		$('.emojis').addClass('active');

		bool=true;
	} else {
		$( ".emojis" ).empty();
		$(btn).removeClass('active');
		$('.emojis').removeClass('active');
		bool=false;
	}
	emojiClick[i] = bool;
}

//Permet d'écrire l'émoji sur le message en cours
function sendEmoji(event)
{
	var value =  event.target.defaultValue;
	var input = $('#message-input');
	var text= input.val();
	input.val(text+value);
}
