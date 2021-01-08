
$('#bold').click(setBold);
$('#underline').click(setUnderline);
$('#italic').click(setItalic);

function setBold() 
{
		$('#message-input').toggleClass('bold');
		$('#bold').toggleClass('on');
}

function setUnderline() 
{
		$('#message-input').toggleClass('underline');
		$('#underline').toggleClass('on');
}

function setItalic() 
{
		$('#message-input').toggleClass('italic');
		$('#italic').toggleClass('on');
}

	
function injectStyling(message)
{
	// si on a la classe italic, ajouter [em] autour du message avant l'envoi
	if ($('#message-input').hasClass('bold')){
		message = '[b]' + message + '[/b]';
	}
	if ($('#message-input').hasClass('italic')){
		message = '[em]' + message + '[/em]';
	}
	if ($('#message-input').hasClass('underline')){
		message = '[u]' + message + '[/u]';
	}
	return message;
}

//remplacer les balises par les classes equivalentes de styling
function replaceStyling(message)
{
	message = message.replace('[b]', '<span class="bold">')
					 .replace('[/b]', '</span>');
		
	message = message.replace('[em]', '<span class="italic">')
					 .replace('[/em]', '</span>');

	message = message.replace('[u]', '<span class="underline">')
					 .replace('[/u]', '</span>');
	
	return message;
}