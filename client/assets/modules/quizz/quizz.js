socket.on('quizzStart', startQuizz);
socket.on('joinQuizz', joinQuizz);
socket.on('displayQuestion', displayQuestion);
socket.on('Repond', Repond);
socket.on('Reponse', Reponse);
socket.on('Points', Points);
socket.on('EndQuizz', EndQuizz);

function startQuizz(data)
{
	$('body').append('<ul id="ListPoint"><li id=' + data.name + '>'+ data.name + ' : 0 points </li></ul>');
	$('#chat #messages').append(
		'<div class="message quizz-start '+ data.state+'">'
			+ data.message 
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
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

function Points(data){
	
	data.tabJ.forEach(joueur => {
		document.querySelector('li#'+joueur).innerHTML = joueur + ': ' + data.tab[joueur] + ' Point(s)';
	});
	

}

function EndQuizz(data){
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