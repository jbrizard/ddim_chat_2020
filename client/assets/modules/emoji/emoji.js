//Action quand on clique sur le bouton "😀"
var emojiClick = false;
$('#emoji-input').click(function(){
	if(!emojiClick){
		var facesList = ['😀', '😄', '😅', '😍', '😜', '😞', '😟', '😭', '😱', '😡'];
		var animalsList = ['🐺', '🐱', '🐭', '🐹', '🐸', '🐯', '🐨', '🐻', '🐒', '🐴'];
		var plantsList = ['💐', '🌸', '🌷', '🍀', '🌹', '🌻', '🌺', '🍁', '🍃', '🍂'];

		for (let i = 0; i < facesList.length; i++) {
			var btn = '<input type="button" class="emoji" onClick="sendEmoji(event)" value="'+facesList[i]+'">';
			$('.emojis').append(btn);
		}
		$('#emoji-input').addClass('active');
		$('.emojis').addClass('active');

		emojiClick=true;
	} else {
		$( ".emojis" ).empty();
		$('#emoji-input').removeClass('active');
		$('.emojis').removeClass('active');
		emojiClick=false;
	}
});

function sendEmoji(event)
{
	var value =  event.target.defaultValue;
	//socket.emit('emoji', value);
	var input = $('#message-input');
	var text= input.val();
	input.val(text+value);
}
