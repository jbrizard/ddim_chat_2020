socket.on('quizzStart', startQuizz);
socket.on('quizzMessage', quizzMessage);
socket.on('joinQuizz', joinQuizz);
socket.on('points', points);

$(document).on("click", '#startQuizzButton', function(){
	socket.emit('buttonClick', 
		$('#startQuizzButton').prev().prev().children().val(),
		$('#startQuizzButton').prev().children().val()
	);
})


function startQuizz(data)
{
	$('body').append(
		'<div class="quizzDiv">' +
		'<h3>Quizz</h3>' +
		'<ul id="ListPoint">' +
			'<li id=' + data.name + '>'+ data.name + ' : 0 points </li>' +
		'</ul>' +
		'</div>'
	);

	$('#chat #messages').append(
		'<div class="message quizz-start '+ data.state+'">'
			+ data.message 
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });
}

function quizzMessage(data)
{
	$('#chat #messages').append(
		'<div class="message">'
		 +	data.message 
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight }); 
}


function joinQuizz(data)
{
	$('#ListPoint').append('<li id=' + data.name + '>'+ data.name + ' : 0 points </li>');
	$('#chat #messages').append(
		'<div class="message quizz-join '+data.state+'">'
			+ data.message 
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}

function points(data){
	
	data.tabJ.forEach(joueur => {
		document.querySelector('li#'+joueur).innerHTML = joueur + ': ' + data.tab[joueur] + ' Point(s)';
	});
	

}
