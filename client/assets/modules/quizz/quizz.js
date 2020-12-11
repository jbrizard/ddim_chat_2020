socket.on('quizzStart', startQuizz);
socket.on('joinQuizz', joinQuizz);
socket.on('displayQuestion', displayQuestion);

function startQuizz(data)
{
	$('#chat #messages').append(
		'<div class="message quizz-start '+ data.state+'">'
			+ data.message 
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}

function joinQuizz(data)
{
	$('#chat #messages').append(
		'<div class="message quizz-join '+data.state+'">'
			+ data.message 
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}

function displayQuestion(data){
	$('#chat #messages').append(
		'<div class="message question">'
			+ data.tab[data.nRound].question
		 + '</div>'
		 + '<div class="message reponse">'
			+ data.tab[data.nRound].choix
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
};