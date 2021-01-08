socket.on('quizzStart', startQuizz);
socket.on('joinQuizz', joinQuizz);
socket.on('displayQuestion', displayQuestion);
socket.on('Repond', Repond);
socket.on('Reponse', Reponse);

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
			+ "A. " + data.tab[data.nRound].choix[0]
		 + '</div>'
		 + '<div class="message reponse">'
			+ "B. " + data.tab[data.nRound].choix[1]
		 + '</div>'
		 + '<div class="message reponse">'
			+ "C. " + data.tab[data.nRound].choix[2]
		 + '</div>'
		 + '<div class="message reponse">'
			+ "D. " + data.tab[data.nRound].choix[3]
		 + '</div>'
		 + '<div class="message reponse">'
			+ "E. " + data.tab[data.nRound].choix[4]
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
};


function Repond(data){
	$('#chat #messages').append(
		'<div class="message">'
			+ data.message 
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}

function Reponse(data){
	$('#chat #messages').append(
		'<div class="message">'
			+ data.message 
		 + '</div>'
		 + '<div class="message">'
		 + data.message2
	  + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}